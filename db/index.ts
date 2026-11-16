import { drizzle } from 'drizzle-orm/neon-serverless';
import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import * as schema from './schema';

dotenv.config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in .env.local');
}

export const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema });

export type DB = typeof db;
