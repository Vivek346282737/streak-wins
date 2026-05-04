import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { getPact, usePact } from "@/store/PactContext";
import { Flame } from "lucide-react";
import { useEffect } from "react";

export default function Tracking() {
  const nav = useNavigate();
  const { active } = usePact();
  const pact = getPact(active?.pactId);

  useEffect(() => {
    if (!active || !pact) nav("/home", { replace: true });
  }, [active, pact, nav]);

  if (!active || !pact) return null;

  const streak = active.checkIns.length;
  const total = pact.durationDays;
  const pct = Math.round((streak / total) * 100);
  const daysLeft = Math.max(total - streak, 0);
  const today = new Date().toISOString().slice(0, 10);
  const checkedToday = active.checkIns.includes(today);

  // Calendar for current pact period
  const start = new Date(active.startedAt);
  const cells = Array.from({ length: total }, (_, i) => {
    const d = new Date(start);
    d.setDate(start.getDate() + i);
    const iso = d.toISOString().slice(0, 10);
    return { iso, day: d.getDate(), done: active.checkIns.includes(iso), isToday: iso === today };
  });

  // Milestone banner
  let milestone: string | null = null;
  if (streak === 3) milestone = "3 days in. The hardest part is behind you. 🔥";
  else if (streak === 7) milestone = "One week strong. You're building identity. ✨";
  else if (streak === Math.floor(total / 2)) milestone = "Halfway there. Keep showing up. 🌗";

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader title={pact.title} subtitle={pact.brand} />

      <div className="glass p-6 relative overflow-hidden">
        <div className={`absolute inset-0 bg-gradient-to-br ${pact.color} opacity-25`} />
        <div className="relative">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Current streak</div>
              <div className="font-serif text-5xl mt-1 flex items-center gap-2"><Flame className="h-8 w-8 text-gold" /> {streak}<span className="text-base text-muted-foreground">/ {total}</span></div>
            </div>
            <div className="text-right">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Days left</div>
              <div className="font-serif text-3xl mt-1">{daysLeft}</div>
            </div>
          </div>

          <div className="mt-5 h-2 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full bg-gradient-gold transition-all" style={{ width: `${pct}%` }} />
          </div>
          <div className="mt-2 text-[11px] text-muted-foreground flex justify-between">
            <span>Reward · <span className="text-gold">{pact.reward}</span></span>
            <span>{pct}%</span>
          </div>
        </div>
      </div>

      {milestone && (
        <div className="mt-4 glass-soft p-4 text-sm font-serif text-gold/90">{milestone}</div>
      )}

      <div className="mt-6 glass p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg">Calendar</h3>
          <span className="text-[11px] text-muted-foreground">{total}-day period</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5">
          {cells.map((c) => (
            <div
              key={c.iso}
              className={`aspect-square rounded-lg text-[11px] grid place-items-center border ${
                c.done
                  ? "bg-gradient-gold text-gold-foreground border-transparent"
                  : c.isToday
                  ? "border-accent/60 text-foreground"
                  : "border-white/5 text-muted-foreground bg-white/[0.02]"
              }`}
            >
              {c.day}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {checkedToday ? (
          <div className="col-span-2 rounded-full bg-white/[0.04] border border-white/10 py-3.5 text-center text-sm">Checked in today ✓</div>
        ) : (
          <Link to="/check-in" className="col-span-2 rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 text-center">Check in</Link>
        )}
        <Link to="/failure" className="rounded-full glass-soft py-3 text-center text-sm">Missed a day?</Link>
        <button
          onClick={() => streak >= total ? nav("/completion") : nav("/completion")}
          className="rounded-full glass-soft py-3 text-center text-sm"
        >
          Preview reward
        </button>
      </div>
    </div>
  );
}
