import { useNavigate } from "react-router-dom";
import { usePact, getPact } from "@/store/PactContext";
import { Sparkles, Trophy } from "lucide-react";

export default function Completion() {
  const nav = useNavigate();
  const { active, abandonPact } = usePact();
  const pact = getPact(active?.pactId);

  const claim = () => {
    abandonPact();
    nav("/wallet");
  };

  return (
    <div className="pact-page animate-fade-up flex flex-col min-h-screen text-center">
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="relative mb-6">
          <div className="absolute inset-0 -m-10 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative h-28 w-28 rounded-full bg-gradient-gold grid place-items-center shadow-glow">
            <Trophy className="h-12 w-12 text-gold-foreground" />
          </div>
        </div>
        <div className="chip"><Sparkles className="h-3 w-3 text-gold" /> Pact completed</div>
        <h1 className="font-serif text-4xl mt-4 leading-tight">You kept<br/>your word.</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-[280px]">
          {pact?.durationDays} days of <span className="text-foreground">{pact?.title}</span>. Your reward is unlocked.
        </p>

        <div className="mt-8 glass p-6 w-full max-w-sm text-left">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground">Reward unlocked</div>
          <div className="font-serif text-2xl mt-1 gold-text">{pact?.reward}</div>
          <div className="text-xs text-muted-foreground mt-2">Powered by {pact?.brand}</div>
        </div>
      </div>

      <div className="space-y-3 pb-6">
        <button onClick={claim} className="w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 shadow-glow">
          Claim reward
        </button>
        <button onClick={() => nav("/browse")} className="w-full rounded-full glass-soft py-4 font-medium">
          Start a new pact
        </button>
      </div>
    </div>
  );
}
