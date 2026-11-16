"use client';
import { useState } from 'react';
import { signUp, useSession } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    acceptTerms: false,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error } = await signUp.email({
        email: formData.email,
        password: formData.password,
        name: formData.name,
        company: formData.company,
        callbackURL: callbackUrl,
        fetchOptions: {
          onSuccess: () => {
            router.push(callbackUrl);
          },
          onError: (ctx) => {
            setError(ctx.error || 'فشل إنشاء الحساب');
          },
        },
      });

      if (error) {
        setError(error.message || 'فشل إنشاء الحساب');
      }
    } catch (err) {
      setError('حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
      <div className="w-full max-w-2xl space-y-8 rounded-xl border border-border bg-surface p-8 shadow-lg">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/10">
            <svg className="h-8 w-8 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-foreground">إنشاء حساب جديد</h1>
          <p className="mt-2 text-sm text-muted">ابدأ رحلتك مع TrackPro اليوم</p>
        </div>

        {error && (
          <div className="rounded-md border border-danger/20 bg-danger/10 px-4 py-3 text-sm text-danger">
            {error}
          }
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground">الاسم الكامل</label>
              <input
                id="name"
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/20 disabled:opacity-50"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground">البريد الإلكتروني</label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/20 disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-foreground">اسم الشركة</label>
            <input
              id="company"
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/20 disabled:opacity-50"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">كلمة المرور</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-success/20 disabled:opacity-50"
              placeholder="•••••••••"
            />
          </div>

          <div className="flex items-center">
            <input
              id="acceptTerms"
              name="acceptTerms"
              type="checkbox"
              required
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-success focus:ring-success disabled:opacity-50"
            />
            <label htmlFor="acceptTerms" className="mr-2 ml-2 block text-sm text-muted">
              أوافق على <a href="/terms" className="text-success hover:text-success/80">شروط الخدمة</a> و<a href="/privacy" className="text-success hover:text-success/80">سياسة الخصوصية</a>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-success px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-success/90 focus:outline-none focus:ring-2 focus:ring-success/50 disabled:opacity-70"
          >
            {loading ? 'جارٍ إنشاء الحساب...' : 'إنشاء الحساب'}
          </button>
        </form>
      </div>
    </div>
  );
}
