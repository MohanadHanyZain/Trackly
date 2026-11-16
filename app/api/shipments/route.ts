import { Hono } from 'hono';
import { z } from 'zod';
import { eq, and, sql, desc } from 'drizzle-orm';
import { shipments, customers, branches, user_profiles } from '@/db/schema';
import { db } from '@/db/index';
import { getUserContext } from '@/lib/rbac';

const app = new Hono().basePath('/shipments');

// Validation schemas
const createShipmentSchema = z.object({
  customerId: z.string().uuid(),
  originBranchId: z.string().uuid(),
  destinationBranchId: z.string().uuid(),
  serviceType: z.string().optional(),
  shipmentType: z.string().optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).default('normal'),
  codAmount: z.number().min(0).default(0),
  currency: z.string().default('EGP'),
  declaredValue: z.number().min(0).default(0),
  shippingCharge: z.number().min(0).default(0),
  expectedPickupAt: z.string().datetime().optional(),
  expectedDeliveryAt: z.string().datetime().optional(),
  notes: z.string().optional(),
});

const updateShipmentSchema = z.object({
  customerId: z.string().uuid().optional(),
  originBranchId: z.string().uuid().optional(),
  destinationBranchId: z.string().uuid().optional(),
  serviceType: z.string().optional(),
  shipmentType: z.string().optional(),
  priority: z.enum(['low', 'normal', 'high', 'urgent']).optional(),
  codAmount: z.number().min(0).optional(),
  currency: z.string().optional(),
  declaredValue: z.number().min(0).optional(),
  shippingCharge: z.number().min(0).optional(),
  totalCharges: z.number().min(0).optional(),
  expectedPickupAt: z.string().datetime().optional(),
  expectedDeliveryAt: z.string().datetime().optional(),
  status: z.enum(['draft', 'created', 'pickup_requested', 'assigned', 'picked_up', 'in_transit', 'received_at_origin', 'sorting', 'in_transit', 'received_at_destination', 'assigned_for_delivery', 'out_for_delivery', 'delivered', 'failed_delivery', 'returned', 'cancelled']).optional(),
  assignedCourierId: z.string().uuid().optional(),
  createdBy: z.string().uuid().optional(),
  notes: z.string().optional(),
});

// Helper function to check permissions
async function checkShipmentPermission(userId: string, action: string, shipmentId?: string): Promise<boolean> {
  const userContext = await getUserContext(userId);
  if (!userContext) return false;

  // Super admins can do anything
  if (userContext.roleIds.includes('super_admin_id')) return true;

  // Check specific action permissions
  const permissionMap: Record<string, string[]> = {
    'create': ['shipments.create'],
    'read': ['shipments.view'],
    'update': ['shipments.update'],
    'delete': ['shipments.delete'],
    'assign': ['shipments.assign'],
    'cancel': ['shipments.cancel'],
    'deliver': ['shipments.deliver'],
  };

  const requiredPermission = permissionMap[action];
  if (!requiredPermission) return false;

  return userContext.permissions.some(p => requiredPermission.includes(p));
}

// Get all shipments with filters
app.get('/', async (c) => {
  try {
    const { search, status, customerId, branchId, page = '1', limit = '10' } = c.req.query();

    const userId = c.get('userId');
    if (!userId) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Check permissions
    const canRead = await checkShipmentPermission(userId, 'read');
    if (!canRead) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    const userContext = await getUserContext(userId);
    if (!userContext) {
      return c.json({ error: 'User context not found' }, 404);
    }

    // Build where conditions
    const whereConditions = [];

    // Add tenant filter for non-super admins
    if (!userContext.roleIds.includes('super_admin_id')) {
      whereConditions.push(eq(shipments.tenant_id, userContext.tenantId));
    }

    // Add customer filter
    if (customerId) {
      whereConditions.push(eq(shipments.customer_id, customerId));
    }

    // Add branch filter
    if (branchId) {
      whereConditions.push(
        sql`${shipments.origin_branch_id} = ${branchId} OR ${shipments.destination_branch_id} = ${branchId}`
      );
    }

    // Add status filter
    if (status) {
      whereConditions.push(eq(shipments.status, status));
    }

    // Add search filter
    if (search) {
      whereConditions.push(
        sql`${shipments.tracking_number} ILIKE ${`%${search}%`} OR ${shipments.external_order_id} ILIKE ${`%${search}%`}`
      );
    }

    // Get total count
    const totalResult = await db
      .select({ count: sql`COUNT(*)`.as('count') })
      .from(shipments)
      .where(and(...whereConditions));

    const total = Number(totalResult[0].count);

    // Get paginated results
    const offset = (Number(page) - 1) * Number(limit);

    const shipmentsList = await db
      .select()
      .from(shipments)
      .leftJoin(customers, eq(shipments.customer_id, customers.id))
      .leftJoin(branches as originBranches, eq(shipments.origin_branch_id, originBranches.id))
      .leftJoin(branches as destinationBranches, eq(shipments.destination_branch_id, destinationBranches.id))
      .leftJoin(user_profiles as createdByUser, eq(shipments.created_by, createdByUser.id))
      .where(and(...whereConditions))
      .orderBy(desc(shipments.created_at))
      .limit(Number(limit))
      .offset(offset);

    return c.json({
      shipments: shipmentsList,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch shipments' }, 500);
  }
});

// Get single shipment
app.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const userId = c.get('userId');
    if (!userId) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Check permissions
    const canRead = await checkShipmentPermission(userId, 'read', id);
    if (!canRead) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    const shipment = await db
      .select()
      .from(shipments)
      .leftJoin(customers, eq(shipments.customer_id, customers.id))
      .leftJoin(branches as originBranches, eq(shipments.origin_branch_id, originBranches.id))
      .leftJoin(branches as destinationBranches, eq(shipments.destination_branch_id, destinationBranches.id))
      .leftJoin(user_profiles as createdByUser, eq(shipments.created_by, createdByUser.id))
      .where(eq(shipments.id, id))
      .get();

    if (!shipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    return c.json({ shipment });
  } catch (error) {
    return c.json({ error: 'Failed to fetch shipment' }, 500);
  }
});

// Create new shipment
app.post('/', async (c) => {
  try {
    const userId = c.get('userId');
    if (!userId) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Check permissions
    const canCreate = await checkShipmentPermission(userId, 'create');
    if (!canCreate) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    const validatedData = createShipmentSchema.parse(await c.req.json());

    const userContext = await getUserContext(userId);
    if (!userContext) {
      return c.json({ error: 'User context not found' }, 404);
    }

    const shipmentData = {
      ...validatedData,
      tenant_id: userContext.tenantId,
      created_by: userId,
      tracking_number: `TP-${Date.now()}-${Math.random().toString(36).substr(2, 6).toUpperCase()}`, // Generate tracking number
    };

    const newShipment = await db
      .insert(shipments)
      .values(shipmentData)
      .returning();

    return c.json({ shipment: newShipment[0] }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid data', details: error.errors }, 400);
    }
    return c.json({ error: 'Failed to create shipment' }, 500);
  }
});

// Update shipment
app.put('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const userId = c.get('userId');
    if (!userId) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Check permissions
    const canUpdate = await checkShipmentPermission(userId, 'update', id);
    if (!canUpdate) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    const validatedData = updateShipmentSchema.parse(await c.req.json());

    // Check if shipment exists
    const existingShipment = await db
      .select()
      .from(shipments)
      .where(eq(shipments.id, id))
      .get();

    if (!existingShipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    // Check tenant ownership for non-super admins
    const userContext = await getUserContext(userId);
    if (userContext && !userContext.roleIds.includes('super_admin_id')) {
      if (existingShipment.tenant_id !== userContext.tenantId) {
        return c.json({ error: 'Insufficient permissions' }, 403);
      }
    }

    const updatedShipment = await db
      .update(shipments)
      .set(validatedData)
      .where(eq(shipments.id, id))
      .returning();

    return c.json({ shipment: updatedShipment[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid data', details: error.errors }, 400);
    }
    return c.json({ error: 'Failed to update shipment' }, 500);
  }
});

// Delete shipment
app.delete('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const userId = c.get('userId');
    if (!userId) {
      return c.json({ error: 'Authentication required' }, 401);
    }

    // Check permissions
    const canDelete = await checkShipmentPermission(userId, 'delete', id);
    if (!canDelete) {
      return c.json({ error: 'Insufficient permissions' }, 403);
    }

    // Check if shipment exists
    const existingShipment = await db
      .select()
      .from(shipments)
      .where(eq(shipments.id, id))
      .get();

    if (!existingShipment) {
      return c.json({ error: 'Shipment not found' }, 404);
    }

    // Check tenant ownership for non-super admins
    const userContext = await getUserContext(userId);
    if (userContext && !userContext.roleIds.includes('super_admin_id')) {
      if (existingShipment.tenant_id !== userContext.tenantId) {
        return c.json({ error: 'Insufficient permissions' }, 403);
      }
    }

    await db.delete(shipments).where(eq(shipments.id, id));

    return c.json({ message: 'Shipment deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete shipment' }, 500);
  }
});

export default app;
export type AppType = typeof app;