import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { usePact } from "@/store/PactContext";

export default function OtpScreen() {
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { phone?: string } };
  const { setUser } = usePact();
  const [digits, setDigits] = useState(["", "", "", ""]);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => { refs.current[0]?.focus(); }, []);

  const onChange = (i: number, v: string) => {
    const x = v.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = x; setDigits(next);
    if (x && i < 3) refs.current[i + 1]?.focus();
  };

  const code = digits.join("");
  const submit = () => {
    setUser({ name: "Friend", phone: state?.phone });
    nav("/onboarding/identity");
  };

  return (
    <div className="pact-page">
      <PageHeader />
      <div className="animate-fade-up">
        <h1 className="font-serif text-3xl">Verify</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Code sent to <span className="text-foreground">+91 {state?.phone ?? "•••••"}</span>
        </p>

        <div className="mt-10 grid grid-cols-4 gap-3">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              inputMode="numeric"
              className="aspect-square text-center text-2xl font-serif glass bg-transparent rounded-2xl outline-none focus:ring-2 focus:ring-accent/60"
            />
          ))}
        </div>

        <button
          disabled={code.length !== 4}
          onClick={submit}
          className="mt-8 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 active:scale-[0.98] transition"
        >
          Verify & continue
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">Resend code in 0:24</p>
      </div>
    </div>
  );
}
