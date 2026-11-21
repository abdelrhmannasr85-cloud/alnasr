"use client";

import { FormEvent, useState } from "react";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isConfigured = Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const supabase = createClient();
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) throw authError;
      window.location.assign("/");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "تعذر تسجيل الدخول. تحقق من بياناتك وحاول مجددًا.");
      setBusy(false);
    }
  }

  return (
    <main className="login-page">
      <section className="login-card">
        <div className="login-brand">النصر<span>مكتب المحاماة</span></div>
        <p className="eyebrow">بوابة الموظفين</p>
        <h1>تسجيل الدخول</h1>
        <p className="login-description">أدخل بيانات حساب المكتب للوصول إلى لوحة القيادة.</p>
        {!isConfigured && (
          <div className="login-message" role="status">
            لم يتم إعداد Supabase بعد. أضف متغيرات البيئة الموضحة في ملف <code>.env.example</code> ثم أعد تشغيل التطبيق.
          </div>
        )}
        {error && <div className="login-error" role="alert">{error}</div>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">البريد الإلكتروني</label>
          <input id="email" type="email" autoComplete="username" required value={email} onChange={(event) => setEmail(event.target.value)} />
          <label htmlFor="password">كلمة المرور</label>
          <input id="password" type="password" autoComplete="current-password" required value={password} onChange={(event) => setPassword(event.target.value)} />
          <button type="submit" disabled={!isConfigured || busy}>
            {busy ? "جارٍ التحقق…" : "دخول آمن"}
          </button>
        </form>
        <p className="login-footnote">لا تملك حسابًا؟ اطلب من مدير النظام إنشاءه عبر لوحة Supabase.</p>
      </section>
    </main>
  );
}
