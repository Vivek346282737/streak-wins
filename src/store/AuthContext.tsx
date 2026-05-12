import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "@/lib/firebase";

type AuthCtx = {
  user: User | null;
  loading: boolean;
  signInEmail: (email: string, password: string) => Promise<void>;
  signUpEmail: (email: string, password: string, name?: string) => Promise<void>;
  signInGoogle: () => Promise<void>;
  sendPhoneOtp: (phoneE164: string, containerId: string) => Promise<ConfirmationResult>;
  logout: () => Promise<void>;
};

const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  const value: AuthCtx = {
    user,
    loading,
    signInEmail: async (email, password) => {
      await signInWithEmailAndPassword(auth, email, password);
    },
    signUpEmail: async (email, password, name) => {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      if (name && cred.user) await updateProfile(cred.user, { displayName: name });
    },
    signInGoogle: async () => {
      await signInWithPopup(auth, googleProvider);
    },
    sendPhoneOtp: async (phoneE164, containerId) => {
      // Reset any prior verifier
      // @ts-expect-error attached on window for cleanup
      if (window.__recaptcha) { try { window.__recaptcha.clear(); } catch {} }
      const verifier = new RecaptchaVerifier(auth, containerId, { size: "invisible" });
      // @ts-expect-error
      window.__recaptcha = verifier;
      return await signInWithPhoneNumber(auth, phoneE164, verifier);
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useAuth = () => {
  const c = useContext(Ctx);
  if (!c) throw new Error("useAuth outside provider");
  return c;
};
