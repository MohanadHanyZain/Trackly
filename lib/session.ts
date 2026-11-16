import { auth } from '@/lib/auth';
import { cache } from 'react';

export async function getSession() {
  return await auth.api.getSession();
}

export async function getCurrentUser() {
  const session = await getSession();
  return session?.user || null;
}

export async function getCurrentTenant() {
  const session = await getSession();
  if (!session) return null;
  return session.user.tenantId || null;
}

export const getCachedSession = cache(getSession);
export const getCachedUser = cache(getCurrentUser);
export const getCachedTenant = cache(getCurrentTenant);