import { betterAuth } from 'better-auth';
import { drizzleAdapter } from '@better-auth/drizzle-adapter';
import { nextCookies } from 'better-auth/next-js';
import { db } from '../db/index';
import { user, session, account, verification } from '../db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      user,
      session,
      account,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [nextCookies()],
  basePath: '/api/auth',
  trustedOrigins: ['http://localhost:3000'],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
    updateAge: 60 * 60, // 1 hour
    cookieName: 'auth_session',
  },
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
});
