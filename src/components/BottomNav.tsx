import { NavLink, useLocation } from "react-router-dom";
import { Home, Compass, Wallet, User } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { to: "/home", icon: Home, label: "Home" },
  { to: "/browse", icon: Compass, label: "Browse" },
  { to: "/wallet", icon: Wallet, label: "Wallet" },
  { to: "/profile", icon: User, label: "Profile" },
];

const HIDE_ON = ["/", "/auth", "/auth/otp", "/onboarding/identity", "/onboarding/categories", "/onboarding/notifications"];

export default function BottomNav() {
  const { pathname } = useLocation();
  if (HIDE_ON.includes(pathname)) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center safe-bottom">
      <nav className="pointer-events-auto mx-4 mb-4 w-full max-w-[412px] glass rounded-full px-2 py-2 flex items-center justify-between">
        {items.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex-1 flex flex-col items-center gap-0.5 py-2 rounded-full text-[11px] transition-colors",
                isActive ? "text-accent" : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div className={cn("p-1.5 rounded-full transition-all", isActive && "bg-accent/10")}>
                  <Icon className="h-5 w-5" />
                </div>
                <span className="leading-none">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
