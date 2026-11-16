import { Hono } from 'hono';
import { z } from 'zod';
import { eq, and, sql, desc, inArray } from 'drizzle-orm';
import { contracts, contract_versions, customers, branches, tenants } from '@/db/schema';
import { db } from '@/db/index';

const app = new Hono().basePath('/contracts');

// Validation schemas
const createContractSchema = z.object({
  customer_id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  branch_id: z.string().uuid().optional(),
  name: z.string().min(2).max(100),
  description: z.string().optional(),
  effective_date: z.string().datetime(),
  expiry_date: z.string().datetime().optional(),
  status: z.enum(['draft', 'pending_approval', 'active', 'expired', 'cancelled', 'suspended']).default('draft'),
  contract_type: z.enum(['standard', 'custom', 'enterprise']).default('standard'),
  billing_frequency: z.enum(['monthly', 'quarterly', 'semi_annual', 'annual', 'one_time']).default('monthly'),
  payment_terms: z.number().min(0).default(30),
  penalty_rate: z.number().min(0).default(0),
  insurance_required: z.boolean().default(false),
  insurance_provider: z.string().optional(),
  base_rate: z.number().min(0).default(0),
  currency: z.string().default('EGP'),
  notes: z.string().optional(),
});

const updateContractSchema = createContractSchema.partial();

// Get all contracts with filters
app.get('/', async (c) => {
  try {
    const { search, customer_id, branch_id, status, page = '1', limit = '10' } = c.req.query();

    const whereConditions = [];

    // Add filters
    if (customer_id) {
      whereConditions.push(eq(contracts.customer_id, customer_id));
    }

    if (branch_id) {
      whereConditions.push(eq(contracts.branch_id, branch_id));
    }

    if (status) {
      whereConditions.push(eq(contracts.status, status));
    }

    if (search) {
      whereConditions.push(
        sql`${contracts.name} ILIKE ${`%${search}%`} OR ${contracts.description} ILIKE ${`%${search}%`}`
      );
    }

    // Get total count
    const totalResult = await db
      .select({ count: sql`COUNT(*)`.as('count') })
      .from(contracts)
      .where(and(...whereConditions));

    const total = Number(totalResult[0].count);

    // Get paginated results
    const offset = (Number(page) - 1) * Number(limit);

    const contractsList = await db
      .select()
      .from(contracts)
      .leftJoin(customers, eq(contracts.customer_id, customers.id))
      .leftJoin(branches, eq(contracts.branch_id, branches.id))
      .where(and(...whereConditions))
      .orderBy(desc(contracts.effective_date))
      .limit(Number(limit))
      .offset(offset);

    return c.json({
      contracts: contractsList,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit)),
      },
    });
  } catch (error) {
    return c.json({ error: 'Failed to fetch contracts' }, 500);
  }
});

// Get single contract
app.get('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const contract = await db
      .select()
      .from(contracts)
      .leftJoin(customers, eq(contracts.customer_id, customers.id))
      .leftJoin(branches, eq(contracts.branch_id, branches.id))
      .where(eq(contracts.id, id))
      .get();

    if (!contract) {
      return c.json({ error: 'Contract not found' }, 404);
    }

    return c.json({ contract });
  } catch (error) {
    return c.json({ error: 'Failed to fetch contract' }, 500);
  }
});

// Create new contract
app.post('/', async (c) => {
  try {
    const validatedData = createContractSchema.parse(await c.req.json());

    const contractData = {
      ...validatedData,
    };

    const newContract = await db
      .insert(contracts)
      .values(contractData)
      .returning();

    // Create contract version
    await db.insert(contract_versions).values({
      contract_id: newContract[0].id,
      version: 1,
      data: validatedData,
      effective_date: validatedData.effective_date,
      status: validatedData.status,
      notes: validatedData.notes,
    });

    return c.json({ contract: newContract[0] }, 201);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid data', details: error.errors }, 400);
    }
    return c.json({ error: 'Failed to create contract' }, 500);
  }
});

// Update contract
app.put('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    const validatedData = updateContractSchema.parse(await c.req.json());

    // Check if contract exists
    const existingContract = await db
      .select()
      .from(contracts)
      .where(eq(contracts.id, id))
      .get();

    if (!existingContract) {
      return c.json({ error: 'Contract not found' }, 404);
    }

    const updatedContract = await db
      .update(contracts)
      .set(validatedData)
      .where(eq(contracts.id, id))
      .returning();

    // Create new contract version if there are changes
    if (Object.keys(validatedData).length > 0) {
      await db.insert(contract_versions).values({
        contract_id: updatedContract[0].id,
        version: gt(sql`SELECT version FROM contract_versions WHERE contract_id = ${id}`, 0) ? gt(sql`SELECT version FROM contract_versions WHERE contract_id = ${id}`, 0) + 1 : 1,
        data: validatedData,
        effective_date: new Date().toISOString(),
        status: updatedContract[0].status,
        notes: validatedData.notes,
      });
    }

    return c.json({ contract: updatedContract[0] });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return c.json({ error: 'Invalid data', details: error.errors }, 400);
    }
    return c.json({ error: 'Failed to update contract' }, 500);
  }
});

// Delete contract
app.delete('/:id', async (c) => {
  try {
    const { id } = c.req.param();

    // Check if contract exists
    const existingContract = await db
      .select()
      .from(contracts)
      .where(eq(contracts.id, id))
      .get();

    if (!existingContract) {
      return c.json({ error: 'Contract not found' }, 404);
    }

    await db.delete(contracts).where(eq(contracts.id, id));

    return c.json({ message: 'Contract deleted successfully' });
  } catch (error) {
    return c.json({ error: 'Failed to delete contract' }, 500);
  }
});

export default app;
export type AppType = typeof app;