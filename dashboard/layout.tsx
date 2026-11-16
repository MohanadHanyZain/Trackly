import { withAuth } from '@/lib/auth-proxy';

export default withAuth({
  // Pages that don't need auth
  isPublic: ['/', '/auth/signin', '/auth/callback', '/dashboard'],

  // Pages that require auth
  protected: ['/dashboard/']
});