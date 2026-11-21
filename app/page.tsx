"use client";

import { useMemo, useState } from "react";

export default function DashboardPage() {
  const [debt, setDebt] = useState(0);
  const [disputed, setDisputed] = useState(0);

  const net = useMemo(() => {
    const result = Number(debt) - Number(disputed);
    return Number.isFinite(result) ? Math.max(0, result) : 0;
  }, [debt, disputed]);

  const stats = [
    ["العملاء النشطون", "148", "+12%"],
    ["القضايا المفتوحة", "63", "+8%"],
    ["نسبة النجاح", "78%", "+5%"],
    ["المبالغ المستردة", "2.4م د.إ", "شهرية"],
  ];

  return (
    <main className="dashboard">
      <aside className="sidebar">
        <div className="brand">النصر<span>مكتب المحاماة</span></div>
        <nav>
          <a className="active">لوحة القيادة</a>
          <a>العملاء</a>
          <a>القضايا والملفات</a>
          <a>البنوك الإماراتية</a>
          <a>النماذج والإيميلات</a>
          <a>الإجراءات واللائحات</a>
          <a>الموظفون والصلاحيات</a>
          <a>المحاسبة والرسوم</a>
        </nav>
        <div className="admin">المستشار عبد الرحمن نصر<span>مدير المكتب / مدير النظام</span></div>
      </aside>

      <section className="content">
        <header>
          <div>
            <p className="eyebrow">التشغيل اليومي</p>
            <h1>لوحة القيادة</h1>
          </div>
          <button>+ فتح ملف عميل</button>
        </header>

        <div className="notice">
          تنبيه: البيانات المعروضة نموذجية وليست معلومات بنك أو حكم قانوني. يجب اعتماد الإجراءات من جهة قانونية مرخصة ومراجعة المصادر الرسمية.
        </div>

        <section className="stats">
          {stats.map(([label, value, change]) => (
            <article key={label}>
              <span>{label}</span>
              <strong>{value}</strong>
              <small>{change}</small>
            </article>
          ))}
        </section>

        <section className="grid">
          <article className="panel">
            <div className="panel-title"><h2>حالة القضايا</h2><span>التقارير الشهرية</span></div>
            <div className="pipeline">
              {[["استقبال", 148], ["مراجعة", 89], ["اعتراض", 63], ["تسوية", 41], ["مغلق", 204]].map(([name, count]) => (
                <div key={name}><span>{name}</span><strong>{count}</strong></div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="panel-title"><h2>حاسبة المديونية</h2><span>معادلة صافي الحقيقة</span></div>
            <label>إجمالي المديونية
              <input type="number" min="0" value={debt} onChange={(e) => setDebt(e.target.value)} />
            </label>
            <label>المبلغ المتنازع عليه
              <input type="number" min="0" value={disputed} onChange={(e) => setDisputed(e.target.value)} />
            </label>
            <div className="result"><span>صافي الحقيقة</span><strong>{net.toLocaleString("en-US")} د.إ</strong></div>
          </article>

          <article className="panel gamification">
            <div className="panel-title"><h2>نظام النقاط والألعاب</h2><span>المستوى الحالي: فضي</span></div>
            <div className="level"><strong>1,840</strong><span>نقطة</span></div>
            <div className="progress"><i /></div>
            <div className="ranks"><span>برونزي</span><span>فضي</span><span>ذهبي</span><span>مستشار مساعد</span></div>
          </article>

          <article className="panel">
            <div className="panel-title"><h2>قائمة مهام اليوم</h2><span>تحديث مباشر</span></div>
            <ul className="tasks">
              <li><span>مكالمة أولية مع عميل جديد</span><b>08:30</b></li>
              <li><span>مراجعة اعتراض داخلي</span><b>11:00</b></li>
              <li><span>تحديث متابعين الإغلاق</span><b>14:30</b></li>
              <li><span>اعتماد تقرير المحاسب</span><b>16:00</b></li>
            </ul>
          </article>
        </section>
      </section>
    </main>
  );
}
