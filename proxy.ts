import { createAuthMiddleware } from 'better-auth/middleware';
import { auth } from '@/lib/auth';

export default createAuthMiddleware(async (ctx) => {
  const { pathname } = new URL(ctx.request.url);

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/',
    '/dashboard',
    '/dashboard/',
    '/dashboard/shipments',
    '/dashboard/pickup',
    '/dashboard/delivery',
    '/dashboard/branches',
    '/dashboard/hubs',
    '/dashboard/sorting',
    '/dashboard/transfers',
    '/dashboard/customers',
    '/dashboard/merchants',
    '/dashboard/contracts',
    '/dashboard/pricing',
    '/dashboard/cod',
    '/dashboard/settlements',
    '/dashboard/finance',
    '/dashboard/accounting',
    '/dashboard/warehouse',
    '/dashboard/fleet',
    '/dashboard/drivers',
    '/dashboard/reports',
    '/dashboard/integrations',
    '/dashboard/settings',
  ];

  // Check if path is public or auth
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));
  const isAuthPath = pathname.startsWith('/auth/');

  if (isPublicPath || isAuthPath) {
    ctx.set('userId', '00000000-0000-0000-0000-000000000000'); // Guest user for public paths
    return;
  }

  // Try to get session from better-auth
  try {
    const session = await auth.api.getSession({ headers: ctx.req.headers });
    if (session?.user?.id) {
      ctx.set('userId', session.user.id);
      ctx.set('tenantId', session.user.tenantId || 'default-tenant-id');
      ctx.set('roleIds', session.user.roleIds || []);
      ctx.set('permissions', session.user.permissions || []);
    } else {
      // Redirect to auth page if not authenticated
      return new Response(null, {
        status: 302,
        headers: { 'Location': `/auth/signin?callbackUrl=${encodeURIComponent(pathname)}` },
      });
    }
  } catch (error) {
    // If session check fails, redirect to login
    return new Response(null, {
      status: 302,
      headers: { 'Location': `/auth/signin?callbackUrl=${encodeURIComponent(pathname)}` },
    });
  }
});
