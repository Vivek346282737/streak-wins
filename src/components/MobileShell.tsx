import { ReactNode } from "react";
import BottomNav from "./BottomNav";

export default function MobileShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-background">
      <div className="pact-shell">
        {children}
        <BottomNav />
      </div>
    </div>
  );
}
