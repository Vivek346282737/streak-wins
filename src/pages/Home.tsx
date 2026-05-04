import { Link } from "react-router-dom";
import { usePact, getPact } from "@/store/PactContext";
import { PACTS } from "@/data/pacts";
import PactCard from "@/components/PactCard";
import { Flame, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Home() {
  const { user, active } = usePact();
  const pact = getPact(active?.pactId);
  const today = new Date().toISOString().slice(0, 10);
  const checkedToday = active?.checkIns.includes(today);
  const streak = active?.checkIns.length ?? 0;
  const daysLeft = pact ? Math.max(pact.durationDays - streak, 0) : 0;

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 17) return "Good afternoon";
    return "Good evening";
  })();

  return (
    <div className="pact-page animate-fade-up">
      <header className="flex items-center justify-between mb-8">
        <div>
          <p className="text-xs text-muted-foreground">{greeting},</p>
          <h1 className="font-serif text-2xl">{user?.name ?? "Friend"}</h1>
        </div>
        <Link to="/profile" className="h-11 w-11 rounded-full bg-gradient-green border border-white/10 grid place-items-center font-serif text-gold">
          {(user?.name ?? "F")[0]}
        </Link>
      </header>

      {!active || active.status !== "active" ? (
        <section className="glass p-8 text-center">
          <div className="text-5xl mb-3">🌱</div>
          <h2 className="font-serif text-2xl">No active pact</h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-[260px] mx-auto">
            Make a commitment today. Earn real rewards by keeping it.
          </p>
          <Link to="/browse" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-gold text-gold-foreground font-medium px-6 py-3">
            Browse pacts <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      ) : (
        <Link to="/tracking" className="block glass p-6 relative overflow-hidden">
          <div className={`absolute inset-0 bg-gradient-to-br ${pact?.color} opacity-30 pointer-events-none`} />
          <div className="relative">
            <div className="flex items-center justify-between">
              <span className="chip">{pact?.category}</span>
              <span className="text-xs text-muted-foreground">{pact?.brand}</span>
            </div>
            <h2 className="font-serif text-2xl mt-3">{pact?.title}</h2>
            <p className="text-xs text-muted-foreground mt-1">Reward · <span className="text-gold">{pact?.reward}</span></p>

            <div className="mt-6 grid grid-cols-3 gap-3 text-center">
              <Stat label="Streak" value={`${streak}d`} icon={<Flame className="h-3.5 w-3.5 text-gold" />} />
              <Stat label="Days left" value={`${daysLeft}`} />
              <Stat label="Progress" value={`${Math.round((streak / (pact?.durationDays || 1)) * 100)}%`} />
            </div>

            <div className="mt-6">
              {checkedToday ? (
                <div className="rounded-full bg-white/[0.04] border border-white/10 py-3.5 text-center text-sm text-foreground/80 flex items-center justify-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-gold" /> Checked in today
                </div>
              ) : (
                <Link to="/check-in" className="block w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 text-center active:scale-[0.98] transition">
                  Check in now
                </Link>
              )}
            </div>
          </div>
        </Link>
      )}

      <section className="mt-10">
        <div className="flex items-end justify-between mb-4">
          <h3 className="font-serif text-xl">Discover</h3>
          <Link to="/browse" className="text-xs text-gold">See all</Link>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {PACTS.slice(0, 4).map((p) => <PactCard key={p.id} pact={p} />)}
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/5 py-3">
      <div className="font-serif text-xl flex items-center justify-center gap-1">{icon}{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{label}</div>
    </div>
  );
}
