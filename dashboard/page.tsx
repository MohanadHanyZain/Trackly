import Link from 'next/link';
import { Package, MapPin, Truck, Warehouse, Users, FileText, DollarSign, Wallet, Landmark, BarChart3, Settings, Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function DashboardOverview() {
  const stats = [
    { title: 'الشحنات النشطة', value: '0', icon: Package, color: 'bg-primary/10 text-primary', change: '+12% من الشهر الماضي' },
    { title: 'الشحنات المسلمة', value: '0', icon: Truck, color: 'bg-success/10 text-success', change: '+5% من الشهر الماضي' },
    { title: 'الشحنات قيد التوصيل', value: '0', icon: MapPin, color: 'bg-warning/10 text-warning', change: '+3% من الشهر الماضي' },
    { title: 'إجمالي الإيرادات', value: '0', icon: DollarSign, color: 'bg-info/10 text-info', change: '+8% من الشهر الماضي' },
  ];

  const recentShipments = [
    { id: 'ST-2024-001', customer: 'شركة النيل للشحن', destination: 'القاهرة', status: 'in_transit', statusText: 'قيد النقل', statusColor: 'bg-primary/10 text-primary', eta: 'اليوم', rate: '150 جنيهًا' },
    { id: 'ST-2024-002', customer: 'عميل النيل للشحن', destination: 'الإسكندرية', status: 'delivered', statusText: 'مسلمة', statusColor: 'bg-success/10 text-success', eta: 'البارحة', rate: '200 جنيهًا' },
    { id: 'ST-2024-003', customer: 'شركة النيل للشحن', destination: 'الجيزة', status: 'assigned', statusText: 'مع المندوب', statusColor: 'bg-warning/10 text-warning', eta: 'غدًا', rate: '180 جنيهًا' },
    { id: 'ST-2024-004', customer: 'عميل النيل للشحن', destination: 'المنصورة', status: 'pickup_requested', statusText: 'طلب استلام', statusColor: 'bg-info/10 text-info', eta: 'غدًا', rate: '120 جنيهًا' },
  ];

  const urgentTasks = [
    { id: '1', text: 'استلام من المندوب أحمد', branch: 'الفرع الرئيسي', eta: 'في 3 ساعات', priority: 'high', icon: Clock },
    { id: '2', text: 'إنهاء عقد الشحنة ST-2024-003', branch: 'الفرع الرئيسي', eta: 'في 30 دقيقة', priority: 'urgent', icon: AlertCircle },
    { id: '3', text: 'تسجيل الوصول إلى الفرع الرئيسي', branch: 'الفرع الرئيسي', eta: 'الآن', priority: 'medium', icon: CheckCircle },
  ];

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">لوحة التحكم</h1>
          <p className="mt-2 text-muted">مرحبًا TrackPro، إليك نظرة عامة على عملياتك اللوجستية.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="rounded-lg border border-border bg-surface p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted">{stat.title}</p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted">{stat.change}</p>
                </div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">آخر الشحنات</h2>
              <Link href="/dashboard/shipments" className="text-sm text-primary hover:text-primary/80">عرض الكل</Link>
            </div>

            <div className="space-y-4">
              {recentShipments.map((shipment) => (
                <div key={shipment.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div>
                    <div className="font-medium">{shipment.id}</div>
                    <div className="text-sm text-muted">{shipment.customer} → {shipment.destination}</div>
                  </div>
                  <div>
                    <span className={`inline-flex rounded-full px-2 py-1 text-xs font-medium ${shipment.statusColor}`}>
                      {shipment.statusText}
                    </span>
                  </div>
                  <div className="text-sm text-muted">ETA: {shipment.eta}</div>
                  <div className="text-sm font-medium">{shipment.rate}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">المهام العاجلة</h2>
              <button className="text-sm text-primary hover:text-primary/80">إضافة مهمة</button>
            </div>

            <div className="space-y-4">
              {urgentTasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3">
                  <div className={`h-2 w-2 rounded-full ${task.priority === 'urgent' ? 'bg-danger' : task.priority === 'high' ? 'bg-warning' : 'bg-info'}`} />
                  <task.icon className="h-4 w-4 text-muted" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{task.text}</div>
                    <div className="text-xs text-muted">{task.branch}</div>
                  </div>
                  <div className="text-xs text-muted">في {task.eta}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4">القوائم السريعة</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <Link href="/dashboard/shipments" className="rounded-lg border border-border bg-surface p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Package className="h-8 w-8 text-primary" />
                <div>
                  <div className="font-medium">الشحنات</div>
                  <div className="text-sm text-muted">إدارة الشحنات والتتبع</div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/customers" className="rounded-lg border border-border bg-surface p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-success" />
                <div>
                  <div className="font-medium">العملاء</div>
                  <div className="text-sm text-muted">بيانات العملاء والعقود</div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/pickup" className="rounded-lg border border-border bg-surface p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <MapPin className="h-8 w-8 text-warning" />
                <div>
                  <div className="font-medium">الاستلام</div>
                  <div className="text-sm text-muted">طلبات ومواعيد الاستلام</div>
                </div>
              </div>
            </Link>

            <Link href="/dashboard/reports" className="rounded-lg border border-border bg-surface p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-info" />
                <div>
                  <div className="font-medium">التقارير</div>
                  <div className="text-sm text-muted">التحليلات والأداء</div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
