import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { CATEGORIES } from "@/data/pacts";
import { usePact } from "@/store/PactContext";

export default function Categories() {
  const nav = useNavigate();
  const { setCategories } = usePact();
  const [sel, setSel] = useState<string[]>([]);

  const toggle = (c: string) =>
    setSel((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));

  return (
    <div className="pact-page">
      <PageHeader />
      <div className="animate-fade-up">
        <p className="text-xs uppercase tracking-widest text-gold/80">Step 2 of 3</p>
        <h1 className="font-serif text-3xl mt-2 leading-tight">Pick your areas<br/>of growth.</h1>
        <p className="text-sm text-muted-foreground mt-2">Choose at least one.</p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          {CATEGORIES.map((c) => {
            const active = sel.includes(c);
            return (
              <button
                key={c}
                onClick={() => toggle(c)}
                className={`aspect-[4/3] rounded-3xl border p-4 text-left flex flex-col justify-end transition ${active ? "bg-gradient-green border-accent/60 shadow-glow" : "border-white/5 bg-white/[0.03] hover:bg-white/[0.06]"}`}
              >
                <div className="text-2xl mb-2">{emojiFor(c)}</div>
                <div className="font-serif text-base">{c}</div>
              </button>
            );
          })}
        </div>

        <button
          disabled={sel.length === 0}
          onClick={() => { setCategories(sel); nav("/onboarding/notifications"); }}
          className="mt-10 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 active:scale-[0.98] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function emojiFor(c: string) {
  return ({ Fitness: "💪", Mindfulness: "🧘", Learning: "📚", Morning: "🌅", Health: "🥗", "Deep Work": "🎯" } as Record<string, string>)[c] ?? "✨";
}
