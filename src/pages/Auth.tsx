import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";

export default function Auth() {
  const nav = useNavigate();
  const [phone, setPhone] = useState("");

  return (
    <div className="pact-page">
      <PageHeader />
      <div className="animate-fade-up">
        <h1 className="font-serif text-3xl">Welcome</h1>
        <p className="text-muted-foreground mt-2 text-sm">Sign in to start your first pact.</p>

        <div className="mt-8 glass p-1.5 flex items-center gap-2">
          <div className="px-4 py-3.5 text-sm text-muted-foreground border-r border-white/10">+91</div>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            inputMode="numeric"
            placeholder="Phone number"
            className="flex-1 bg-transparent outline-none px-2 py-3.5 text-base placeholder:text-muted-foreground/60"
          />
        </div>

        <button
          disabled={phone.length !== 10}
          onClick={() => nav("/auth/otp", { state: { phone } })}
          className="mt-5 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 transition active:scale-[0.98]"
        >
          Send OTP
        </button>

        <div className="my-8 flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="hairline flex-1" /> OR <div className="hairline flex-1" />
        </div>

        <button
          onClick={() => nav("/onboarding/identity")}
          className="w-full rounded-full glass-soft py-4 font-medium hover:bg-white/[0.06] transition flex items-center justify-center gap-3"
        >
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11v3h5.3c-.2 1.4-1.7 4-5.3 4-3.2 0-5.8-2.7-5.8-6s2.6-6 5.8-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.5 3.7 14.5 3 12 3 6.9 3 3 6.9 3 12s3.9 9 9 9c5.2 0 8.6-3.7 8.6-8.8 0-.6-.1-1-.2-1.4H12z"/></svg>
          Continue with Google
        </button>
      </div>
    </div>
  );
}
