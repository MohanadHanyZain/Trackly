import { getSessionUser } from './auth';

export interface AuthProxyOptions {
  isPublic?: string[];
  protected?: string[];
  callbackUrl?: string;
}

export function withAuth(options: AuthProxyOptions = {}) {
  const { isPublic = [], protected = [], callbackUrl = '/auth/callback' } = options;

  return async function authProxy(request: Request) {
    const url = new URL(request.url);

    // Skip if already authenticated
    const session = await getSessionUser();
    if (session) {
      return Response.redirect(url.toString());
    }

    // Check if path is public
    for (const path of isPublic) {
      if (url.pathname === path) {
        return Response.next();
      }
    }

    // Check if path is protected
    for (const path of protected) {
      if (url.pathname === path || url.pathname.startsWith(path + '/')) {
        return Response.redirect(`${callbackUrl}`);
      }
    }

    return Response.next();
  };
}

export async function getSessionUser() {
  // Get session from auth
  // This should call the better-auth session retrieval
  const { auth } = await import('./auth');
  try {
    // Get session from request headers/cookies
    const session = await auth.api.getSession();
    return session;
  } catch {
    return null;
  }
}