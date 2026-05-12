import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";
import type { ConfirmationResult } from "firebase/auth";

export default function OtpScreen() {
  const nav = useNavigate();
  const { state } = useLocation() as { state?: { phone?: string } };
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const refs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    refs.current[0]?.focus();
    // @ts-expect-error
    if (!window.__phoneConfirmation) {
      toast.error("OTP session expired. Please try again.");
      nav("/auth", { replace: true });
    }
  }, [nav]);

  const onChange = (i: number, v: string) => {
    const x = v.replace(/\D/g, "").slice(-1);
    const next = [...digits]; next[i] = x; setDigits(next);
    if (x && i < 5) refs.current[i + 1]?.focus();
  };

  const code = digits.join("");
  const submit = async () => {
    if (code.length !== 6) return;
    setLoading(true);
    try {
      // @ts-expect-error
      const confirmation = window.__phoneConfirmation as ConfirmationResult | undefined;
      if (!confirmation) throw new Error("OTP session expired");
      await confirmation.confirm(code);
      // @ts-expect-error
      window.__phoneConfirmation = undefined;
      toast.success("Verified");
      nav("/home");
    } catch (e) {
      const msg = e instanceof FirebaseError ? e.message.replace("Firebase: ", "") : "Invalid code";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pact-page">
      <PageHeader />
      <div className="animate-fade-up">
        <h1 className="font-serif text-3xl">Verify</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Code sent to <span className="text-foreground">{state?.phone ?? "your phone"}</span>
        </p>

        <div className="mt-10 grid grid-cols-6 gap-2">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => onChange(i, e.target.value)}
              inputMode="numeric"
              className="aspect-square text-center text-xl font-serif glass bg-transparent rounded-2xl outline-none focus:ring-2 focus:ring-accent/60"
            />
          ))}
        </div>

        <button
          disabled={code.length !== 6 || loading}
          onClick={submit}
          className="mt-8 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 active:scale-[0.98] transition inline-flex items-center justify-center gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />} Verify & continue
        </button>
      </div>
    </div>
  );
}
