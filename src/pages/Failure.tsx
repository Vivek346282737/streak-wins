import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { usePact, getPact } from "@/store/PactContext";
import { AlertTriangle } from "lucide-react";

export default function Failure() {
  const nav = useNavigate();
  const { active, resetStreak, abandonPact } = usePact();
  const pact = getPact(active?.pactId);
  const lost = active?.checkIns.length ?? 0;

  return (
    <div className="pact-page animate-fade-up flex flex-col min-h-screen">
      <PageHeader title="Streak broken" />
      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="h-20 w-20 grid place-items-center rounded-full bg-destructive/15 border border-destructive/30 mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="font-serif text-3xl">{lost} days gone</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-[280px]">
          You missed a day on <span className="text-foreground">{pact?.title}</span>. Your streak resets — but the pact isn't over unless you say so.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 w-full max-w-xs text-left">
          <div className="glass p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Lost streak</div>
            <div className="font-serif text-2xl mt-1">{lost}d</div>
          </div>
          <div className="glass p-4">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Reward at risk</div>
            <div className="font-serif text-base mt-1 text-gold">{pact?.reward}</div>
          </div>
        </div>
      </div>

      <div className="space-y-3 pb-6">
        <button
          onClick={() => { resetStreak(); nav("/tracking"); }}
          className="w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4"
        >
          Restart & keep my pact
        </button>
        <button
          onClick={() => { abandonPact(); nav("/home"); }}
          className="w-full rounded-full glass-soft py-4 font-medium text-destructive/90"
        >
          Abandon pact
        </button>
      </div>
    </div>
  );
}
