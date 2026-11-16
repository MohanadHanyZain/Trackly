import { Hono } from 'hono';
import { z } from 'zod';
import { eq, and, sql, desc, gt, lte, gte } from 'drizzle-orm';
import { shipments, branches, user_profiles, tenants } from '@/db/schema';
import { db } from '@/db/index';

const app = new Hono().basePath('/pickup-delivery');

// Validation schemas
const createPickupRequestSchema = z.object({
  shipment_id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  branch_id: z.string().uuid(),
  scheduled_date: z.string().datetime(),
  scheduled_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/),
  notes: z.string().optional(),
  requirements: z.string().optional(),
});

const createDeliveryRequestSchema = z.object({
  shipment_id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  branch_id: z.string().uuid(),
  scheduled_date: z.string().datetime(),
  scheduled_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/),
  notes: z.string().optional(),
  requirements: z.string().optional(),
});

const updatePickupSchema = z.object({
  scheduled_date: z.string().datetime().optional(),
  scheduled_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/).optional(),
  status: z.enum(['requested', 'assigned', 'in_progress', 'completed', 'cancelled']).optional(),
  actual_pickup_at: z.string().datetime().optional(),
  assigned_to: z.string().uuid().optional(),
  notes: z.string().optional(),
});

const updateDeliverySchema = z.object({
  scheduled_date: z.string().datetime().optional(),
  scheduled_time: z.string().regex(/^([0-1]?[0-9]|2[0-3]):([0-5]?[0-9])$/).optional(),
  status: z.enum(['requested', 'assigned', 'in_progress', 'completed', 'failed', 'cancelled']).optional(),
  actual_delivery_at: z.string().datetime().optional(),
  recipient_name: z.string().optional(),
  recipient_phone: z.string().optional(),
  recipient_signature: z.string().optional(),
  assigned_to: z.string().uuid().optional(),
  notes: z.string().optional(),
});

// Get pickup requests
app.get('/pickup-requests', async (c) => {
  try {
    const { branch_id, date, status, page = '1', limit = '10' } = c.req.query();

    const whereConditions = [];

    if (branch_id) {
      whereConditions.push(eq(shipments.origin_branch_id, branch_id));
    }

    if (status) {
      whereConditions.push(eq(shipments.status, status));
    }

    if (date) {
      whereConditions.push(gte(shipments.expected_pickup_at, date));
    }

    // Only shipments with status 'pickup_requested' or 'assigned'
    whereConditions.push(sql`${shipments.status} IN ('pickup_requested', 'assigned')`);

    // Get total count
    const totalResult = await db
      .select({ count: sql`COUNT(*)`.as('count') })
      .from(shipments)
      .where(and(...whereConditions));

    const total = Number(totalResult[0].count);

    // Get paginated results
    const offset = (Number(page) - 1) * Number(limit);

    const pickupRequests = await db
      .select()
      .from(shipments)
      .leftJoin(branches, eq(shipments.origin_branch_id, branches.id))
      .leftJoin(user_profiles, eq(shipments.assigned_courier_id, user_profiles.id))
      .where(and(...whereConditions))
      .orderBy(desc(shipments.expected_pickup_at))
      .limit(Number(limit))
      .offset(offset);

    return c.json({
      pickupRequests,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch pickup requests' }, 500);
  }
});

// Assign pickup to courier
app.post('/pickup-requests/:id/assign', async (c) => {
  try {
    const { id } = c.req.param();
    const { courier_id } = await c.req.json();

    // Check if shipment exists and can be assigned
    const shipment = await db
      .select()
      .from(shipments)
      .where(eq(shipments.id, id))
      .get();

    if (!shipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    if (shipment.status !== 'pickup_requested') {
      return c.json({ error: 'Shipment cannot be assigned' }, 400);
    }

    const updatedShipment = await db
      .update(shipments)
      .set({
        assigned_courier_id: courier_id,
        status: 'assigned',
      })
      .where(eq(shipments.id, id))
      .returning();

    return c.json({ shipment: updatedShipment[0] });
  } catch (error) {
    return c.json({ error: 'Failed to assign pickup' }, 500);
  }
});

// Complete pickup
app.put('/pickup-requests/:id/complete', async (c) => {
  try {
    const { id } = c.req.param();
    const { actual_pickup_at, notes } = await c.req.json();

    const shipment = await db
      .select()
      .from(shipments)
      .where(eq(shipments.id, id))
      .get();

    if (!shipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    if (shipment.status !== 'assigned' && shipment.status !== 'in_progress') {
      return c.json({ error: 'Shipment cannot be completed' }, 400);
    }

    const updatedShipment = await db
      .update(shipments)
      .set({
        status: 'picked_up',
        actual_pickup_at: actual_pickup_at || new Date().toISOString(),
        notes,
      })
      .where(eq(shipments.id, id))
      .returning();

    return c.json({ shipment: updatedShipment[0] });
  } catch (error) {
    return c.json({ error: 'Failed to complete pickup' }, 500);
  }
});

// Get delivery requests
app.get('/delivery-requests', async (c) => {
  try {
    const { branch_id, date, status, page = '1', limit = '10' } = c.req.query();

    const whereConditions = [];

    if (branch_id) {
      whereConditions.push(eq(shipments.destination_branch_id, branch_id));
    }

    if (status) {
      whereConditions.push(eq(shipments.status, status));
    }

    if (date) {
      whereConditions.push(gte(shipments.expected_delivery_at, date));
    }

    // Only shipments with status 'assigned', 'in_transit', or 'out_for_delivery'
    whereConditions.push(sql`${shipments.status} IN ('assigned', 'in_transit', 'out_for_delivery')`);

    // Get total count
    const totalResult = await db
      .select({ count: sql`COUNT(*)`.as('count') })
      .from(shipments)
      .where(and(...whereConditions));

    const total = Number(totalResult[0].count);

    // Get paginated results
    const offset = (Number(page) - 1) * Number(limit);

    const deliveryRequests = await db
      .select()
      .from(shipments)
      .leftJoin(branches, eq(shipments.destination_branch_id, branches.id))
      .leftJoin(user_profiles, eq(shipments.assigned_courier_id, user_profiles.id))
      .where(and(...whereConditions))
      .orderBy(desc(shipments.expected_delivery_at))
      .limit(Number(limit))
      .offset(offset);

    return c.json({
      deliveryRequests,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch delivery requests' }, 500);
  }
});

// Assign delivery to courier
app.post('/delivery-requests/:id/assign', async (c) => {
  try {
    const { id } = c.req.param();
    const { courier_id } = await c.req.json();

    const shipment = await db
      .select()
      .from(shipments)
      .where(eq(shipments.id, id))
      .get();

    if (!shipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    if (!['assigned', 'in_transit'].includes(shipment.status)) {
      return c.json({ error: 'Shipment cannot be assigned for delivery' }, 400);
    }

    const updatedShipment = await db
      .update(shipments)
      .set({
        assigned_courier_id: courier_id,
        status: 'out_for_delivery',
      })
      .where(eq(shipments.id, id))
      .returning();

    return c.json({ shipment: updatedShipment[0] });
  } catch (error) {
    return c.json({ error: 'Failed to assign delivery' }, 500);
  }
});

// Complete delivery
app.put('/delivery-requests/:id/complete', async (c) => {
  try {
    const { id } = c.req.param();
    const { actual_delivery_at, recipient_name, recipient_phone, recipient_signature, notes } = await c.req.json();

    const shipment = await db
      .select()
      .from(shipments)
      .where(eq(shipments.id, id))
      .get();

    if (!shipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    if (shipment.status !== 'out_for_delivery') {
      return c.json({ error: 'Shipment cannot be completed' }, 400);
    }

    const updatedShipment = await db
      .update(shipments)
      .set({
        status: 'delivered',
        actual_delivery_at: actual_delivery_at || new Date().toISOString(),
        recipient_name,
        recipient_phone,
        recipient_signature,
        notes,
      })
      .where(eq(shipments.id, id))
      .returning();

    return c.json({ shipment: updatedShipment[0] });
  } catch (error) {
    return c.json({ error: 'Failed to complete delivery' }, 500);
  }
});

export default app;
export type AppType = typeof app;