import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Camera, MapPin, Watch } from "lucide-react";
import { useState } from "react";

export default function CheckIn() {
  const nav = useNavigate();
  const [method, setMethod] = useState<"gps" | "photo" | "wearable">("gps");

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader title="Daily check-in" />

      <p className="text-sm text-muted-foreground">Choose how you want to verify today.</p>

      <div className="mt-6 space-y-3">
        <Method id="gps" current={method} setMethod={setMethod} icon={<MapPin className="h-5 w-5 text-gold" />} title="GPS verification" desc="Detect activity from your location." />
        <Method id="photo" current={method} setMethod={setMethod} icon={<Camera className="h-5 w-5 text-gold" />} title="Photo upload" desc="Snap proof of your habit." />
        <Method id="wearable" current={method} setMethod={setMethod} icon={<Watch className="h-5 w-5 text-gold" />} title="Wearable" desc="Connect your fitness tracker." />
      </div>

      <button
        onClick={() => nav("/gps", { state: { method } })}
        className="mt-10 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 active:scale-[0.98] transition shadow-glow"
      >
        Continue
      </button>
    </div>
  );
}

function Method({ id, current, setMethod, icon, title, desc }: any) {
  const active = current === id;
  return (
    <button
      onClick={() => setMethod(id)}
      className={`w-full text-left glass p-5 flex items-center gap-4 transition ${active ? "ring-1 ring-accent/70 shadow-glow" : ""}`}
    >
      <div className="h-12 w-12 grid place-items-center rounded-2xl bg-gradient-green border border-white/10">{icon}</div>
      <div className="flex-1">
        <div className="font-serif text-base">{title}</div>
        <div className="text-xs text-muted-foreground">{desc}</div>
      </div>
      <div className={`h-5 w-5 rounded-full border ${active ? "border-accent bg-gradient-gold" : "border-white/20"}`} />
    </button>
  );
}
