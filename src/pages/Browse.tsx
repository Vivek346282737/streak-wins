import { useMemo, useState } from "react";
import PageHeader from "@/components/PageHeader";
import { CATEGORIES, PACTS } from "@/data/pacts";
import PactCard from "@/components/PactCard";
import { Search } from "lucide-react";

export default function Browse() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");

  const list = useMemo(
    () => PACTS.filter(p =>
      (cat === "All" || p.category === cat) &&
      (q === "" || p.title.toLowerCase().includes(q.toLowerCase()) || p.brand.toLowerCase().includes(q.toLowerCase()))
    ),
    [q, cat]
  );

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader title="Browse pacts" back={false} />

      <div className="glass-soft flex items-center gap-2 px-4 py-3">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search pacts or brands"
          className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground/60"
        />
      </div>

      <div className="mt-5 -mx-6 px-6 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          {["All", ...CATEGORIES].map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-full text-xs whitespace-nowrap transition border ${cat === c ? "bg-gradient-gold text-gold-foreground border-transparent" : "border-white/10 text-foreground/80 bg-white/[0.03]"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3">
        {list.map((p) => <PactCard key={p.id} pact={p} />)}
      </div>
      {list.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-12">No pacts match your search.</p>
      )}
    </div>
  );
}
