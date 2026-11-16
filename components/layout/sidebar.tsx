'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard, Package, MapPin, Truck, Warehouse, Users,
  FileText, DollarSign, Wallet, Landmark, BarChart3, Settings,
  ChevronRight, LogOut,
} from 'lucide-react';

const navItems = [
  { label: 'لوحة التحكم', href: '/dashboard', icon: LayoutDashboard },
  { label: 'الشحنات', href: '/dashboard/shipments', icon: Package },
  { label: 'الاستلام', href: '/dashboard/pickup', icon: MapPin },
  { label: 'التوصيل', href: '/dashboard/delivery', icon: Truck },
  { label: 'الفروع', href: '/dashboard/branches', icon: MapPin },
  { label: 'المخازن', href: '/dashboard/warehouse', icon: Warehouse },
  { label: 'العملاء', href: '/dashboard/customers', icon: Users },
  { label: 'العقود', href: '/dashboard/contracts', icon: FileText },
  { label: 'التسعير', href: '/dashboard/pricing', icon: FileText },
  { label: 'التحصيل', href: '/dashboard/cod', icon: DollarSign },
  { label: 'التسويات', href: '/dashboard/settlements', icon: Wallet },
  { label: 'المالية', href: '/dashboard/finance', icon: Landmark },
  { label: 'التقارير', href: '/dashboard/reports', icon: BarChart3 },
  { label: 'الإعدادات', href: '/dashboard/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed inset-y-0 right-0 z-40 hidden w-64 flex-col bg-surface border-l border-border md:flex">
      <div className="flex h-16 items-center justify-center border-b border-border bg-primary">
        <Link href="/" className="flex items-center gap-3 text-white">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10">
            <Package className="h-6 w-6" />
          </div>
          <div className="text-right">
            <div className="text-lg font-bold">TrackPro</div>
            <div className="text-xs text-white/60">Complete Logistics. Total Control.</div>
          </div>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                    isActive
                      ? 'bg-primary/10 text-primary font-semibold'
                      : 'text-foreground/70 hover:bg-gray-100 hover:text-foreground'
                  }`}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  <span>{item.label}</span>
                  {isActive && <ChevronRight className="mr-auto h-4 w-4 text-primary" />}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="border-t border-border p-3">
        <Link
          href="/auth/signin"
          className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground/70 hover:bg-gray-100 hover:text-foreground"
        >
          <LogOut className="h-5 w-5" />
          <span>تسجيل الخروج</span>
        </Link>
      </div>
    </aside>
  );
}