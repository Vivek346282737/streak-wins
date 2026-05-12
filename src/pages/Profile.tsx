import PageHeader from "@/components/PageHeader";
import { usePact } from "@/store/PactContext";
import { useAuth } from "@/store/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, Bell, Shield, HelpCircle, ChevronRight } from "lucide-react";
import { toast } from "sonner";

export default function Profile() {
  const { identity, categories, setUser: setLocalUser } = usePact();
  const { user: authUser, logout } = useAuth();
  const nav = useNavigate();
  const user = {
    name: authUser?.displayName || authUser?.email?.split("@")[0] || "Friend",
    phone: authUser?.phoneNumber || authUser?.email || undefined,
  };
  const handleLogout = async () => {
    try {
      await logout();
      setLocalUser(null);
      nav("/auth", { replace: true });
    } catch {
      toast.error("Failed to sign out");
    }
  };

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader title="Profile" back={false} />

      <div className="glass p-6 flex items-center gap-4">
        <div className="h-14 w-14 rounded-full bg-gradient-green border border-white/10 grid place-items-center font-serif text-gold text-xl">
          {(user?.name ?? "F")[0]}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-serif text-xl">{user?.name ?? "Friend"}</div>
          <div className="text-xs text-muted-foreground">{user?.phone ? `+91 ${user.phone}` : "Guest mode"}</div>
        </div>
      </div>

      {(identity || categories.length > 0) && (
        <div className="mt-4 glass-soft p-4">
          <div className="text-[11px] uppercase tracking-wider text-muted-foreground mb-2">You're building</div>
          <div className="flex flex-wrap gap-2">
            {identity && <span className="chip capitalize">{identity}</span>}
            {categories.map((c) => <span key={c} className="chip">{c}</span>)}
          </div>
        </div>
      )}

      <div className="mt-6 glass divide-y divide-white/5">
        <Row icon={<Bell className="h-4 w-4 text-gold" />} label="Notifications" />
        <Row icon={<Shield className="h-4 w-4 text-gold" />} label="Privacy" />
        <Row icon={<HelpCircle className="h-4 w-4 text-gold" />} label="Help & support" />
      </div>

      <button
        onClick={() => { setUser(null); nav("/"); }}
        className="mt-8 w-full rounded-full glass-soft py-4 font-medium text-destructive/90 inline-flex items-center justify-center gap-2"
      >
        <LogOut className="h-4 w-4" /> Sign out
      </button>
    </div>
  );
}

function Row({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="w-full flex items-center gap-3 px-5 py-4 text-left hover:bg-white/[0.02]">
      <div className="h-9 w-9 grid place-items-center rounded-xl bg-white/[0.04] border border-white/5">{icon}</div>
      <span className="flex-1 text-sm">{label}</span>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </button>
  );
}
