import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useAuth } from "@/store/AuthContext";
import { toast } from "sonner";
import { FirebaseError } from "firebase/app";

type Mode = "phone" | "email";

export default function Auth() {
  const nav = useNavigate();
  const { signInEmail, signUpEmail, signInGoogle, sendPhoneOtp } = useAuth();
  const [mode, setMode] = useState<Mode>("phone");
  const [loading, setLoading] = useState<string | null>(null);

  // Phone
  const [country, setCountry] = useState("+91");
  const [phone, setPhone] = useState("");

  // Email
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleErr = (e: unknown, fallback = "Something went wrong") => {
    const msg = e instanceof FirebaseError ? e.message.replace("Firebase: ", "") : fallback;
    toast.error(msg);
  };

  const sendOtp = async () => {
    if (phone.length < 6) return;
    setLoading("phone");
    try {
      const full = `${country}${phone}`;
      const confirmation = await sendPhoneOtp(full, "recaptcha-container");
      // stash confirmation on window for OtpScreen
      // @ts-expect-error
      window.__phoneConfirmation = confirmation;
      nav("/auth/otp", { state: { phone: full } });
    } catch (e) { handleErr(e, "Failed to send OTP"); }
    finally { setLoading(null); }
  };

  const submitEmail = async () => {
    if (!email || !password) return;
    setLoading("email");
    try {
      if (isSignup) await signUpEmail(email, password, name || undefined);
      else await signInEmail(email, password);
      toast.success(isSignup ? "Account created" : "Welcome back");
      nav("/home");
    } catch (e) { handleErr(e); }
    finally { setLoading(null); }
  };

  const google = async () => {
    setLoading("google");
    try {
      await signInGoogle();
      toast.success("Signed in");
      nav("/home");
    } catch (e) { handleErr(e, "Google sign-in failed"); }
    finally { setLoading(null); }
  };

  return (
    <div className="pact-page">
      <PageHeader />
      <div className="animate-fade-up">
        <h1 className="font-serif text-3xl">Welcome</h1>
        <p className="text-muted-foreground mt-2 text-sm">Sign in to start your first pact.</p>

        <div className="mt-6 grid grid-cols-2 gap-1.5 glass-soft p-1 rounded-full text-sm">
          {(["phone", "email"] as Mode[]).map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`py-2 rounded-full transition ${mode === m ? "bg-gradient-gold text-gold-foreground" : "text-muted-foreground"}`}
            >
              {m === "phone" ? "Phone" : "Email"}
            </button>
          ))}
        </div>

        {mode === "phone" ? (
          <>
            <div className="mt-6 glass p-1.5 flex items-center gap-2">
              <input
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-16 bg-transparent outline-none px-3 py-3.5 text-sm text-muted-foreground border-r border-white/10"
              />
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 15))}
                inputMode="numeric"
                placeholder="Phone number"
                className="flex-1 bg-transparent outline-none px-2 py-3.5 text-base placeholder:text-muted-foreground/60"
              />
            </div>
            <button
              disabled={phone.length < 6 || loading === "phone"}
              onClick={sendOtp}
              className="mt-5 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 transition active:scale-[0.98] inline-flex items-center justify-center gap-2"
            >
              {loading === "phone" && <Loader2 className="h-4 w-4 animate-spin" />} Send OTP
            </button>
          </>
        ) : (
          <>
            {isSignup && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="mt-6 w-full glass px-4 py-3.5 bg-transparent outline-none rounded-2xl text-base placeholder:text-muted-foreground/60"
              />
            )}
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className={`${isSignup ? "mt-3" : "mt-6"} w-full glass px-4 py-3.5 bg-transparent outline-none rounded-2xl text-base placeholder:text-muted-foreground/60`}
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="mt-3 w-full glass px-4 py-3.5 bg-transparent outline-none rounded-2xl text-base placeholder:text-muted-foreground/60"
            />
            <button
              disabled={!email || !password || loading === "email"}
              onClick={submitEmail}
              className="mt-5 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 transition active:scale-[0.98] inline-flex items-center justify-center gap-2"
            >
              {loading === "email" && <Loader2 className="h-4 w-4 animate-spin" />}
              {isSignup ? "Create account" : "Sign in"}
            </button>
            <button
              onClick={() => setIsSignup((v) => !v)}
              className="mt-3 w-full text-xs text-muted-foreground hover:text-foreground transition"
            >
              {isSignup ? "Already have an account? Sign in" : "New here? Create an account"}
            </button>
          </>
        )}

        <div className="my-6 flex items-center gap-3 text-[11px] text-muted-foreground">
          <div className="hairline flex-1" /> OR <div className="hairline flex-1" />
        </div>

        <button
          onClick={google}
          disabled={loading === "google"}
          className="w-full rounded-full glass-soft py-4 font-medium hover:bg-white/[0.06] transition flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {loading === "google" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#EA4335" d="M12 11v3h5.3c-.2 1.4-1.7 4-5.3 4-3.2 0-5.8-2.7-5.8-6s2.6-6 5.8-6c1.8 0 3 .8 3.7 1.4l2.5-2.4C16.5 3.7 14.5 3 12 3 6.9 3 3 6.9 3 12s3.9 9 9 9c5.2 0 8.6-3.7 8.6-8.8 0-.6-.1-1-.2-1.4H12z"/></svg>
          )}
          Continue with Google
        </button>

        <div id="recaptcha-container" />
      </div>
    </div>
  );
}
