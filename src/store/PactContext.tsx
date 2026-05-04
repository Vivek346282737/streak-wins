import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { PACTS, type Pact } from "@/data/pacts";

export type ActivePact = {
  pactId: string;
  startedAt: string;        // ISO date
  checkIns: string[];       // ISO date strings (YYYY-MM-DD)
  status: "active" | "failed" | "completed";
};

export type WalletEntry = {
  id: string;
  title: string;
  amount: number;
  date: string;
  type: "earned" | "redeemed";
};

type State = {
  user: { name: string; phone?: string } | null;
  identity?: string;
  categories: string[];
  notificationsEnabled: boolean;
  active: ActivePact | null;
  wallet: { balance: number; entries: WalletEntry[] };
};

type Ctx = State & {
  setUser: (u: State["user"]) => void;
  setIdentity: (s: string) => void;
  setCategories: (c: string[]) => void;
  setNotifications: (b: boolean) => void;
  startPact: (id: string) => void;
  checkIn: () => void;
  abandonPact: () => void;
  resetStreak: () => void;
  completePact: () => void;
  redeem: (amount: number, title: string) => void;
};

const STORAGE = "pact-state-v1";
const Ctx = createContext<Ctx | null>(null);

const today = () => new Date().toISOString().slice(0, 10);

export function PactProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<State>(() => {
    if (typeof window === "undefined") return defaultState();
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) return { ...defaultState(), ...JSON.parse(raw) };
    } catch {}
    return defaultState();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  }, [state]);

  const value = useMemo<Ctx>(() => ({
    ...state,
    setUser: (user) => setState((s) => ({ ...s, user })),
    setIdentity: (identity) => setState((s) => ({ ...s, identity })),
    setCategories: (categories) => setState((s) => ({ ...s, categories })),
    setNotifications: (notificationsEnabled) => setState((s) => ({ ...s, notificationsEnabled })),
    startPact: (pactId) =>
      setState((s) => ({
        ...s,
        active: { pactId, startedAt: new Date().toISOString(), checkIns: [], status: "active" },
      })),
    checkIn: () =>
      setState((s) => {
        if (!s.active) return s;
        const t = today();
        if (s.active.checkIns.includes(t)) return s;
        return { ...s, active: { ...s.active, checkIns: [...s.active.checkIns, t] } };
      }),
    abandonPact: () => setState((s) => ({ ...s, active: null })),
    resetStreak: () =>
      setState((s) => (s.active ? { ...s, active: { ...s.active, checkIns: [] } } : s)),
    completePact: () =>
      setState((s) => {
        if (!s.active) return s;
        const pact = PACTS.find((p) => p.id === s.active!.pactId);
        if (!pact) return s;
        const entry: WalletEntry = {
          id: crypto.randomUUID(),
          title: pact.reward,
          amount: pact.rewardValue,
          date: new Date().toISOString(),
          type: "earned",
        };
        return {
          ...s,
          active: { ...s.active, status: "completed" },
          wallet: { balance: s.wallet.balance + pact.rewardValue, entries: [entry, ...s.wallet.entries] },
        };
      }),
    redeem: (amount, title) =>
      setState((s) => {
        if (s.wallet.balance < amount) return s;
        const entry: WalletEntry = {
          id: crypto.randomUUID(),
          title,
          amount,
          date: new Date().toISOString(),
          type: "redeemed",
        };
        return { ...s, wallet: { balance: s.wallet.balance - amount, entries: [entry, ...s.wallet.entries] } };
      }),
  }), [state]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const usePact = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("usePact outside provider");
  return c;
};

export const getPact = (id?: string): Pact | undefined => PACTS.find((p) => p.id === id);

function defaultState(): State {
  return {
    user: null,
    categories: [],
    notificationsEnabled: false,
    active: null,
    wallet: { balance: 0, entries: [] },
  };
}
