import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function Splash() {
  return (
    <div className="pact-page min-h-screen flex flex-col items-center justify-between text-center pt-24">
      <div className="flex-1 flex flex-col items-center justify-center animate-fade-up">
        <div className="relative mb-8">
          <div className="absolute inset-0 -m-6 rounded-full bg-accent/10 blur-2xl" />
          <div className="relative h-24 w-24 rounded-3xl bg-gradient-green border border-white/10 grid place-items-center shadow-glow">
            <span className="font-serif text-3xl gold-text">P</span>
          </div>
        </div>
        <h1 className="font-serif text-5xl tracking-tight">PACT</h1>
        <p className="mt-4 max-w-[280px] text-muted-foreground font-serif italic text-lg leading-snug">
          The pact you keep<br/>with yourself.
        </p>
        <div className="chip mt-8"><Sparkles className="h-3 w-3 text-gold" /> Real habits. Real rewards.</div>
      </div>

      <div className="w-full space-y-3 pb-6 animate-fade-up">
        <Link
          to="/auth"
          className="block w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 text-center shadow-glow active:scale-[0.98] transition"
        >
          Begin your pact
        </Link>
        <p className="text-[11px] text-muted-foreground">By continuing you agree to our Terms & Privacy.</p>
      </div>
    </div>
  );
}
