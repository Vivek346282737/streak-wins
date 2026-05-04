import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { MapPin, CheckCircle2 } from "lucide-react";
import { usePact, getPact } from "@/store/PactContext";
import { toast } from "sonner";

export default function GpsVerify() {
  const nav = useNavigate();
  const { checkIn, active, completePact } = usePact();
  const pact = getPact(active?.pactId);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setScanning(false), 1800);
    return () => clearTimeout(t);
  }, []);

  const confirm = () => {
    checkIn();
    toast.success("Check-in recorded. Streak grows.");
    const newStreak = (active?.checkIns.length ?? 0) + 1;
    if (pact && newStreak >= pact.durationDays) {
      completePact();
      nav("/completion", { replace: true });
    } else {
      nav("/tracking", { replace: true });
    }
  };

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader title="Verify activity" />

      <div className="glass p-8 text-center">
        <div className="relative mx-auto h-32 w-32 rounded-full bg-gradient-green border border-white/10 grid place-items-center">
          <div className={`absolute inset-0 rounded-full ${scanning ? "animate-pulse-gold" : ""}`} />
          <MapPin className="h-10 w-10 text-gold" />
        </div>

        {scanning ? (
          <>
            <h2 className="font-serif text-xl mt-6">Scanning location…</h2>
            <p className="text-xs text-muted-foreground mt-2">Detecting your activity.</p>
          </>
        ) : (
          <>
            <div className="mt-6 inline-flex items-center gap-2 chip"><CheckCircle2 className="h-3.5 w-3.5 text-gold" /> Activity detected</div>
            <h2 className="font-serif text-xl mt-3">{pact?.title} confirmed</h2>
            <p className="text-xs text-muted-foreground mt-2">Cubbon Park · 1.8 km · 14 min</p>
          </>
        )}
      </div>

      <button
        disabled={scanning}
        onClick={confirm}
        className="mt-8 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 disabled:opacity-40 active:scale-[0.98] transition shadow-glow"
      >
        Confirm check-in
      </button>
    </div>
  );
}
