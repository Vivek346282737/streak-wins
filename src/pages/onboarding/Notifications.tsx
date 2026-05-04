import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import { Bell } from "lucide-react";
import { usePact } from "@/store/PactContext";

export default function Notifications() {
  const nav = useNavigate();
  const { setNotifications } = usePact();

  return (
    <div className="pact-page flex flex-col min-h-screen">
      <PageHeader />
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-up">
        <div className="h-20 w-20 grid place-items-center rounded-full bg-gradient-green border border-white/10 mb-6 shadow-glow">
          <Bell className="h-7 w-7 text-gold" />
        </div>
        <p className="text-xs uppercase tracking-widest text-gold/80">Step 3 of 3</p>
        <h1 className="font-serif text-3xl mt-2 leading-tight max-w-xs">Gentle nudges,<br/>never noise.</h1>
        <p className="text-sm text-muted-foreground mt-3 max-w-[280px]">
          We'll remind you to check in once a day so you never break your streak by accident.
        </p>
      </div>

      <div className="space-y-3 pb-6">
        <button
          onClick={() => { setNotifications(true); nav("/home"); }}
          className="w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-4 active:scale-[0.98] transition"
        >
          Allow notifications
        </button>
        <button
          onClick={() => { setNotifications(false); nav("/home"); }}
          className="w-full rounded-full glass-soft py-4 font-medium hover:bg-white/[0.06] transition"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
