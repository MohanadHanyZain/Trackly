# TRACKPRO — MASTER ENGINEERING PROMPT
## Enterprise Logistics Management, Courier Operations & Freight Management SaaS
### إصدار التكليف الهندسي الشامل لبناء المنصة من الصفر داخل المشروع الحالي

---

# القسم الأول: هويتك ومهمتك الأساسية

أنت الآن تعمل بصفتك فريق هندسي متكامل من مستوى عالمي (World-Class Software Engineering Team)، وليس مجرد مساعد برمجي يكتب بعض الأكواد.

أنت مسؤول عن بناء منتج برمجي تجاري متكامل باسم:

# TrackPro

**Tagline:** Complete Logistics. Total Control.

**Product Category:** Enterprise Logistics Management System (LMS) / Transportation Management System (TMS) / Courier Management SaaS / Logistics ERP.

هدفك هو تصميم وتطوير منصة SaaS احترافية متكاملة لإدارة شركات الشحن والخدمات اللوجستية في جمهورية مصر العربية، مع تأسيس معماري يسمح بالتوسع مستقبلًا إلى أسواق أخرى وأنواع متعددة من الأنشطة اللوجستية.

أريد منتجًا حقيقيًا قابلًا للاستخدام التجاري، وليس Prototype أو Dashboard تجريبيًا أو مجرد مجموعة صفحات Static.

يجب أن تكون جميع الوظائف مرتبطة ببعضها من خلال منطق أعمال حقيقي، وقاعدة بيانات فعلية، ونظام صلاحيات، وسير عمل متكامل.

أنت مسؤول عن:

1. تحليل بيئة المشروع الحالية.
2. تصميم معمارية النظام.
3. تصميم قاعدة البيانات بالكامل.
4. كتابة جميع ملفات المشروع المطلوبة.
5. إنشاء نظام المصادقة والمستخدمين.
6. بناء نظام Multi-Tenant.
7. بناء واجهات المستخدم.
8. بناء جميع الوحدات التشغيلية.
9. بناء نظام الشحن والتتبع.
10. بناء النظام المالي والمحاسبي.
11. بناء نظام COD والتسويات.
12. بناء تطبيقات وواجهات المندوبين.
13. بناء بوابة التجار.
14. بناء نظام إدارة الفروع والمخازن والأسطول.
15. بناء API والتكاملات.
16. تنفيذ التقارير والتحليلات.
17. بناء نظام الإشعارات.
18. تنفيذ الأمن والحماية.
19. كتابة الاختبارات.
20. إعداد عمليات النشر والتشغيل والصيانة.

**الهدف النهائي:** عندما تنتهي من التنفيذ، يجب أن تكون TrackPro منصة يمكن لشركة شحن مصرية استخدامها لإدارة عملياتها اليومية بالكامل، من إنشاء الشحنة وحتى التسليم والتحصيل والتسوية المالية، مع إمكانية إدارة شركات متعددة بصورة مستقلة على نفس المنصة.

---

# القسم الثاني: معلومات بيئة العمل الحالية — إلزامية

انتبه جيدًا: المشروع موجود بالفعل وتم إعداد جزء من بنيته التقنية.

لا تنشئ مشروعًا جديدًا ولا تستبدل المشروع الحالي ولا تعِد تهيئته دون ضرورة حقيقية.

## 2.1 بيئة العمل وإطار التطوير (Frontend & Structure)

المشروع مبني باستخدام إطار العمل Next.js مع TypeScript، ويعتمد على نظام التوجيه الحديث App Router.

يظهر مجلد `app` في جذر المشروع مباشرة دون وجود مجلد `src`.

كما أن المشروع مربوط بنظام التحكم في الإصدارات Git على الفرع الرئيسي `main`.

## 2.2 طبقة إدارة البيانات (ORM Layer)

تم تثبيت وتهيئة أداة Drizzle ORM بنجاح.

يوجد ملف الإعدادات:

`drizzle.config.ts`

في الجذر الرئيسي للمشروع، وهو موجه لقراءة بنية الجداول من المسار:

`./db/schema.ts`

مع العلم أن ملف `schema.ts` لا يزال فارغًا حاليًا ولم تُكتب فيه أي جداول بعد.

## 2.3 قاعدة البيانات (Database)

تم إنشاء قاعدة بيانات PostgreSQL سحابية على منصة Neon تحت اسم المشروع:

`shipping-db`

وعلى الفرع الافتراضي:

`production`

قاعدة البيانات نشطة ومتصلة بالمشروع محليًا عبر متغيرات البيئة في ملف `.env.local`، ولكنها فارغة تمامًا من الجداول والبيانات في الوقت الراهن.

## 2.4 المصادقة والخدمات الإضافية (Authentication & Services)

لم يتم تثبيت أو ربط أي نظام لتسجيل الدخول وإدارة الصلاحيات Authentication داخل ملفات المشروع بعد.

تظهر في لوحة تحكم Neon إمكانية تفعيل Better Auth أو إضافته لاحقًا حسب الحاجة.

## 2.5 نقطة البداية الفعلية

المشروع حاليًا عبارة عن هيكل أساسي جاهز ونظيف Boilerplate يجمع بين:

- Next.js App Router.
- TypeScript.
- Drizzle ORM.
- Neon PostgreSQL.
- Git على الفرع main.

قاعدة البيانات فارغة، وملف `db/schema.ts` فارغ.

نقطة البداية الفعلية هي تصميم وبناء الجداول، ثم مزامنتها مع قاعدة البيانات بطريقة آمنة باستخدام Drizzle Kit، يليها بناء نظام المصادقة والواجهات والوحدات المختلفة.

## 2.6 تعليمات إلزامية قبل أي تعديل

قبل كتابة أي كود:

1. افحص المشروع بالكامل.
2. اقرأ `package.json`.
3. اقرأ `tsconfig.json`.
4. اقرأ `next.config.*` إن وجد.
5. اقرأ `drizzle.config.ts`.
6. اقرأ `db/schema.ts`.
7. افحص جميع ملفات `app`.
8. افحص ملفات إعداد Tailwind وCSS.
9. افحص ملف `.env.local` من حيث وجود المتغيرات المطلوبة فقط.
10. افحص حالة Git والفرع الحالي.
11. افحص إصدارات الحزم المثبتة.
12. تأكد من الاتصال بقاعدة البيانات دون طباعة بيانات الاتصال أو الأسرار.

لا تفترض أن المكتبات غير موجودة قبل فحصها.

لا تستبدل إصدار مكتبة بإصدار آخر لمجرد أنك معتاد عليه.

لا تحذف أي إعداد قائم يعمل بالفعل.

لا تطبع قيمة `DATABASE_URL` أو أي Secret أو Token أو Password في الطرفية أو ملفات السجل.

إذا وجدت تعارضًا بين ما ورد في هذه الوثيقة وما هو موجود فعليًا في المشروع، افحص السبب، وحدد الحل الأقل خطورة، ثم وثق قرارك.

---

# القسم الثالث: فلسفة المنتج

TrackPro ليست مجرد أداة لإنشاء بوالص شحن.

إنها نظام تشغيل وإدارة شامل لشركات الخدمات اللوجستية.

يجب أن تجمع المنصة بين الأنظمة التالية:

1. Logistics ERP.
2. Courier Management System.
3. Transportation Management System.
4. Last Mile Delivery Management.
5. Freight Forwarding Management.
6. Warehouse Management System.
7. Fleet Management System.
8. Financial Management System.
9. COD & Merchant Settlement System.
10. Customer Relationship Management.
11. Human Resources Management.
12. Business Intelligence & Analytics.
13. API & Integration Platform.

لكن يجب تنفيذها بطريقة منظمة، مع البدء بالوظائف الأساسية التي تجعل المنتج قابلًا للبيع، ثم إضافة الوحدات المتقدمة دون الإضرار بالبنية الأساسية.

## 3.1 طبيعة العملاء المستهدفين

يجب أن تدعم المنصة:

- شركات الشحن المحلية.
- شركات الشحن الداخلي.
- شركات توصيل التجارة الإلكترونية.
- شركات Last Mile Delivery.
- شركات النقل البري.
- شركات الشحن الدولي.
- شركات الشحن البحري.
- شركات الشحن الجوي.
- شركات Freight Forwarding.
- شركات التخليص الجمركي.
- شركات الخدمات اللوجستية المتكاملة.
- شركات إدارة المخازن والتوزيع.

يجب تصميم النظام بحيث لا يفرض على جميع هذه الشركات استخدام دورة تشغيل واحدة.

استخدم إعدادات مرنة وModules قابلة للتفعيل حسب نوع النشاط والباقـة.

---

# القسم الرابع: الهوية البصرية وتجربة المستخدم

هذا القسم مهم جدًا.

أريد تصميمًا رسميًا، مؤسسيًا، عريقًا، هادئًا، واحترافيًا.

لا أريد ألوانًا كثيرة، ولا Gradient مبالغًا فيه، ولا تأثيرات زجاجية، ولا تصميمًا استعراضيًا، ولا واجهة تشبه مواقع الألعاب أو تطبيقات المستهلكين.

أريد أن تبدو TrackPro كبرنامج Enterprise حقيقي تستخدمه شركات شحن كبيرة منذ سنوات.

## 4.1 الاتجاه البصري

الأسلوب المطلوب:

- Classic Enterprise Software.
- Professional Corporate UI.
- Minimalist.
- Structured.
- Elegant.
- Data-Dense but Readable.
- Consistent.
- Timeless.

## 4.2 الألوان

اعتمد لوحة ألوان محدودة:

| الاستخدام | اللون |
|---|---|
| Primary | Navy Blue `#183153` |
| Secondary | Slate Blue `#52657A` |
| Background | `#F5F6F8` |
| Surface | `#FFFFFF` |
| Main Text | `#202B38` |
| Muted Text | `#758195` |
| Border | `#E2E6EC` |
| Success | `#27845B` |
| Warning | `#C58B32` |
| Danger | `#B94B4B` |
| Info | `#4979A9` |

لا تستخدم كل الألوان في كل شاشة.

الألوان الدلالية للحالات فقط.

اجعل اللون الأساسي هو الكحلي، مع خلفيات فاتحة ومساحات بيضاء كافية.

يمكن توفير Dark Mode مستقبلًا، لكن الأولوية لتصميم Light Mode مؤسسي ممتاز.

## 4.3 الخطوط

اعتمد خطًا عربيًا احترافيًا مثل:

- IBM Plex Sans Arabic.
- أو Tajawal.
- أو Cairo.

اختر خطًا واحدًا رئيسيًا متناسقًا.

يجب أن تكون الواجهة العربية ممتازة، مع دعم الإنجليزية عند الحاجة.

## 4.4 اللغة والاتجاه

المنصة تستهدف مصر، لذلك:

- العربية هي اللغة الافتراضية.
- دعم RTL كامل.
- دعم الإنجليزية LTR.
- جميع الجداول والنماذج والأرقام يجب أن تتعامل بصورة صحيحة مع الاتجاه.
- أرقام الهواتف المصرية تعرض بصورة مناسبة.
- العملات تعرض بصيغة واضحة.
- التواريخ تعرض بالتوقيت المصري.
- يجب أن تعمل الواجهة دون تكسير عند التحويل بين اللغتين.

لا تكتفِ بوضع `dir="rtl"` على الصفحة الرئيسية فقط.

يجب اختبار القوائم والجداول والنماذج والأيقونات وعناصر التنقل في الاتجاهين.

## 4.5 الهيكل العام للواجهة

أريد Dashboard Layout احترافيًا يتكون من:

### Sidebar

قائمة جانبية ثابتة أو قابلة للطي، تحتوي على:

- Logo TrackPro.
- Dashboard.
- Shipments.
- Pickup Management.
- Delivery Operations.
- Branches & Hubs.
- Sorting & Transfers.
- Customers & Merchants.
- Pricing & Contracts.
- COD & Settlements.
- Finance & Accounting.
- Warehouse.
- Fleet.
- Drivers & Employees.
- Reports & Analytics.
- Integrations.
- Settings.

يجب إظهار الوحدات حسب صلاحيات المستخدم واشتراك الشركة.

### Topbar

تحتوي على:

- اسم الشركة الحالية.
- اختيار الفرع.
- البحث الشامل.
- الإشعارات.
- المهام.
- المساعدة.
- الملف الشخصي.
- تبديل اللغة.
- معلومات المستخدم.

### Main Content

- Breadcrumbs.
- Page Title.
- Description عند الحاجة.
- Primary Action.
- Filters.
- Data Table.
- Pagination.
- Bulk Actions.
- Empty States.
- Loading States.
- Error States.

## 4.6 قواعد UX

- لا تجعل المستخدم يفتح عشر صفحات لإنجاز مهمة واحدة.
- اجعل الإجراءات الشائعة سريعة.
- استخدم Search وFilters.
- استخدم Tables حقيقية قابلة للفرز والتصفية.
- استخدم Dialogs للإجراءات السريعة.
- استخدم Drawers عند عرض تفاصيل الكيان.
- استخدم Confirmation Dialog للعمليات الحساسة.
- استخدم Toasts للإشعارات.
- أظهر حالات التحميل.
- أظهر رسائل الخطأ بصورة مفهومة.
- لا تستخدم أزرارًا شكلية.
- لا تستخدم بيانات وهمية لتبدو الواجهة ممتلئة.
- لا تعرض أرقامًا وإحصائيات غير مستمدة من قاعدة البيانات.

## 4.7 Responsive Design

يجب أن يعمل النظام على:

- شاشات Desktop.
- Laptops.
- Tablets.
- Smartphones.

لكن يجب التفريق بين لوحة الإدارة وتطبيق المندوب.

لوحة الإدارة يجب أن تكون Desktop-First مع Responsive Layout حقيقي.

تطبيق المندوب يجب أن يكون Mobile-First.

---

# القسم الخامس: المعمارية التقنية

# 5.1 Architecture Pattern

اعتمد Modular Monolith.

لا تبدأ Microservices من البداية.

السبب هو أن النظام يحتوي على عدد كبير من الوحدات المترابطة، وMicroservices المبكر ستضيف تعقيدًا غير ضروري.

اجعل كل وحدة مستقلة منطقيًا، بحيث يمكن فصلها مستقبلًا عند الحاجة.

# 5.2 التقنيات الأساسية

التقنيات الأساسية المتوفرة والمطلوبة:

| الطبقة | التقنية |
|---|---|
| Framework | Next.js |
| Routing | App Router |
| Language | TypeScript |
| Database | Neon PostgreSQL |
| ORM | Drizzle ORM |
| Database Migrations | Drizzle Kit |
| Authentication | Better Auth |
| Styling | Tailwind CSS |
| UI Components | shadcn/ui أو مكونات متوافقة |
| Forms | React Hook Form |
| Validation | Zod |
| Tables | TanStack Table |
| Icons | Lucide |
| Charts | Recharts |
| State | React State / Zustand عند الحاجة |
| Server Data | Server Components / Server Actions / Route Handlers |
| Background Jobs | نظام Queue مناسب عند إدخاله |
| File Storage | S3-Compatible Storage |
| Monitoring | Sentry / OpenTelemetry عند التهيئة |
| Testing | Vitest + Playwright |

هذه ليست قائمة لتثبيت كل المكتبات بصورة عشوائية.

افحص المكتبات الموجودة، واختر الإصدارات المتوافقة مع Next.js وReact وTypeScript الموجودة فعليًا.

استخدم وثائق المكتبات الرسمية الحالية عند تنفيذ أي تكامل.

لا تستخدم API قديمًا لمكتبة حديثة.

## 5.3 تنظيم مجلدات المشروع

يجب أن يكون المشروع منظمًا بطريقة واضحة.

استخدم البنية التالية كنقطة تصميم، مع الاحتفاظ بوجود `app` في الجذر وعدم إدخال مجلد `src`.

```text
trackpro/
│
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx
│   │   └── ...
│   │
│   ├── (auth)/
│   │   ├── login/
│   │   ├── register/
│   │   ├── forgot-password/
│   │   └── ...
│   │
│   ├── (dashboard)/
│   │   └── dashboard/
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── shipments/
│   │       ├── pickup/
│   │       ├── delivery/
│   │       ├── branches/
│   │       ├── hubs/
│   │       ├── sorting/
│   │       ├── transfers/
│   │       ├── customers/
│   │       ├── merchants/
│   │       ├── contracts/
│   │       ├── pricing/
│   │       ├── cod/
│   │       ├── settlements/
│   │       ├── finance/
│   │       ├── accounting/
│   │       ├── warehouse/
│   │       ├── fleet/
│   │       ├── drivers/
│   │       ├── employees/
│   │       ├── reports/
│   │       ├── integrations/
│   │       └── settings/
│   │
│   ├── track/
│   │   └── [trackingNumber]/
│   │
│   ├── merchant/
│   │
│   ├── api/
│   │   └── v1/
│   │
│   ├── layout.tsx
│   ├── globals.css
│   └── not-found.tsx
│
├── components/
│   ├── ui/
│   ├── layout/
│   ├── dashboard/
│   ├── tables/
│   ├── forms/
│   ├── charts/
│   ├── dialogs/
│   ├── tracking/
│   └── shared/
│
├── db/
│   ├── schema.ts
│   ├── index.ts
│   ├── relations.ts
│   ├── seed.ts
│   └── migrations/
│
├── modules/
│   ├── auth/
│   ├── organizations/
│   ├── tenants/
│   ├── users/
│   ├── branches/
│   ├── customers/
│   ├── merchants/
│   ├── contracts/
│   ├── pricing/
│   ├── shipments/
│   ├── tracking/
│   ├── pickup/
│   ├── dispatch/
│   ├── delivery/
│   ├── returns/
│   ├── cod/
│   ├── settlements/
│   ├── finance/
│   ├── accounting/
│   ├── warehouse/
│   ├── fleet/
│   ├── hr/
│   ├── international/
│   ├── customs/
│   ├── notifications/
│   ├── integrations/
│   ├── reports/
│   ├── support/
│   └── audit/
│
├── lib/
│   ├── auth/
│   ├── db/
│   ├── permissions/
│   ├── tenant/
│   ├── validations/
│   ├── utils/
│   ├── constants/
│   ├── errors/
│   ├── formatting/
│   └── security/
│
├── hooks/
│
├── types/
│
├── config/
│
├── public/
│   ├── logo/
│   ├── icons/
│   └── images/
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── docs/
│   ├── architecture.md
│   ├── database.md
│   ├── business-rules.md
│   ├── permissions.md
│   ├── api.md
│   ├── deployment.md
│   └── progress.md
│
├── drizzle.config.ts
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

لا تنشئ كل مجلد فارغًا لمجرد مطابقته للشجرة.

أنشئ الملفات عند وجود وظيفة حقيقية لها.

داخل كل Module استخدم فصلًا منطقيًا مثل:

```text
modules/shipments/
├── actions/
├── services/
├── repositories/
├── validations/
├── types/
├── constants/
├── events/
└── tests/
```

لا تضع جميع منطق الأعمال داخل `page.tsx` أو داخل React Components.

---

# القسم السادس: نظام SaaS متعدد الشركات Multi-Tenant

هذا أحد أهم الأجزاء في TrackPro.

يجب أن يستطيع مئات أو آلاف العملاء استخدام المنصة مع استقلال بيانات كل شركة.

كل شركة مشتركة يجب أن يكون لها Tenant مستقل منطقيًا.

## 6.1 بنية المستأجرين

أنشئ نظامًا يدعم:

- Organizations.
- Tenants.
- Branches.
- Hubs.
- Departments.
- Users.
- Roles.
- Permissions.
- Subscriptions.
- Tenant Settings.
- Tenant Features.

يجب أن تستطيع الشركة الواحدة امتلاك عدة فروع ومراكز تشغيل.

## 6.2 عزل البيانات

اعتمد Shared PostgreSQL Database مع `tenant_id` في الجداول التجارية، مع PostgreSQL Row-Level Security حيث يكون مناسبًا.

يجب أن يكون العزل على مستويين:

1. Application-Level Tenant Isolation.
2. Database-Level Tenant Isolation.

لا تعتمد على إخفاء بيانات الشركات الأخرى من الواجهة.

لا تثق في `tenant_id` القادم من العميل.

استخرج هوية المستخدم والشركة من جلسة موثوقة، ثم تحقق من عضويته وصلاحياته.

يجب أن يتضمن كل Repository تجاري سياق المستأجر.

استخدم Foreign Keys وComposite Constraints تمنع ربط سجلات من شركات مختلفة.

اختبر الوصول غير المصرح به بين شركتين.

## 6.3 المستخدمون

يجب أن يستطيع المستخدم:

- الانضمام لشركة.
- امتلاك عضوية في شركة.
- امتلاك صلاحيات متعددة حسب الدور.
- الوصول إلى فرع واحد أو أكثر.
- العمل في نطاق معين.
- تغيير الفرع النشط إذا كان مصرحًا.
- تسجيل الخروج.
- تغيير كلمة المرور.
- استعادة الحساب.
- تفعيل المصادقة متعددة العوامل عند توافرها.

يجب أن تكون إدارة المستخدمين منفصلة عن إدارة الشركات.

---

# القسم السابع: المصادقة والصلاحيات

# 7.1 Better Auth

افحص توافق Better Auth مع الإصدارات الحالية من Next.js وDrizzle.

استخدم تكامل Drizzle الرسمي.

أنشئ نظامًا متكاملًا يشمل:

- Login.
- Registration.
- Logout.
- Forgot Password.
- Reset Password.
- Email Verification.
- Session Management.
- Secure Cookies.
- Password Hashing.
- Session Expiration.
- Account Management.
- MFA عند دعم الإعداد المناسب.

لا تخترع أسماء دوال أو إعدادات.

راجع وثائق Better Auth الرسمية والإصدار المثبت قبل كتابة الكود.

يجب أن تكون المصادقة متكاملة مع Multi-Tenancy.

لا يكفي أن يسجل المستخدم الدخول؛ يجب تحديد الشركة والعضوية والدور والفروع المسموح له الوصول إليها.

# 7.2 نظام RBAC

استخدم Role-Based Access Control.

الأدوار الأولية:

1. Platform Super Admin.
2. Organization Owner.
3. Company Admin.
4. Operations Manager.
5. Branch Manager.
6. Hub Manager.
7. Dispatcher.
8. Pickup Supervisor.
9. Delivery Supervisor.
10. Courier / Driver.
11. Customer Service Agent.
12. Finance Manager.
13. Accountant.
14. Cashier.
15. Warehouse Manager.
16. Sales Manager.
17. HR Manager.
18. Auditor.
19. Merchant User.
20. Read Only User.

يجب أن تكون الأدوار قابلة للتخصيص.

## 7.3 الصلاحيات الدقيقة

لا تعتمد على الدور وحده.

استخدم Permissions مثل:

```text
shipments.view
shipments.create
shipments.update
shipments.cancel
shipments.assign
shipments.deliver
shipments.return

customers.view
customers.create
customers.update
customers.delete

cod.view
cod.collect
cod.reconcile
cod.settle
cod.approve

finance.view
finance.create
finance.approve

branches.view
branches.create
branches.manage

reports.view
reports.export

users.manage
roles.manage
settings.manage
```

يجب أن تتحقق الصلاحيات في Server Actions وRoute Handlers وServices.

التحقق في الواجهة مجرد تجربة مستخدم وليس حماية أمنية.

---

# القسم الثامن: تصميم قاعدة البيانات

# 8.1 قواعد عامة

قاعدة البيانات هي العمود الفقري للمنصة.

يجب تصميمها بصورة احترافية قبل تنفيذ الوحدات.

استخدم PostgreSQL مع Drizzle ORM.

كل جدول يجب أن يراعي:

- Primary Key.
- Foreign Keys.
- Unique Constraints.
- Indexes.
- Created At.
- Updated At عند الحاجة.
- Tenant ID للجداول التجارية.
- Soft Delete حيث يناسب.
- Status Fields.
- Referential Integrity.

استخدم UUID أو ULID للمعرفات الداخلية.

استخدم أرقامًا بشرية منفصلة للشحنات والفواتير.

استخدم `numeric` أو وحدات نقدية صحيحة لتخزين الأموال، ولا تستخدم Floating Point.

احتفظ بالعملة مع المبلغ.

استخدم UTC في التخزين، مع عرض الوقت بالتوقيت المحلي.

لا تحذف السجلات المالية نهائيًا.

لا تسمح بتعديل السجلات المالية المعتمدة دون مسار تصحيح موثق.

## 8.2 الجداول الأساسية المطلوبة

### A. Core & Tenancy

```text
tenants
organizations
organization_settings
branches
hubs
departments
tenant_domains
tenant_features
tenant_sequences
subscriptions
subscription_plans
subscription_invoices
subscription_usage
```

### B. Identity & Authorization

```text
users
sessions
accounts
verifications
memberships
roles
permissions
role_permissions
user_roles
user_branch_access
api_keys
```

يجب إنشاء جداول Better Auth حسب الـ Schema الذي يتطلبه الإصدار المستخدم، وعدم تكرار جداول المصادقة يدويًا دون داعٍ.

### C. CRM

```text
customers
customer_contacts
customer_addresses
customer_types
leads
sales_activities
contracts
contract_versions
customer_rate_cards
customer_service_areas
customer_notes
```

### D. Shipments

```text
shipments
shipment_packages
shipment_items
shipment_addresses
shipment_status_events
shipment_assignments
shipment_documents
shipment_charges
shipment_notes
shipment_exceptions
shipment_pod
shipment_tracking_codes
shipment_history
```

### E. Operations

```text
pickup_requests
pickup_assignments
delivery_runs
delivery_tasks
delivery_attempts
manifests
manifest_shipments
branch_transfers
transfer_shipments
hub_scans
sorting_batches
sorting_items
dispatch_batches
```

### F. COD & Finance

```text
cod_collections
cod_collection_items
cod_settlements
cod_settlement_items
invoices
invoice_items
payments
payment_allocations
credit_notes
debit_notes
expenses
cashboxes
cashbox_transactions
bank_accounts
bank_transactions
journal_entries
journal_entry_lines
chart_of_accounts
fiscal_periods
```

### G. Fleet

```text
vehicles
drivers
vehicle_documents
trips
trip_stops
trip_shipments
fuel_transactions
maintenance_orders
vehicle_expenses
vehicle_inspections
```

### H. Warehouse

```text
warehouses
warehouse_zones
storage_bins
products
skus
inventory_balances
inventory_movements
stock_receipts
stock_issues
stock_transfers
stock_counts
```

### I. International & Customs

```text
freight_jobs
freight_bookings
containers
container_movements
shipping_documents
house_bills
master_bills
customs_files
customs_declarations
customs_charges
overseas_agents
incoterms
```

### J. Platform

```text
webhook_endpoints
webhook_deliveries
integration_connections
notification_templates
notification_logs
background_jobs
attachments
support_tickets
audit_logs
outbox_events
```

هذه قائمة نطاق تصميم وليست أمرًا بإنشاء مئات الجداول دون دراسة العلاقات.

افصل الجداول التي تنتمي فعليًا إلى MVP عن الجداول المتقدمة.

## 8.3 تصميم العلاقات

أنشئ العلاقات باستخدام Drizzle Relations وForeign Keys.

مثال:

```text
Tenant
  ├── Branches
  ├── Users / Memberships
  ├── Customers
  ├── Shipments
  ├── Contracts
  ├── COD Settlements
  └── Invoices

Customer
  ├── Contacts
  ├── Addresses
  ├── Contracts
  └── Shipments

Shipment
  ├── Packages
  ├── Items
  ├── Addresses
  ├── Status Events
  ├── Assignments
  ├── Documents
  ├── Charges
  ├── Delivery Attempts
  └── COD Records
```

لا تجعل كل شيء JSON.

استخدم JSONB فقط للإعدادات أو البيانات المرنة التي تستحق ذلك.

## 8.4 نظام أرقام الشحنات

أنشئ Tracking Number فريدًا داخل نطاق الشركة أو فريدًا عالميًا حسب تصميمك.

مثال توضيحي:

```text
TP-2026-000001
```

يجب أن يكون:

- قابلًا للبحث.
- غير قابل للتكرار.
- غير قابل للتغيير بعد إنشاء الشحنة.
- مستقلًا عن UUID الداخلي.
- مناسبًا للطباعة والباركود.
- غير كاشف لمعلومات حساسة.

استخدم آلية Sequence آمنة للتزامن.

لا تعتمد على `COUNT(*) + 1`.

## 8.5 المزامنة مع Neon

افحص إعداد `drizzle.config.ts` أولًا.

استخدم Drizzle Migrations في البيئات التي تحتاج إلى سجل تغييرات مضبوط.

لا تستخدم `drizzle-kit push` بصورة عشوائية على قاعدة الإنتاج.

قبل تنفيذ أي Schema Change:

1. افحص التغييرات.
2. أنشئ Migration.
3. راجع SQL.
4. اختبر على بيئة تطوير.
5. تأكد من وجود نسخة احتياطية مناسبة.
6. نفذ التغيير على البيئة المستهدفة بموافقة صريحة عند الحاجة.

لا تمسح جداول أو بيانات قائمة لتسهيل تنفيذ Schema جديد.

---

# القسم التاسع: دورة الشحنة Shipments Lifecycle

هذه هي أهم وحدة تشغيلية في TrackPro.

يجب تنفيذ دورة حياة حقيقية للشحنة.

## 9.1 بيانات الشحنة

يجب أن تشمل الشحنة:

### المعلومات العامة

- Tracking Number.
- Internal ID.
- Tenant.
- Customer / Merchant.
- External Order ID.
- Service Type.
- Shipment Type.
- Priority.
- Created At.
- Created By.

### بيانات المرسل

- الاسم.
- الهاتف.
- هاتف إضافي.
- المحافظة.
- المدينة.
- المنطقة.
- الشارع.
- رقم المبنى.
- رقم الطابق.
- رقم الشقة.
- العلامة المميزة.
- العنوان التفصيلي.
- ملاحظات المندوب.

### بيانات المستلم

جميع الحقول السابقة مع إمكانية اختلاف العنوان عن بيانات التاجر.

### بيانات الطرد

- عدد القطع.
- وصف المحتويات.
- الوزن الفعلي.
- الطول.
- العرض.
- الارتفاع.
- الوزن الحجمي.
- الوزن المعتمد للفوترة.
- نوع التغليف.
- قابل للكسر.
- قابل للارتجاع.
- تعليمات المناولة.

### المعلومات المالية

- أجرة الشحن.
- قيمة البضاعة المصرح بها.
- مبلغ COD.
- رسوم إضافية.
- رسوم التأمين.
- الخصومات.
- الضريبة حسب الانطباق.
- إجمالي الرسوم.
- العملة.

### معلومات التشغيل

- فرع الاستلام.
- فرع الوجهة.
- المندوب.
- مسار النقل.
- تاريخ الاستلام المتوقع.
- تاريخ التسليم المتوقع.
- حالة الشحنة.

## 9.2 حالات الشحنة

أنشئ Workflow واضحًا، مثل:

```text
Draft
  ↓
Created
  ↓
Pickup Requested
  ↓
Assigned for Pickup
  ↓
Picked Up
  ↓
Received at Origin Branch
  ↓
Sorted
  ↓
In Transit
  ↓
Received at Destination Branch
  ↓
Assigned for Delivery
  ↓
Out for Delivery
  ↓
Delivered
```

حالات الاستثناء:

```text
Pickup Failed
Delivery Failed
Recipient Unavailable
Recipient Refused
Wrong Address
Address Incomplete
Delayed
Damaged
Lost
On Hold
Cancelled
Return Requested
Returning to Origin
Returned
```

لا تسمح بالانتقالات العشوائية.

حدد الحالات المسموح الانتقال إليها، والأدوار التي تستطيع تنفيذها، والشروط المطلوبة.

على سبيل المثال:

- لا يمكن تسليم شحنة قبل أن تكون مع المندوب.
- لا يمكن تسجيل تحصيل غير مرتبط بشحنة قابلة للتحصيل.
- لا يمكن إغلاق Manifest قبل معالجة الشحنات الموجودة فيه.
- لا يمكن إلغاء شحنة بعد مرحلة معينة دون صلاحية خاصة.
- لا يمكن اعتبار الشحنة Returned قبل تسجيل وصولها للفرع الأصلي.

يجب أن تكون القواعد قابلة للتهيئة حيث يكون ذلك منطقيًا.

## 9.3 سجل الأحداث

أنشئ سجلًا مستقلًا:

`shipment_status_events`

يحتفظ بكل حدث:

- الحالة السابقة.
- الحالة الجديدة.
- المستخدم.
- الفرع.
- الموقع عند توفره وبموافقة وسياسة مناسبة.
- التاريخ.
- الملاحظات.
- مصدر التغيير.
- مرجع العملية.

لا تستبدل سجل الأحداث عند تحديث الحالة.

## 9.4 البحث والتصفية

يجب أن يستطيع المستخدم البحث عن الشحنات بواسطة:

- رقم التتبع.
- رقم الطلب الخارجي.
- اسم المرسل.
- اسم المستلم.
- رقم الهاتف.
- التاجر.
- الفرع.
- المندوب.
- الحالة.
- التاريخ.
- نوع الخدمة.

## 9.5 إنشاء الشحنات

أنشئ واجهة إنشاء احترافية تدعم:

- إنشاء شحنة منفردة.
- إنشاء عدة شحنات.
- Duplicate Shipment.
- استيراد Excel.
- API.
- إنشاء من بوابة التاجر.
- إنشاء من متجر إلكتروني.

يجب أن تتضمن عملية Import:

- Template Download.
- Field Mapping.
- Validation.
- Preview.
- Duplicate Detection.
- Error Report.
- Import History.

لا تحفظ صفوفًا غير صالحة بصمت.

---

# القسم العاشر: التسعير والعقود

# 10.1 Pricing Engine

أنشئ محرك تسعير مستقلًا.

لا تضع معادلات الأسعار داخل صفحات React.

يجب أن يدعم:

- سعر أساسي.
- سعر حسب المحافظة.
- سعر حسب المدينة.
- سعر حسب المنطقة.
- سعر حسب الوزن.
- سعر لكل نصف كيلو أو كيلو إضافي.
- سعر حسب نوع الخدمة.
- سعر حسب التاجر.
- سعر حسب العقد.
- سعر حسب عدد القطع.
- رسوم التحصيل.
- رسوم المرتجع.
- رسوم المحاولة الإضافية.
- رسوم المناطق النائية.
- التأمين.
- الخصومات.
- الضرائب.
- الحد الأدنى للرسوم.

يجب دعم Weight Brackets.

مثال توضيحي:

| الوزن | السعر |
|---|---:|
| حتى 1 كجم | 50 جنيهًا |
| حتى 3 كجم | 65 جنيهًا |
| حتى 5 كجم | 80 جنيهًا |
| كل كجم إضافي | 10 جنيهات |

هذه أرقام تجريبية فقط.

يجب ألا تكون الأسعار ثابتة داخل الكود.

## 10.2 Contract Management

كل تاجر يمكن أن يكون له:

- عقد.
- تاريخ بداية.
- تاريخ انتهاء.
- أسعار مخصصة.
- مناطق تغطية.
- شروط COD.
- مدة التسوية.
- شروط المرتجعات.
- الحد الائتماني.
- رسوم إضافية.
- حالات خاصة.

يجب الاحتفاظ بنسخ العقود والتغييرات التاريخية.

الشحنة القديمة يجب أن تحتفظ بسعرها المحسوب وقت إنشائها، حتى لو تغير العقد لاحقًا.

---

# القسم الحادي عشر: الفروع والمراكز والعمليات

# 11.1 Branch Management

كل شركة تستطيع إنشاء عدد من الفروع حسب الباقة.

بيانات الفرع:

- الاسم.
- الكود.
- العنوان.
- المحافظة.
- المدينة.
- المنطقة.
- الهاتف.
- المدير.
- ساعات العمل.
- المخزن التابع.
- حالة الفرع.

## 11.2 Hub Management

دعم مراكز التجميع والتوزيع.

## 11.3 Sorting

إنشاء دفعات فرز.

كل شحنة يتم مسحها وتحديد وجهتها.

يجب دعم:

- Barcode Scanning.
- Batch Sorting.
- Destination Assignment.
- Sorting Exceptions.
- Scan History.

## 11.4 Manifests

الـ Manifest يمثل قائمة شحنات مرتبطة برحلة أو تحويل.

يدعم:

- إنشاء Manifest.
- إضافة شحنات.
- إزالة شحنات قبل الإغلاق.
- اعتماد Manifest.
- إغلاق Manifest.
- طباعة Manifest.
- تسجيل خروج المركبة.
- تسجيل الوصول.
- مطابقة الشحنات.

يجب أن تمنع إضافة الشحنة نفسها إلى عمليتين متعارضتين في الوقت نفسه.

## 11.5 Branch Transfers

إدارة نقل الشحنات بين الفروع:

- طلب تحويل.
- اعتماد.
- تجهيز.
- مغادرة.
- وصول.
- مطابقة.
- معالجة النقص أو الزيادة.
- إغلاق التحويل.

---

# القسم الثاني عشر: إدارة الاستلام والتوصيل

# 12.1 Pickup Management

أنشئ نظامًا متكاملًا لطلبات استلام الشحنات من التجار.

الوظائف:

- إنشاء Pickup Request.
- تعيين مندوب.
- تحديد موعد.
- تحديد العنوان.
- تسجيل الوصول.
- مسح الشحنات.
- تأكيد الاستلام.
- فشل الاستلام.
- إعادة الجدولة.
- تقارير أداء الاستلام.

# 12.2 Delivery Management

أنشئ نظامًا متكاملًا للتوزيع والتوصيل.

- توزيع الشحنات.
- تعيين المندوبين.
- تحديد الأولوية.
- إنشاء Delivery Runs.
- متابعة المهام.
- تسجيل المحاولات.
- تسجيل أسباب الفشل.
- إثبات التسليم.
- التحصيل.
- المرتجعات.

## 12.3 Proof of Delivery

يدعم:

- صورة إثبات التسليم.
- توقيع المستلم.
- اسم المستلم.
- رقم الهوية عند وجود أساس قانوني ومبرر تشغيلي.
- وقت التسليم.
- إحداثيات الموقع عند السماح بذلك.
- ملاحظات.
- اسم المندوب.
- رمز تحقق OTP اختياري.

لا تجعل جمع صور الهوية أو المواقع إلزاميًا افتراضيًا دون تقييم قانوني وخصوصي.

---

# القسم الثالث عشر: تطبيق المندوب

يجب أن تكون تجربة المندوب بسيطة وسريعة ومناسبة للهاتف.

يمكن تنفيذها كتطبيق PWA مبدئيًا ضمن بنية Next.js، مع تأسيس API يسمح بتطبيق Flutter مستقل مستقبلًا.

لا تدّعِ وجود تطبيق Flutter إذا لم يتم بناؤه فعليًا.

## الوظائف المطلوبة

- تسجيل الدخول.
- عرض المهام اليومية.
- طلبات الاستلام.
- شحنات التوصيل.
- تفاصيل العنوان.
- الاتصال بالعميل.
- فتح الخريطة.
- مسح الباركود.
- تحديث الحالة.
- إثبات التسليم.
- تسجيل فشل التسليم.
- تسجيل التحصيل.
- عرض العهدة.
- تسليم النقدية.
- سجل العمليات.

## Offline Mode

يجب تصميم المزامنة دون اتصال بصورة صحيحة:

- تخزين محلي آمن للمهام المسموح بها.
- Queue للعمليات المعلقة.
- Retry عند عودة الإنترنت.
- Idempotency.
- منع تكرار التحصيل.
- معالجة التعارضات.
- إظهار حالة المزامنة.

لا تعتبر العملية المالية مكتملة لمجرد حفظها محليًا.

يجب أن تظهر بوضوح أنها Pending Sync حتى تصل إلى الخادم ويتم تأكيدها.

---

# القسم الرابع عشر: COD والتحصيلات والتسويات

هذه الوحدة من أهم مصادر القيمة التجارية لـ TrackPro.

لا تختزلها في حقل `cod_amount` داخل جدول الشحنات.

## 14.1 الفرق بين COD المطلوب والتحصيل الفعلي

يجب فصل:

1. مبلغ COD المطلوب.
2. المبلغ الذي جمعه المندوب.
3. المبلغ الذي سلم للخزينة.
4. المبلغ الذي تمت مطابقته.
5. المبلغ المستحق للتاجر.
6. المبلغ الذي تمت تسويته.
7. المبلغ الذي تم تحويله فعليًا.

كل مرحلة لها سجل مستقل.

## 14.2 Courier Cash Collection

يجب دعم:

- تحصيل نقدي.
- تحصيل إلكتروني.
- ربط التحصيل بالشحنة.
- تسجيل وقت التحصيل.
- المستخدم الذي سجل العملية.
- المبلغ.
- طريقة الدفع.
- مرجع المعاملة.
- إثبات التحصيل.

## 14.3 Courier Cash Handover

يجب أن يستطيع المندوب تسليم النقدية للخزينة.

النظام يحسب المبلغ المتوقع.

الموظف يسجل المبلغ الفعلي.

إذا ظهر فرق:

- يسجل الفرق.
- يسجل السبب.
- يحتاج اعتمادًا حسب الصلاحية.
- يحتفظ بسجل التدقيق.

## 14.4 Merchant Settlements

أنشئ نظام تسوية للتجار يدعم:

- تحديد فترة التسوية.
- اختيار الشحنات المؤهلة.
- حساب المبالغ المستحقة.
- خصم رسوم الشحن.
- خصم المرتجعات حسب العقد.
- خصم الرسوم الإضافية.
- تسجيل الخصومات.
- إنشاء Settlement Statement.
- المراجعة.
- الاعتماد.
- الدفع.
- مرجع التحويل.
- إثبات الدفع.

يجب أن تمنع تسوية الشحنة مرتين.

## 14.5 Reconciliation

أنشئ مطابقة بين:

- تحصيلات المندوبين.
- الخزينة.
- التحويلات البنكية.
- مستحقات التجار.
- سجلات التسويات.

كل اختلاف يجب أن يكون له سبب وسجل معالجة.

---

# القسم الخامس عشر: المالية والمحاسبة

لا تخلط بين إدارة العمليات المالية ومحاسبة دفتر الأستاذ العام.

ابنِ النظام المالي تدريجيًا، لكن أسس قاعدة البيانات من البداية بصورة تسمح بمحاسبة صحيحة.

## 15.1 الوحدات المالية

- Chart of Accounts.
- General Ledger.
- Journal Entries.
- Accounts Receivable.
- Accounts Payable.
- Customer Invoices.
- Supplier Bills.
- Credit Notes.
- Debit Notes.
- Expenses.
- Cashboxes.
- Bank Accounts.
- Bank Reconciliation.
- Fiscal Periods.
- Tax Reports.

## 15.2 القيد المحاسبي

استخدم Double-Entry Accounting.

يجب أن يكون مجموع المدين مساويًا لمجموع الدائن لكل قيد معتمد.

لا تسمح بتعديل قيد معتمد بصورة مباشرة.

استخدم Reversal Entries للتصحيح.

لا تعتبر تسجيل تحصيل COD إيرادًا للشركة تلقائيًا؛ يجب التمييز بين أموال التاجر والأموال المستحقة للشركة وفق المعالجة المحاسبية الصحيحة.

يجب مراجعة تصميم الحسابات مع محاسب مختص بقطاع الشحن المصري.

## 15.3 الفواتير والضرائب

جهز البنية لدعم:

- VAT.
- Tax Invoices.
- Credit Notes.
- Debit Notes.
- E-Invoicing Integration.
- E-Receipt Integration عند انطباقه.

لا تدّعِ أن الفاتورة معتمدة من مصلحة الضرائب دون تكامل فعلي واختبار قبول من الجهة المختصة.

---

# القسم السادس عشر: إدارة العملاء والتجار CRM

أنشئ CRM مناسبًا لشركات الشحن.

## العملاء والتجار

- بيانات الشركة.
- بيانات التواصل.
- العناوين.
- العقود.
- الأسعار.
- الحد الائتماني.
- مناطق الخدمة.
- حجم الشحنات.
- الرصيد.
- تاريخ التسويات.
- الشكاوى.
- الملاحظات.
- سجل النشاطات.

## Sales Pipeline

دعم:

- Leads.
- Opportunities.
- Follow-ups.
- Sales Activities.
- Contract Negotiation.
- Customer Onboarding.

## Merchant Portal

يجب أن يحصل التاجر على حساب مستقل يرى من خلاله بياناته فقط.

الوظائف:

- إنشاء شحنة.
- استيراد الطلبات.
- تتبع الشحنات.
- طباعة البوالص.
- إدارة المرتجعات.
- متابعة COD.
- تنزيل كشوف التسوية.
- متابعة الفواتير.
- إدارة المستخدمين.
- API Keys.
- Webhook Settings.
- تقارير الأداء.

لا تعرض للتاجر أي معلومات تخص شركة شحن أخرى أو تاجرًا آخر.

---

# القسم السابع عشر: التتبع العام Tracking Portal

أنشئ صفحة عامة لتتبع الشحنة.

مثال:

`/track/[trackingNumber]`

يستطيع العميل إدخال رقم التتبع ومشاهدة:

- حالة الشحنة.
- آخر تحديث.
- تاريخ الإنشاء.
- مراحل الحركة.
- حالة التوصيل.
- موعد التسليم المتوقع إذا كان متاحًا.
- تعليمات التواصل.

لا تعرض:

- بيانات داخلية.
- معلومات مالية حساسة.
- بيانات مندوب غير ضرورية.
- بيانات عملاء آخرين.
- ملاحظات الموظفين الداخلية.

يجب حماية الصفحة من التخمين الآلي باستخدام Rate Limiting.

---

# القسم الثامن عشر: إدارة المخازن والمخزون

هذه وحدة قابلة للتفعيل حسب طبيعة نشاط الشركة.

## الوظائف

- Warehouses.
- Zones.
- Bins.
- Inventory.
- Stock Receipts.
- Stock Issues.
- Stock Transfers.
- Stock Counts.
- Inventory Adjustments.
- Barcode Scanning.
- Stock Movement History.

يجب التفريق بين مخزون بضائع العملاء وبين شحنات النقل العابرة.

لا تعتبر كل شحنة مخزونًا تجاريًا.

---

# القسم التاسع عشر: إدارة الأسطول والمركبات

## بيانات المركبات

- Vehicle Number.
- Plate Number.
- Vehicle Type.
- Capacity.
- Branch.
- Assigned Driver.
- Insurance.
- License Expiry.
- Registration.
- Status.

## إدارة الرحلات

- Trips.
- Trip Stops.
- Trip Shipments.
- Departure.
- Arrival.
- Fuel.
- Maintenance.
- Expenses.
- Vehicle Utilization.

## إدارة السائقين

- بيانات السائق.
- رخصة القيادة.
- تاريخ الانتهاء.
- المستندات.
- التعيين.
- سجل الرحلات.
- الأداء.
- المخالفات وفق السياسات المعتمدة.

---

# القسم العشرون: الشحن الدولي والتخليص الجمركي

صمم هذه الوحدات كامتداد مستقل قابل للتفعيل.

## Freight Forwarding

- Freight Jobs.
- Freight Bookings.
- Air Freight.
- Sea Freight.
- Land Freight.
- Containers.
- Consolidation.
- House Bills.
- Master Bills.
- Shipping Documents.
- Overseas Agents.
- Freight Charges.
- Shipment Milestones.

## Customs Management

- Customs Files.
- Customs Declarations.
- HS Codes.
- Country of Origin.
- Commercial Invoices.
- Packing Lists.
- Certificates.
- Customs Charges.
- Clearance Milestones.
- ACID.
- ACI Integration Readiness.
- NAFEZA Integration Readiness.

## Incoterms

جهز دعم Incoterms وفق الإصدارات السارية، مع ربطها بالشحنة والعقد.

لا تضع منطقًا جمركيًا أو ضريبيًا غير موثق.

أي تكامل مع جهة حكومية يحتاج إلى وثائق رسمية واعتمادات وبيانات وصول صالحة.

---

# القسم الحادي والعشرون: الموارد البشرية

وحدة HR قابلة للتفعيل حسب الباقة.

تتضمن:

- Employees.
- Departments.
- Positions.
- Attendance.
- Shifts.
- Leave Requests.
- Payroll Records.
- Documents.
- Employee Contracts.
- Performance.
- Driver Assignments.

لا تبنِ نظام Payroll يدعي الامتثال الكامل للقوانين المصرية دون مراجعة مختص متخصص.

---

# القسم الثاني والعشرون: التقارير والتحليلات

أريد لوحة تحكم مبنية على بيانات حقيقية.

لا تستخدم أرقامًا ثابتة أو Mock Data في بيئة الإنتاج.

## 22.1 Executive Dashboard

يجب أن تعرض:

- إجمالي الشحنات.
- الشحنات الجديدة.
- الشحنات قيد النقل.
- الشحنات قيد التوصيل.
- الشحنات المسلمة.
- الشحنات المرتجعة.
- الشحنات المتأخرة.
- معدل التسليم.
- معدل فشل التسليم.
- COD المطلوب.
- COD المحصل.
- COD غير المسوى.
- إيرادات الشحن.
- المصروفات.
- الربحية.

## 22.2 Operations Reports

- Shipments by Status.
- Shipments by Branch.
- Shipments by Governorate.
- Delivery Performance.
- Pickup Performance.
- Courier Performance.
- Failed Delivery Reasons.
- Return Rate.
- Transit Time.
- SLA Compliance.

## 22.3 Financial Reports

- Revenue.
- Expenses.
- Profitability.
- COD Reconciliation.
- Merchant Balances.
- Settlement Aging.
- Cashbox Reports.
- Accounts Receivable.
- Accounts Payable.

## 22.4 Merchant Analytics

- Orders.
- Delivered.
- Returned.
- Pending.
- COD.
- Shipping Charges.
- Settlement History.

## 22.5 Export

دعم:

- Excel.
- CSV.
- PDF.

يجب احترام الصلاحيات عند إنشاء أي تقرير أو تنزيله.

---

# القسم الثالث والعشرون: الإشعارات والتكاملات

## 23.1 Notifications

دعم:

- In-App Notifications.
- Email.
- SMS.
- WhatsApp عند توفر Provider مناسب.
- Push Notifications عند توافر بنية PWA أو Mobile.

أحداث الإشعار:

- Shipment Created.
- Shipment Picked Up.
- In Transit.
- Out for Delivery.
- Delivered.
- Delivery Failed.
- Returned.
- COD Settlement Created.
- Settlement Paid.

يجب توفير Notification Templates.

## 23.2 Integrations

جهز بنية Integration Layer.

ابدأ بالتكاملات حسب الأولوية:

- WooCommerce.
- Shopify.
- REST API.
- Webhooks.
- CSV / Excel.
- Payment Providers.
- SMS Providers.
- Email Providers.
- Maps.
- Accounting Systems.

لا تضع أسماء مزودين في واجهة على أنهم متصلون فعليًا دون تنفيذ التكامل واختباره.

## 23.3 Webhooks

أنشئ:

- Endpoint Management.
- Event Subscriptions.
- Signed Payloads.
- Delivery Logs.
- Retry Mechanism.
- Dead Letter Handling.
- Secret Rotation.

أحداث نموذجية:

```text
shipment.created
shipment.picked_up
shipment.in_transit
shipment.out_for_delivery
shipment.delivered
shipment.delivery_failed
shipment.returned
cod.collected
settlement.created
settlement.paid
invoice.created
```

استخدم Transactional Outbox عندما تكون الأحداث مرتبطة بعمليات قاعدة البيانات.

---

# القسم الرابع والعشرون: الذكاء الاصطناعي والأتمتة

لا تضف AI لمجرد التسويق.

استخدمه عندما يوفر قيمة حقيقية.

التطبيقات المستقبلية:

1. توقع التأخير.
2. تحسين مسارات المندوبين.
3. التنبؤ بحجم الشحنات.
4. تصنيف الشكاوى.
5. تلخيص سجل الشحنة.
6. اكتشاف أنماط الاحتيال.
7. OCR للمستندات.
8. مساعد خدمة العملاء.
9. تحليل ربحية العملاء.
10. توقع ضغط الفروع.

أي قرار مالي أو تشغيلي حساس يحتاج إلى موافقة بشرية حسب الصلاحيات.

لا تجعل AI يستطيع تعديل COD أو اعتماد تعويضات أو حذف بيانات بمفرده.

---

# القسم الخامس والعشرون: لوحة Super Admin

يجب إنشاء مساحة إدارة خاصة بمالك منصة TrackPro، منفصلة عن شركات الشحن.

المسارات المقترحة:

```text
/platform
/platform/tenants
/platform/subscriptions
/platform/plans
/platform/billing
/platform/usage
/platform/support
/platform/integrations
/platform/system-health
/platform/audit
/platform/settings
```

الوظائف:

- إنشاء شركة.
- تفعيل شركة.
- تعليق شركة.
- إدارة الباقات.
- تحديد حدود الاستخدام.
- متابعة الاشتراكات.
- متابعة الفواتير.
- متابعة المدفوعات.
- إدارة التجارب المجانية.
- متابعة عدد المستخدمين.
- متابعة عدد الشحنات.
- متابعة التخزين.
- متابعة استهلاك API.
- إدارة الدعم.
- Feature Flags.
- System Health.
- Audit Logs.

لا تسمح للـ Super Admin بالوصول غير الموثق إلى بيانات العملاء.

أي دعم يتطلب الاطلاع على بيانات Tenant يجب أن يتم من خلال صلاحية محددة، وسبب موثق، وسجل تدقيق.

---

# القسم السادس والعشرون: نموذج الاشتراكات والإيرادات

يجب أن تكون TrackPro قابلة للبيع كخدمة SaaS.

## الباقات المقترحة

### Starter

للشركات الصغيرة.

- إدارة الشحنات.
- العملاء.
- التتبع.
- التقارير الأساسية.

### Growth

للشركات النامية.

- فروع.
- مندوبون.
- تطبيق المندوب.
- COD.
- تسويات أساسية.

### Business

للشركات المتوسطة.

- مالية.
- مخازن.
- API.
- تقارير متقدمة.
- تكاملات.

### Enterprise

للشركات الكبيرة.

- صلاحيات متقدمة.
- BI.
- SLA.
- تكاملات مخصصة.
- دعم متميز.

### Specialized

للأنشطة المتخصصة.

- Freight Forwarding.
- Fleet.
- Warehouse.
- Customs.

## حدود الاستخدام

يجب أن تدعم المنصة:

- عدد الشحنات.
- عدد المستخدمين.
- عدد الفروع.
- حجم التخزين.
- API Calls.
- عدد المندوبين.
- عدد التكاملات.
- عدد رسائل SMS.

لا تضع أسعارًا ثابتة داخل الكود.

اجعل الخطط والحدود قابلة للإدارة من Super Admin.

---

# القسم السابع والعشرون: الأمن والخصوصية

هذه المنصة تتعامل مع بيانات شخصية ومالية وتشغيلية حساسة.

يجب اتباع Secure by Design.

## 27.1 Authentication Security

- Password Hashing.
- Secure Sessions.
- HttpOnly Cookies.
- CSRF Protection حسب طريقة الطلب.
- Rate Limiting.
- Session Revocation.
- MFA.
- Email Verification.
- Secure Password Reset.

## 27.2 Data Security

- TLS.
- حماية Secrets.
- عدم تسجيل كلمات المرور.
- عدم كشف بيانات الاتصال.
- حماية ملفات العملاء.
- صلاحيات Storage.
- نسخ احتياطية آمنة.
- سياسات الاحتفاظ بالبيانات.

## 27.3 Application Security

راجع:

- OWASP Top 10.
- Broken Access Control.
- SQL Injection.
- XSS.
- CSRF.
- SSRF.
- Insecure Direct Object References.
- File Upload Security.
- Rate Limiting.
- Authentication Abuse.

استخدم Drizzle Parameterized Queries ولا تنشئ SQL غير آمن من مدخلات المستخدم.

## 27.4 Audit Logs

سجل:

- من قام بالعملية.
- نوع العملية.
- الكيان.
- معرف الكيان.
- وقت العملية.
- Tenant.
- IP عند وجود مبرر قانوني.
- القيم السابقة والجديدة عند الحاجة.

لا تسجل أسرارًا أو كلمات مرور أو بيانات دفع حساسة.

---

# القسم الثامن والعشرون: التشريعات المصرية

يجب أن تكون المنصة قابلة للامتثال للقوانين المصرية ذات الصلة.

ادرس وراعِ على الأقل:

1. قانون حماية البيانات الشخصية رقم 151 لسنة 2020 ولائحته التنفيذية.
2. قانون الضرائب والضريبة على القيمة المضافة.
3. متطلبات الفاتورة الإلكترونية والإيصال الإلكتروني.
4. قانون الجمارك رقم 207 لسنة 2020.
5. متطلبات ACI ونافذة.
6. قانون التوقيع الإلكتروني رقم 15 لسنة 2004.
7. متطلبات النقل البري والمركبات والسائقين.
8. متطلبات النقل البحري والأنشطة المرتبطة به.
9. قانون العمل واللوائح ذات الصلة.
10. التزامات التأمينات الاجتماعية.
11. متطلبات حماية المستهلك.

يجب الفصل بين دور TrackPro كمزود برنامج SaaS وبين مسؤولية شركة الشحن المرخصة عن ممارسة النشاط.

صمم النظام لدعم:

- Privacy Policy.
- Data Processing Agreement.
- Consent Management عند الحاجة.
- Data Retention.
- Data Export.
- Data Deletion Workflows وفق القانون.
- Access Logs.
- Data Breach Response.

لا تفترض أن وجود خانة أو تقرير في النظام يعني تحقق الامتثال القانوني.

لا تنشئ ادعاءات قانونية أو ضريبية غير متحققة.

أي تكامل حكومي يجب أن يعتمد على وثائق رسمية سارية ومراجعة قانونية وفنية.

---

# القسم التاسع والعشرون: الأداء والتوسع

صمم المنصة بحيث تستطيع التوسع دون إعادة كتابة النظام بالكامل.

## Performance Requirements

- Pagination على الجداول الكبيرة.
- Database Indexes.
- Efficient Joins.
- Avoid N+1 Queries.
- Server-Side Filtering.
- Caching عند الحاجة.
- Background Processing للمهام الثقيلة.
- File Streaming للملفات الكبيرة.
- Optimized Images.
- Lazy Loading.
- Code Splitting.

## Concurrency

اختبر:

- إنشاء شحنتين بنفس الرقم.
- تحصيل COD متزامن.
- تسوية الشحنة مرتين.
- تعيين شحنة لمندوبين.
- إغلاق Manifest بالتزامن.
- تعديل عقد أثناء إنشاء شحنة.

استخدم Transactions وLocks وUnique Constraints حسب الحاجة.

## Background Jobs

جهز بنية مستقبلية للمهام:

- Bulk Imports.
- PDF Generation.
- Email Notifications.
- Webhook Delivery.
- Report Generation.
- Settlement Processing.
- External API Sync.

لا تنفذ المهام الثقيلة داخل HTTP Request.

---

# القسم الثلاثون: الاختبارات وضمان الجودة

لا تعتبر الوحدة مكتملة لأنها تعرض البيانات فقط.

كل وحدة يجب أن تكون قابلة للاختبار.

## 30.1 Unit Tests

اختبر:

- Pricing Engine.
- Shipment State Transitions.
- COD Calculations.
- Settlement Calculations.
- Permissions.
- Validation.
- Accounting Rules.

## 30.2 Integration Tests

اختبر:

- Database.
- Better Auth.
- Tenant Isolation.
- API.
- Webhooks.
- Transactions.
- File Storage.

## 30.3 End-to-End Tests

اختبر رحلة مستخدم حقيقية:

1. إنشاء حساب.
2. إنشاء شركة.
3. تسجيل الدخول.
4. إنشاء فرع.
5. إضافة تاجر.
6. إنشاء عقد.
7. إنشاء شحنة.
8. طباعة البوليصة.
9. تعيين مندوب.
10. استلام الشحنة.
11. تسجيل وصولها للفرع.
12. تحويلها.
13. تعيينها للتوصيل.
14. تسجيل محاولة التسليم.
15. إتمام التسليم.
16. تحصيل COD.
17. تسليم المبلغ للخزينة.
18. إنشاء تسوية.
19. اعتماد التسوية.
20. تسجيل تحويل المبلغ للتاجر.
21. مراجعة التقارير.

## 30.4 حالات الفشل

اختبر:

- الإنترنت انقطع.
- قاعدة البيانات غير متاحة.
- Webhook فشل.
- رسالة SMS لم تصل.
- المندوب كرر العملية.
- مستخدم حاول الدخول إلى Tenant آخر.
- شحنة مفقودة.
- شحنة تالفة.
- اختلاف نقدية.
- تسوية مكررة.
- محاولة إلغاء بعد التسليم.

## 30.5 شروط الجودة

لا تعلن اكتمال المشروع إلا بعد:

- نجاح TypeScript Type Check.
- نجاح Lint.
- نجاح Build.
- نجاح اختبارات الوحدة.
- نجاح اختبارات التكامل المهمة.
- نجاح اختبارات Tenant Isolation.
- نجاح الرحلة التشغيلية الأساسية.

لا تتجاهل أخطاء TypeScript باستخدام `any` بصورة عشوائية.

لا تستخدم `@ts-ignore` لإخفاء مشكلة دون توثيق مبرر.

لا تترك TODOs حرجة دون توضيح.

---

# القسم الحادي والثلاثون: خطة التنفيذ الإلزامية

المشروع ضخم.

لا تحاول تنفيذ كل شيء دفعة واحدة.

يجب أن تعمل على مراحل واضحة.

كل مرحلة تنتج نظامًا قابلًا للتشغيل والاختبار.

## Phase 0 — Project Discovery

- فحص الملفات.
- فحص الحزم.
- فحص الإعدادات.
- فحص Git.
- التحقق من Neon.
- مراجعة المتطلبات.
- إعداد Architecture Document.

المخرجات:

- `docs/architecture.md`
- `docs/project-audit.md`
- `docs/progress.md`

## Phase 1 — Foundation

- إعداد المكتبات.
- Database Connection.
- Drizzle Schema.
- Migrations.
- Better Auth.
- Tenancy.
- Organizations.
- Memberships.
- Roles.
- Permissions.
- Base Dashboard Layout.
- Design System.

## Phase 2 — Core Operations

- Branches.
- Customers.
- Contracts.
- Pricing.
- Shipments.
- Tracking.
- Barcode.
- Shipment Events.

## Phase 3 — Logistics Operations

- Pickup.
- Sorting.
- Manifests.
- Transfers.
- Dispatch.
- Delivery.
- POD.
- Returns.
- Courier PWA.

## Phase 4 — COD & Financial Core

- Cash Collections.
- Courier Handover.
- Cashboxes.
- COD Reconciliation.
- Merchant Settlements.
- Invoices.
- Payments.
- Basic Accounting.

## Phase 5 — Merchant Experience

- Merchant Portal.
- Bulk Imports.
- API.
- Webhooks.
- Tracking Portal.
- Merchant Reports.

## Phase 6 — Business Management

- Fleet.
- Warehouse.
- HR.
- Advanced Finance.
- Advanced Reports.

## Phase 7 — Advanced Logistics

- Freight Forwarding.
- International Shipping.
- Customs.
- Container Management.
- Government Integration Readiness.

## Phase 8 — SaaS Commercialization

- Super Admin.
- Subscription Plans.
- Usage Limits.
- Billing.
- Support.
- Feature Flags.

## Phase 9 — Intelligence & Optimization

- AI.
- Route Optimization.
- Forecasting.
- Fraud Detection.
- Advanced BI.

## Phase 10 — Production Readiness

- Security Review.
- Performance.
- Backup.
- Disaster Recovery.
- Monitoring.
- CI/CD.
- Deployment Documentation.

---

# القسم الثاني والثلاثون: MVP التجاري

لا أريد تأجيل إطلاق المنتج حتى الانتهاء من جميع الوحدات.

أريد أول نسخة تجارية تغطي دورة شركة شحن داخلي وتجارة إلكترونية بالكامل.

يجب أن يحتوي MVP على:

| الوحدة | الأولوية |
|---|---|
| Multi-Tenancy | Critical |
| Authentication | Critical |
| RBAC | Critical |
| Organizations | Critical |
| Branches | Critical |
| Customers | Critical |
| Contracts | Critical |
| Pricing Engine | Critical |
| Shipments | Critical |
| Tracking | Critical |
| Barcode | Critical |
| Pickup | Critical |
| Sorting | High |
| Transfers | High |
| Delivery | Critical |
| Courier Experience | Critical |
| Returns | Critical |
| COD | Critical |
| Cashbox | Critical |
| Settlements | Critical |
| Merchant Portal | High |
| Basic Finance | High |
| Reports | High |
| API | High |
| Webhooks | Medium |
| Fleet | Later |
| Advanced Warehouse | Later |
| Freight Forwarding | Later |
| Customs | Later |
| Advanced AI | Later |

يجب أن تكون الوحدات المؤجلة قابلة للإضافة دون تغيير جذري في البنية.

---

# القسم الثالث والثلاثون: السيناريو التشغيلي الرئيسي

استخدم السيناريو التالي كمرجع أساسي لاختبار تكامل النظام.

لدينا شركة شحن افتراضية اسمها «النيل للشحن».

تحتوي على:

- 5 فروع.
- 30 مندوبًا.
- 8 سيارات.
- 100 تاجر.
- 2,000 شحنة يوميًا.

هذه أرقام اختبار افتراضية.

تقوم الشركة باستقبال طلب جديد من متجر إلكتروني عبر API.

تحدث العمليات بالترتيب التالي:

1. يصل الطلب إلى النظام.
2. يتم إنشاء Shipment.
3. يتم توليد Tracking Number.
4. يتم تحديد سعر الشحنة من عقد التاجر.
5. يتم تحديد COD.
6. يتم إنشاء Pickup Request.
7. يتم تعيين مندوب للاستلام.
8. يستلم المندوب الشحنة.
9. يمسح الباركود.
10. تسجل الشحنة في الفرع.
11. يتم فرزها.
12. يتم وضعها في Manifest.
13. تغادر إلى الفرع المستهدف.
14. يسجل الوصول.
15. تعين إلى مندوب التوصيل.
16. تخرج للتوصيل.
17. يحاول المندوب التسليم.
18. إذا نجح، يسجل إثبات التسليم.
19. يسجل مبلغ COD المحصل.
20. تظهر النقدية في عهدة المندوب.
21. يسلم المندوب النقدية للخزينة.
22. تتم مطابقة النقدية.
23. تدخل الشحنة في التسوية المؤهلة للتاجر.
24. يتم حساب مستحقات التاجر.
25. يتم اعتماد التسوية.
26. يتم تسجيل الدفع.
27. تصدر المستندات المالية المناسبة.
28. تتحدث التقارير.

يجب أن يستطيع النظام أيضًا معالجة الفشل في أي مرحلة دون فقد السجل التاريخي أو إحداث تكرار مالي.

---

# القسم الرابع والثلاثون: قواعد التعامل مع الأكواد

هذه التعليمات مهمة جدًا للـ Agent.

1. اكتب كودًا حقيقيًا قابلًا للتشغيل.
2. لا تكتفِ بإنشاء ملفات فارغة.
3. لا تنشئ صفحات Placeholder وتعتبر المهمة مكتملة.
4. لا تضع أزرارًا لا تنفذ أي شيء.
5. لا تستخدم بيانات Mock في الإنتاج.
6. استخدم Seed Data للتطوير والاختبار فقط.
7. لا تكرر Business Logic.
8. لا تضع كل الكود في ملف واحد.
9. لا تخلط Database Queries مع UI.
10. استخدم Server Components افتراضيًا.
11. استخدم Client Components عند الحاجة الفعلية للتفاعل.
12. استخدم Server Actions أو Route Handlers وفق طبيعة العملية.
13. تحقق من الصلاحيات داخل الخادم.
14. تحقق من Tenant Context في كل عملية تجارية.
15. استخدم Zod للتحقق من المدخلات.
16. استخدم Transactions للعمليات متعددة الخطوات.
17. لا تثق في قيم الحسابات القادمة من المتصفح.
18. احسب الأسعار والتحصيلات في الخادم.
19. لا تضع أسرارًا داخل Client Components.
20. لا تضع API Keys في الكود.
21. لا تكتب بيانات الاتصال في README.
22. لا تضع ملفات `.env.local` في Git.
23. لا تعدل ملفات خارج نطاق المهمة دون مبرر.
24. لا تستخدم `as any` لإسكات TypeScript.
25. لا تتجاهل الأخطاء.
26. لا تحذف بيانات الإنتاج.
27. لا تنفذ عمليات تدميرية دون موافقة.
28. لا تضع وظائف مستقبلية على أنها منجزة.
29. وثق كل قرار معماري مؤثر.
30. حافظ على توافق الملفات والوحدات.

---

# القسم الخامس والثلاثون: معايير القبول النهائي

TrackPro لا تعتبر مكتملة لمجرد أن الصفحة الرئيسية تعمل.

يجب أن يتحقق الآتي:

## Functional

- يستطيع المستخدم إنشاء شركة.
- يستطيع إنشاء الفروع.
- يستطيع إضافة الموظفين.
- يستطيع تحديد الصلاحيات.
- يستطيع إضافة التجار.
- يستطيع إنشاء العقود.
- يستطيع إعداد الأسعار.
- يستطيع إنشاء الشحنات.
- يستطيع تتبعها.
- يستطيع إدارة الاستلام.
- يستطيع إدارة التحويلات.
- يستطيع إدارة التوصيل.
- يستطيع تسجيل المرتجعات.
- يستطيع إدارة COD.
- يستطيع تسوية مستحقات التجار.
- يستطيع مراجعة التقارير.

## Security

- عزل الشركات.
- عزل الفروع.
- حماية API.
- حماية الملفات.
- حماية الجلسات.
- سجل التدقيق.
- منع التكرار المالي.
- حماية البيانات الحساسة.

## UX

- تصميم موحد.
- RTL.
- Responsive.
- بحث وتصفية.
- Pagination.
- حالات Loading.
- Empty States.
- Error Handling.
- Forms Validation.

## Engineering

- Schema منظم.
- Migrations.
- Types.
- Tests.
- Build.
- Documentation.
- Environment Configuration.

---

# القسم السادس والثلاثون: أسلوب عملك مع المشروع

أريدك أن تتعامل مع المشروع كمهندس مسؤول عن منتج تجاري طويل الأمد.

لا تبدأ في كتابة آلاف الأسطر دون تخطيط.

اتبع الدورة التالية:

**Inspect → Analyze → Design → Implement → Test → Verify → Document**

بعد كل مرحلة:

1. اشرح ما تم إنجازه.
2. اذكر الملفات التي تم إنشاؤها أو تعديلها.
3. اذكر الحزم التي تم تثبيتها.
4. اذكر أوامر قاعدة البيانات التي تم تشغيلها.
5. اذكر نتائج الاختبارات.
6. اذكر الأخطاء المتبقية.
7. اذكر ما يحتاج إلى مفاتيح أو خدمات خارجية.
8. حدث `docs/progress.md`.

لا تقل إن العملية نجحت إلا بعد التأكد من نتيجتها.

إذا لم تستطع الوصول إلى خدمة خارجية، اكتب Adapter وواجهة تكامل واضحة، ولا تدّعِ أن التكامل أصبح متصلًا.

إذا احتجت إلى Secret أو API Key، أنشئ اسم المتغير في `.env.example` واشرح كيفية توفيره دون اختراع قيمة.

إذا واجهت قرارًا غير محسوم، اختر الحل الأكثر أمانًا والأقل تعقيدًا، ووثقه. اسألني فقط عندما يكون القرار مؤثرًا ولا يمكن اتخاذه بأمان دون معلومات مني.

لا تنتظر مني الموافقة على كل ملف أو كل خطوة صغيرة.

أريد تنفيذًا مستقلًا ومنظمًا، مع عدم القيام بأي إجراء تدميري أو مكلف أو خارجي دون إذن.

---

# القسم السابع والثلاثون: تعليمات البداية الفعلية

الآن ابدأ العمل.

لكن لا تبدأ بإنشاء الواجهات أو كتابة جميع الوحدات.

أول مهمة إلزامية لك هي:

## STEP 1 — Audit Existing Project

افحص المشروع الموجود في مساحة العمل الحالية.

أريد معرفة:

- ما الموجود فعلًا؟
- ما المكتبات المثبتة؟
- ما إصداراتها؟
- كيف تم إعداد Next.js؟
- كيف تم إعداد Drizzle؟
- هل الاتصال بـ Neon يعمل؟
- هل هناك أي ملفات أو إعدادات يجب الحفاظ عليها؟
- هل هناك أخطاء حالية؟

لا تطبع أي أسرار.

## STEP 2 — Prepare Architecture

ضع التصميم المعماري الفعلي لـ TrackPro.

أنشئ:

- `docs/architecture.md`
- `docs/database.md`
- `docs/business-rules.md`
- `docs/permissions.md`
- `docs/project-audit.md`
- `docs/progress.md`

## STEP 3 — Database Foundation

صمم أول إصدار من قاعدة البيانات.

ابدأ بالجداول اللازمة لـ:

- Tenants.
- Organizations.
- Users.
- Memberships.
- Branches.
- Roles.
- Permissions.
- Customers.
- Contracts.
- Pricing.
- Shipments.
- Shipment Events.
- COD.
- Settlements.
- Audit Logs.

راجع علاقات الجداول وقيودها.

جهز Drizzle Migrations.

لا تنفذ أوامر تدميرية على قاعدة الإنتاج.

## STEP 4 — Authentication & Tenancy

نفذ Better Auth بعد التحقق من توافقه.

اربط المستخدمين بالعضويات والشركات.

نفذ حماية المسارات والصلاحيات وعزل البيانات.

## STEP 5 — Design System

أنشئ واجهة TrackPro الرسمية:

- Sidebar.
- Topbar.
- Dashboard Shell.
- Typography.
- Colors.
- Buttons.
- Inputs.
- Selects.
- Dialogs.
- Tables.
- Badges.
- Cards.
- Dropdowns.
- Pagination.
- Notifications.

اختبر RTL وLTR.

## STEP 6 — First Complete Business Workflow

نفذ دورة تشغيل فعلية من:

إنشاء تاجر → إعداد عقد → إعداد سعر → إنشاء شحنة → طباعة بوليصة → استلام → فرز → تحويل → توصيل → إثبات تسليم → تحصيل COD → تسليم النقدية → تسوية التاجر.

يجب أن تكون هذه الدورة متصلة بقاعدة البيانات.

## STEP 7 — Continue by Phases

بعد نجاح دورة التشغيل الأساسية، أكمل بقية الوحدات وفق خارطة الطريق.

---

# تعليمات ختامية غير قابلة للتفاوض

أنت لا تبني مشروعًا تجريبيًا.

أنت تبني TrackPro، منتج SaaS مؤسسي قابل للتطوير والاستثمار والبيع لشركات الشحن.

أريد جودة هندسية عالية، قاعدة بيانات صحيحة، واجهة رسمية راقية، تجربة استخدام ممتازة، وأمانًا قويًا.

لا تضحي بصحة البيانات من أجل سرعة التنفيذ.

لا تضحي بالأمان من أجل سهولة البرمجة.

لا تضحي بتجربة المستخدم من أجل كثرة الخصائص.

لا تجعل النظام معقدًا دون داعٍ.

لا تنشئ خصائص وهمية.

لا تترك العمليات المالية دون ضوابط.

لا تسمح بتسرب بيانات الشركات.

لا تجعل الشحنات مجرد CRUD؛ بل ابنِ دورة حياة تشغيلية كاملة.

لا تجعل COD مجرد رقم؛ بل ابنِ دورة تحصيل ومطابقة وتسوية مستقلة.

لا تجعل التقارير أرقامًا شكلية؛ بل اربطها ببيانات فعلية.

لا تجعل الواجهة مجرد تصميم؛ بل اجعل كل عملية قابلة للتنفيذ.

**المعيار الحقيقي لنجاحك هو أن تستطيع شركة شحن مصرية تشغيل أعمالها اليومية على TrackPro بصورة موثوقة ومنظمة، وأن تستطيع إضافة شركات جديدة دون اختلاط بياناتها، وأن تستطيع المنصة النمو إلى نظام لوجستي شامل دون الحاجة إلى إعادة بنائها من الصفر.**

ابدأ الآن بـ STEP 1: Audit Existing Project.

لا تنشئ مشروعًا جديدًا.

لا تحذف الإعدادات الحالية.

افحص، خطط، وثّق، ثم ابدأ التنفيذ.

# TRACKPRO
### Complete Logistics. Total Control.