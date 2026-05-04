import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { getPact } from "@/store/PactContext";
import { usePact } from "@/store/PactContext";
import { Clock, Gift, ShieldCheck, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function PactDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const pact = getPact(id);
  const { startPact, active } = usePact();

  if (!pact) return <div className="pact-page"><PageHeader /> <p>Pact not found.</p></div>;

  const begin = () => {
    if (active && active.status === "active") {
      toast.error("You already have an active pact.");
      return;
    }
    startPact(pact.id);
    toast.success("Pact started. Make it count.");
    nav("/tracking");
  };

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader />
      <div className={`-mx-6 mb-6 h-56 bg-gradient-to-br ${pact.color} grid place-items-center text-7xl border-y border-white/5 relative overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-hero opacity-60" />
        <span className="relative drop-shadow-2xl">{pact.emoji}</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="chip">{pact.category}</span>
        <span className="text-xs text-muted-foreground">by {pact.brand}</span>
      </div>
      <h1 className="font-serif text-3xl mt-2 leading-tight">{pact.title}</h1>
      <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{pact.description}</p>

      <div className="grid grid-cols-2 gap-3 mt-6">
        <Info icon={<Clock className="h-4 w-4 text-gold" />} label="Duration" value={`${pact.durationDays} days`} />
        <Info icon={<Gift className="h-4 w-4 text-gold" />} label="Reward" value={pact.reward} />
        <Info icon={<ShieldCheck className="h-4 w-4 text-gold" />} label="Verification" value="GPS / Photo" />
        <Info icon={<Sparkles className="h-4 w-4 text-gold" />} label="Reset rule" value="Miss a day = reset" />
      </div>

      <button
        onClick={begin}
        className="mt-8 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 active:scale-[0.98] transition shadow-glow"
      >
        Start this pact
      </button>
      <p className="text-[11px] text-center text-muted-foreground mt-3">Free to join · Reward delivered on completion</p>
    </div>
  );
}

function Info({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="glass p-4">
      <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-muted-foreground">{icon}{label}</div>
      <div className="font-serif text-base mt-1">{value}</div>
    </div>
  );
}
