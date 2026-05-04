import { Pact } from "@/data/pacts";
import { Link } from "react-router-dom";
import { Clock, Gift } from "lucide-react";

export default function PactCard({ pact }: { pact: Pact }) {
  return (
    <Link
      to={`/pact/${pact.id}`}
      className="group glass p-5 block transition-transform hover:-translate-y-0.5"
    >
      <div className={`h-24 -mx-1 -mt-1 mb-4 rounded-2xl bg-gradient-to-br ${pact.color} grid place-items-center text-4xl border border-white/5`}>
        <span>{pact.emoji}</span>
      </div>
      <div className="flex items-center gap-2 mb-1">
        <span className="chip">{pact.category}</span>
        <span className="text-[11px] text-muted-foreground">{pact.brand}</span>
      </div>
      <h3 className="font-serif text-lg leading-tight">{pact.title}</h3>
      <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{pact.durationDays} days</span>
        <span className="inline-flex items-center gap-1 text-gold"><Gift className="h-3.5 w-3.5" />{pact.reward.split(" ").slice(0,2).join(" ")}</span>
      </div>
    </Link>
  );
}
