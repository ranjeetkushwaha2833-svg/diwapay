 "use client";

import { FormEvent, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { getSupabase } from "@/lib/supabase";

type Mode = "login" | "register" | "reset";

export default function Home() {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agree, setAgree] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [configError, setConfigError] = useState(false);

  useEffect(() => {
    try {
      const supabase = getSupabase();
      supabase.auth.getSession().then(({ data }) => setSession(data.session));
      const { data: listener } = supabase.auth.onAuthStateChange((_event, current) => setSession(current));
      return () => listener.subscription.unsubscribe();
    } catch {
      setConfigError(true);
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");
    setBusy(true);
    try {
      const supabase = getSupabase();
      if (mode === "register") {
        if (!agree) {
          setMessage("आगे बढ़ने के लिए Privacy Agreement स्वीकार करें।");
          return;
        }
        const { data, error } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { emailRedirectTo: `${window.location.origin}/` }
        });
        if (error) throw error;
        if (data.session) setSession(data.session);
        setMessage("रजिस्ट्रेशन अनुरोध सफल। यदि ईमेल पुष्टि चालू है, तो अपना ईमेल खोलकर पुष्टि करें।");
      } else if (mode === "login") {
        const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (error) throw error;
        setSession(data.session);
        setMessage("लॉगिन सफल।");
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: `${window.location.origin}/`
        });
        if (error) throw error;
        setMessage("यदि इस ईमेल पर अकाउंट मौजूद है, तो पासवर्ड रीसेट करने के निर्देश भेजे जाएँगे।");
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "कुछ गलत हुआ। कृपया फिर कोशिश करें।");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    setMessage("");
    try {
      const { error } = await getSupabase().auth.signOut();
      if (error) throw error;
      setSession(null);
      setPassword("");
      setMessage("आप सुरक्षित रूप से लॉगआउट हो गए हैं।");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "लॉगआउट नहीं हो पाया।");
    }
  }

  const title = mode === "register" ? "Create Account" : mode === "reset" ? "Reset Password" : "Secure Access";

  return (
    <main className="page-shell">
      <section className="app-card">
        <header className="brand-panel">
          <div className="watermark" aria-hidden="true">dp　 dp　 dp　 dp　 dp</div>
          <div className="brand-mark" aria-label="DiwaPAY logo"><span>d</span><span>p</span></div>
          <div className="brand-name">DiwaPAY</div>
          <div className="brand-caption">SECURE ACCOUNT ACCESS</div>
        </header>

        <div className="content">
          {session ? (
            <section className="signed-in">
              <div className="success-icon">✓</div>
              <h1>आपका अकाउंट</h1>
              <p className="muted">आप सुरक्षित रूप से साइन इन हैं।</p>
              <div className="user-box">
                <span className="small-label">लॉगिन ईमेल</span>
                <strong>{session.user.email}</strong>
                <span className="small-label">यूज़र ID</span>
                <code>{session.user.id}</code>
              </div>
              <button className="primary-button" onClick={signOut}>Logout</button>
              <p className="fine-print">यह शुरुआती अकाउंट डेमो है। अभी कोई वास्तविक भुगतान सुविधा सक्रिय नहीं है।</p>
            </section>
          ) : (
            <>
              <div className="heading-row">
                <div>
                  <p className="eyebrow">WELCOME TO DIWAPAY</p>
                  <h1>{title}</h1>
                  <p className="muted">{mode === "register" ? "अपना नया अकाउंट बनाएँ" : mode === "reset" ? "पासवर्ड रीसेट लिंक पाने के लिए ईमेल दर्ज करें" : "अपने अकाउंट में सुरक्षित रूप से प्रवेश करें"}</p>
                </div>
                <div className="secure-pill"><span /> Secure</div>
              </div>

              <form onSubmit={handleSubmit} className="auth-form">
                <label htmlFor="email">ईमेल पता</label>
                <input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />

                {mode !== "reset" && <>
                  <label htmlFor="password">पासवर्ड</label>
                  <input id="password" type="password" autoComplete={mode === "register" ? "new-password" : "current-password"} placeholder={mode === "register" ? "कम-से-कम 8 अक्षर रखें" : "अपना पासवर्ड दर्ज करें"} value={password} onChange={(e) => setPassword(e.target.value)} minLength={mode === "register" ? 8 : 1} required />
                </>}

                {mode === "register" && (
                  <label className="agreement">
                    <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} />
                    <span>मैं <a href="#privacy" onClick={(e) => { e.preventDefault(); setMessage("Privacy Policy: ईमेल का उपयोग केवल अकाउंट और प्रमाणीकरण के लिए होगा। लॉन्च से पहले अपनी वास्तविक गोपनीयता नीति जोड़ें।"); }}>Privacy Agreement</a> स्वीकार करता/करती हूँ।</span>
                  </label>
                )}

                {message && <div className="notice" role="status">{message}</div>}
                {configError && <div className="notice warning">Supabase अभी कॉन्फ़िगर नहीं है। README में दिए गए सेटअप चरण पूरे करें।</div>}

                <button className="primary-button" type="submit" disabled={busy || configError}>
                  {busy ? "कृपया प्रतीक्षा करें…" : mode === "register" ? "Create Account" : mode === "reset" ? "Send Reset Link" : "Login"}
                </button>
              </form>

              <div className="link-row">
                {mode === "login" ? <>
                  <button className="text-button" onClick={() => { setMode("register"); setMessage(""); }}>Register</button>
                  <button className="text-button" onClick={() => { setMode("reset"); setMessage(""); }}>Forgot Password?</button>
                </> : <button className="text-button centered" onClick={() => { setMode("login"); setMessage(""); }}>← वापस Login पर जाएँ</button>}
              </div>
            </>
          )}
          <div className="trust-note"><span className="lock">⌑</span> Your account. Your privacy. <span>v1.0.0</span></div>
        </div>
      </section>
      <footer className="page-footer">DiwaPAY • Independent demo project</footer>
    </main>
  );
}
