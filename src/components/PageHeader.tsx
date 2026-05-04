import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PageHeader({ title, subtitle, back = true }: { title?: string; subtitle?: string; back?: boolean }) {
  const nav = useNavigate();
  return (
    <header className="flex items-start justify-between gap-3 mb-6">
      {back ? (
        <button
          onClick={() => nav(-1)}
          aria-label="Back"
          className="h-10 w-10 grid place-items-center rounded-full glass-soft hover:bg-white/[0.06] transition"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
      ) : <div className="h-10 w-10" />}
      <div className="flex-1 text-center">
        {title && <h1 className="font-serif text-xl">{title}</h1>}
        {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
      </div>
      <div className="h-10 w-10" />
    </header>
  );
}
