import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { usePact } from "@/store/PactContext";
import { useState } from "react";
import { Dumbbell, BookOpen, Brain } from "lucide-react";

const options = [
  { id: "exercise", label: "An exercise person", desc: "Move your body daily.", Icon: Dumbbell },
  { id: "reader", label: "A reader", desc: "Read every day.", Icon: BookOpen },
  { id: "disciplined", label: "A disciplined person", desc: "Master your routine.", Icon: Brain },
];

export default function Identity() {
  const nav = useNavigate();
  const { setIdentity } = usePact();
  const [sel, setSel] = useState<string>();

  return (
    <div className="pact-page">
      <PageHeader back={false} />
      <div className="animate-fade-up">
        <p className="text-xs uppercase tracking-widest text-gold/80">Step 1 of 3</p>
        <h1 className="font-serif text-3xl mt-2 leading-tight">Who do you<br/>want to be?</h1>

        <div className="mt-8 space-y-3">
          {options.map(({ id, label, desc, Icon }) => (
            <button
              key={id}
              onClick={() => setSel(id)}
              className={`w-full text-left glass p-5 flex items-center gap-4 transition ${sel === id ? "ring-1 ring-accent/70 shadow-glow" : "hover:bg-white/[0.04]"}`}
            >
              <div className="h-12 w-12 grid place-items-center rounded-2xl bg-gradient-green border border-white/10">
                <Icon className="h-5 w-5 text-gold" />
              </div>
              <div className="flex-1">
                <div className="font-serif text-lg leading-tight">{label}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{desc}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          disabled={!sel}
          onClick={() => { setIdentity(sel!); nav("/onboarding/categories"); }}
          className="mt-10 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 active:scale-[0.98] transition"
        >
          Continue
        </button>
      </div>
    </div>
  );
}
