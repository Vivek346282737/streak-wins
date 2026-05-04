import PageHeader from "@/components/PageHeader";
import { usePact } from "@/store/PactContext";
import { ArrowDownLeft, ArrowUpRight, Wallet as WalletIcon } from "lucide-react";
import { toast } from "sonner";

export default function Wallet() {
  const { wallet, redeem } = usePact();

  const onRedeem = () => {
    if (wallet.balance < 500) return toast.error("Minimum redemption is ₹500.");
    redeem(500, "Amazon voucher");
    toast.success("₹500 voucher sent to your email.");
  };

  return (
    <div className="pact-page animate-fade-up">
      <PageHeader title="Wallet" back={false} />

      <div className="glass p-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-green opacity-50" />
        <div className="relative">
          <div className="flex items-center gap-2 text-xs text-muted-foreground"><WalletIcon className="h-3.5 w-3.5" /> Available balance</div>
          <div className="font-serif text-5xl mt-2 gold-text">₹{wallet.balance.toLocaleString("en-IN")}</div>
          <p className="text-xs text-muted-foreground mt-2">Earned by keeping your pacts.</p>
          <button
            onClick={onRedeem}
            className="mt-5 w-full rounded-full bg-gradient-gold text-gold-foreground font-medium py-3.5"
          >
            Redeem ₹500 Amazon voucher
          </button>
        </div>
      </div>

      <h3 className="font-serif text-lg mt-8 mb-3">History</h3>
      {wallet.entries.length === 0 ? (
        <div className="glass-soft p-6 text-center text-sm text-muted-foreground">
          No transactions yet. Complete a pact to earn rewards.
        </div>
      ) : (
        <div className="space-y-2">
          {wallet.entries.map((e) => (
            <div key={e.id} className="glass-soft p-4 flex items-center gap-3">
              <div className={`h-10 w-10 grid place-items-center rounded-full ${e.type === "earned" ? "bg-accent/15 text-gold" : "bg-white/5 text-foreground"}`}>
                {e.type === "earned" ? <ArrowDownLeft className="h-4 w-4" /> : <ArrowUpRight className="h-4 w-4" />}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm truncate">{e.title}</div>
                <div className="text-[11px] text-muted-foreground">{new Date(e.date).toLocaleDateString()}</div>
              </div>
              <div className={`font-serif ${e.type === "earned" ? "text-gold" : "text-foreground"}`}>
                {e.type === "earned" ? "+" : "−"}₹{e.amount}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
