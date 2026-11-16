import { Hono } from 'hono';
import { z } from 'zod';
import { eq, and, sql, ilike, desc, gt, lt } from 'drizzle-orm';
import { customers, organizations, branches, user_profiles, tenants } from '@/db/schema';
import { db } from '@/db/index';

const app = new Hono().basePath('/customers');

// Validation schemas
const createCustomerSchema = z.object({
  tenant_id: z.string().uuid(),
  organization_id: z.string().uuid().optional(),
  full_name: z.string().min(2).max(100),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  tax_id: z.string().optional(),
  type: z.enum(['individual', 'company', 'government']).default('individual'),
  status: z.enum(['active', 'inactive', 'blacklisted']).default('active'),
  credit_limit: z.number().min(0).default(0),
  credit_days: z.number().min(0).default(30),
  address: z.string().optional(),
  governorate: z.string().optional(),
  city: z.string().optional(),
  notes: z.string().optional(),
});

const updateCustomerSchema = createCustomerSchema.partial();

// Get all customers with filters
app.get('/', async (c) => {
  try {
    const { search, organization_id, branch_id, page = '1', limit = '10' } = c.req.query();

    const whereConditions = [];

    // Add filters
    if (organization_id) {
      whereConditions.push(eq(customers.organization_id, organization_id));
    }

    if (branch_id) {
      whereConditions.push(eq(customers.branch_id, branch_id));
    }

    if (search) {
      whereConditions.push(
        sql`${customers.full_name} ILIKE ${`%${search}%`} OR ${customers.email} ILIKE ${`%${search}%`}`
      );
    }

    // Get total count
    const totalResult = await db
      .select({ count: sql`COUNT(*)`.as('count') })
      .from(customers)
      .where(and(...whereConditions));

    const total = Number(totalResult[0].count);

    // Get paginated results
    const offset = (Number(page) - 1) * Number(limit);

    const customersList = await db
      .select()
      .from(customers)
      .where(and(...whereConditions))
      .orderBy(desc(customers.created_at))
      .limit(Number(limit))
      .offset(offset);

    return c.json({
      customers: customersList,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch customers' }, 500);
  }
});

// Get single customer
app.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const customer = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .get();

    if (!customer) {
      return c.json({ error: 'Customer not found' }, 404);
    }

    return c.json({ customer });
  } catch (error) {
    return c.json({ error: 'Failed to fetch customer' }, 500);
  }
});

// Create new customer
app.post('/', async (c) => {
  try {
    const validatedData = createCustomerSchema.parse(await c.req.json());

    const customerData = {
      ...validatedData,
      tenant_id: validatedData.tenant_id,
    };

    const newCustomer = await db
      .insert(customers)
      .values(customerData)
      .returning();

    return c.json({ customer: newCustomer[0] }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid data', details: error.errors }, 400);
    }
    return c.json({ error: 'Failed to create customer' }, 500);
  }
});

// Update customer
app.put('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const validatedData = updateCustomerSchema.parse(await c.req.json());

    // Check if customer exists
    const existingCustomer = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .get();

    if (!existingCustomer) {
      return c.json({ error: 'Customer not found' }, 404);
    }

    const updatedCustomer = await db
      .update(customers)
      .set(validatedData)
      .where(eq(customers.id, id))
      .returning();

    return c.json({ customer: updatedCustomer[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid data', details: error.errors }, 400);
    }
    return c.json({ error: 'Failed to update customer' }, 500);
  }
});

// Delete customer
app.delete('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    // Check if customer exists
    const existingCustomer = await db
      .select()
      .from(customers)
      .where(eq(customers.id, id))
      .get();

    if (!existingCustomer) {
      return c.json({ error: 'Customer not found' }, 404);
    }

    await db.delete(customers).where(eq(customers.id, id));

    return c.json({ message: 'Customer deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete customer' }, 500);
  }
});

export default app;
export type AppType = typeof app;