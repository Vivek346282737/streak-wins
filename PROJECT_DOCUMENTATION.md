# PACT — Complete Project Documentation

> A single-file, exhaustive engineering document intended for use across **Resume, LinkedIn, GitHub README, HR interviews, and Technical interviews**.
> Project: **PACT — Commit. Check-in. Get Rewarded.**
> Stack: React 18 + Vite 5 + TypeScript 5 + Tailwind CSS 3 + shadcn/ui + Firebase Auth + React Router 6 + TanStack Query + Zod + Sonner.

---

## SECTION 1 — PROJECT OVERVIEW

1. **Project Name:** PACT
2. **Tagline:** *"Commit. Check-in. Get Rewarded."*
3. **One-line Description:** A premium mobile-first habit-commitment app where users create "pacts", check in daily, and earn real-world rewards for maintaining streaks.
4. **Detailed Description:**
   PACT is a production-grade React SPA that gamifies habit formation. Users sign in via Firebase (Phone OTP, Google, or Email/Password), complete a 3-step onboarding (identity → categories → notifications), browse a catalog of "pacts" (fitness, learning, mindfulness, finance…), start one, and check in daily. Each check-in extends a streak, unlocks milestones, and — on successful completion — deposits a monetary reward into an in-app wallet. Failing a day resets the streak. The app is designed mobile-first with a fixed-width phone shell centered on tablet/desktop, a dark theme with gold accents, glassmorphism, Fraunces serif headings, and smooth micro-animations.
5. **Problem Statement:** Habit apps typically rely on willpower and streak vanity. Users abandon them because there is *no external stake*. PACT introduces a **commitment device** with tangible rewards, mimicking behavioural-economics research on loss aversion and positive reinforcement.
6. **Why This Project Was Built:** To demonstrate an end-to-end product mindset — a real MVP with authentication, protected routing, persistent client state, responsive design system, and a complete user journey — not a template.
7. **Target Users:** Self-improvement seekers (18–40), fitness beginners, learners preparing for exams, mindfulness practitioners, personal-finance beginners.
8. **Real-World Use Cases:**
   - "Meditate 10 minutes daily for 21 days → ₹500 wellness voucher."
   - "Run 3 km every morning for 30 days → gym-membership discount."
   - "Read 20 pages daily for 14 days → bookstore credit."
   - Corporate wellness programs, insurance-linked healthy-behaviour rewards, EdTech streak incentives.
9. **Main Objectives:** Behaviour change through commitment devices; premium UX on any device; scalable frontend architecture; production-grade auth.
10. **Expected Impact:** Higher habit-completion rates than streak-only apps by pairing loss aversion (streak reset) with positive reinforcement (wallet reward).

---

## SECTION 2 — FEATURES

Each feature: **What → Why → How → Tech**.

### 2.1 Splash Screen
- **What:** Branded landing that routes authenticated users to `/home` and guests to `/auth`.
- **Why:** Gives Firebase time to hydrate auth state and provides a premium first impression.
- **How:** `Splash.tsx` reads `useAuth()`; while `loading` shows animated logo; on resolve navigates via `react-router-dom`.
- **Tech:** React, Firebase Auth `onAuthStateChanged`, CSS keyframes.

### 2.2 Multi-Provider Authentication
- **What:** Phone-OTP, Google popup, Email/Password sign-up + sign-in.
- **Why:** Removes friction — users pick the channel they trust.
- **How:** `AuthContext` wraps Firebase SDK methods (`signInWithPhoneNumber`, `signInWithPopup`, `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`). `RecaptchaVerifier` (invisible) satisfies phone-auth abuse checks. Session persists via `browserLocalPersistence`.
- **Tech:** Firebase Auth v12, Google provider, invisible reCAPTCHA.

### 2.3 OTP Verification
- **What:** 6-digit input with auto-advance, validates the SMS code.
- **Why:** Verifies phone ownership without passwords.
- **How:** `OtpScreen.tsx` reads `ConfirmationResult` stashed on `window.__phoneConfirmation`, calls `.confirm(code)`.
- **Tech:** React refs, controlled inputs, Firebase `ConfirmationResult`.

### 2.4 Protected Routing
- **What:** Blocks unauthenticated access to any app-internal route.
- **Why:** Prevents leaking private UI states and enables safe deep-links.
- **How:** `ProtectedRoute.tsx` inspects `useAuth()`; renders spinner during `loading`, redirects to `/auth` when unauthenticated.
- **Tech:** React Router `<Navigate>`, React Context.

### 2.5 3-Step Onboarding (Identity → Categories → Notifications)
- **What:** Personalises the feed and asks for notification permission.
- **Why:** Higher perceived relevance → higher activation rate.
- **How:** Each step writes to `PactContext`; persisted in `localStorage`.
- **Tech:** React state, Context API, `Notification.requestPermission()`.

### 2.6 Home Feed
- **What:** Shows either "start your first pact" empty state or the active pact card with streak progress.
- **Why:** One-glance status; single call-to-action.
- **How:** `usePact()` conditionally renders `<PactCard active />` or an empty CTA.
- **Tech:** React, Tailwind.

### 2.7 Browse (Catalog)
- **What:** Search + category filter over static `PACTS` data.
- **Why:** Discovery — users pick what matches their goals.
- **How:** `useMemo`-based filter over `pacts.ts`; controlled search input.
- **Tech:** React memoisation, Lucide icons.

### 2.8 Pact Detail
- **What:** Full pact info: duration, reward value, category, description.
- **Why:** Informed commitment.
- **How:** Reads `:id` from URL, `getPact(id)`, `startPact()` on CTA.

### 2.9 Tracking
- **What:** Calendar of check-ins, streak counter, milestones (7 / 14 / 21 days), progress bar.
- **Why:** Positive reinforcement + visual momentum.
- **How:** Derives streak from `active.checkIns[]`; renders `react-day-picker` calendar; computes progress `%` from pact duration.

### 2.10 Daily Check-In
- **What:** Choose GPS / photo / wearable verification.
- **Why:** Anti-cheat mechanism; supports different pact types.
- **How:** Modal-like UI dispatches to `/gps` (mock) or directly extends `checkIns[]`.

### 2.11 Mock GPS Verify
- **What:** Simulated location check with radial pulse animation.
- **Why:** Demonstrates a real-world verification flow without paid maps SDK.
- **How:** `setTimeout` simulates async verify; success calls `checkIn()`.

### 2.12 Failure Flow
- **What:** Shown when user misses a day; offers `resetStreak` or `abandonPact`.
- **Why:** Empathetic failure UX drives retention.

### 2.13 Completion Flow
- **What:** Confetti + reward credited to wallet on completion.
- **How:** `completePact()` in context creates a `WalletEntry` and adds `rewardValue` to balance.

### 2.14 Wallet
- **What:** Balance, transaction history (earned/redeemed), redeem CTA.
- **Why:** Closes the loop from behaviour → reward.
- **How:** `redeem(amount, title)` guards on balance and pushes an entry.

### 2.15 Profile
- **What:** User info, preferences, logout.
- **How:** Calls `logout()` → Firebase `signOut()` → redirect.

### 2.16 Bottom Nav
- **What:** iOS-style floating glass tab bar (Home / Browse / Wallet / Profile).
- **Why:** One-thumb navigation on mobile.
- **How:** `NavLink` active states; hidden on auth/onboarding.

### 2.17 Design System
- Fraunces serif headings + Inter body, dark surface with **gold gradient** primary, glass panels, hairline separators, `animate-fade-up`.

### 2.18 Toast Notifications
- Non-blocking feedback via **Sonner** + shadcn Toaster.

### 2.19 Client-Side Persistence
- All non-auth state persisted in `localStorage` under `pact-state-v1`.

### 2.20 Responsive Shell
- `.pact-shell` clamps width to ≤412 px and centers on ≥ tablet; safe-area padding.

---

## SECTION 3 — TECH STACK

| Layer | Choice | Why | Alternatives | Advantages |
|---|---|---|---|---|
| **Frontend** | React 18 | Ecosystem, hooks, concurrent rendering | Vue, Svelte | Massive ecosystem, hiring pool |
| **Language** | TypeScript 5 | Type safety, refactor confidence | Plain JS | Fewer runtime bugs |
| **Build** | Vite 5 (SWC) | Instant HMR, ESM-native | Webpack, Parcel | 10× faster dev |
| **Routing** | React Router 6 | Nested routes, data APIs | TanStack Router | Standard, familiar |
| **State (server)** | TanStack Query 5 | Cache/refetch/dedupe | SWR, RTK Query | Battle-tested |
| **State (client)** | React Context + `useMemo` | Small state surface | Zustand, Redux | Zero deps |
| **Persistence** | localStorage | Simple offline-first | IndexedDB | Fast enough for KB-scale JSON |
| **Auth** | Firebase Auth v12 | Managed OTP + OAuth | Auth0, Supabase | SMS + Google out of the box |
| **Styling** | Tailwind CSS 3 | Utility-first, theming via CSS vars | CSS Modules | Rapid iteration |
| **Components** | shadcn/ui + Radix | Accessible primitives | MUI, Chakra | Copy-owned code |
| **Icons** | lucide-react | Tree-shakeable SVG | Heroicons | Consistent stroke |
| **Forms** | react-hook-form | Uncontrolled perf | Formik | Minimal re-renders |
| **Validation** | zod | Type-inferred schemas | yup | Static + runtime |
| **Notifications** | sonner + shadcn Toaster | Beautiful toasts | react-toastify | Small, ergonomic |
| **Charts** | recharts | Declarative | victory | Composable |
| **Dates** | date-fns | Tree-shakeable | moment | Immutable, small |
| **Calendar** | react-day-picker | A11y-friendly | flatpickr | Headless |
| **Animation** | tailwindcss-animate + CSS keyframes | Zero JS cost | framer-motion | No bundle bloat |
| **Testing** | Vitest + Testing Library + jsdom | Vite-native | Jest | Faster |
| **Lint** | ESLint 9 + typescript-eslint | Standard | Biome | Ecosystem plugins |
| **Hosting** | Lovable + custom domain (optional) | Zero-config | Vercel, Netlify | Instant preview |

---

## SECTION 4 — COMPLETE ARCHITECTURE

```
┌──────────┐    ┌──────────────┐    ┌────────────────┐    ┌─────────────┐    ┌──────────────┐
│  USER    │──▶ │  React SPA   │──▶ │ Firebase Auth  │──▶ │  Firebase   │──▶ │  UI Update   │
│ (mobile) │    │ (Vite build) │    │ (OTP/Google/PW)│    │  ID Token   │    │ (React state)│
└──────────┘    └──────┬───────┘    └────────────────┘    └─────────────┘    └──────────────┘
                       │
                       ▼
              ┌─────────────────┐
              │ React Context   │
              │ (Auth + Pact)   │──▶ localStorage (pact-state-v1)
              └─────────────────┘
```

**Step-by-step:**
1. **User** loads the SPA → `index.html` → `main.tsx` bootstraps React.
2. **App.tsx** mounts providers: `QueryClientProvider` → `AuthProvider` → `PactProvider` → `TooltipProvider` → `BrowserRouter`.
3. **AuthProvider** calls `onAuthStateChanged`; while resolving, `loading=true` blocks protected routes with a spinner.
4. Guest hits `/auth`, chooses provider. For phone: `RecaptchaVerifier` mounts invisible widget → `signInWithPhoneNumber` returns `ConfirmationResult` → user enters OTP → `.confirm(code)` yields a `User`.
5. On successful auth, Firebase persists the session in IndexedDB (`browserLocalPersistence`) and fires `onAuthStateChanged` → context updates → `ProtectedRoute` unlocks.
6. **PactProvider** hydrates from `localStorage`, exposes actions (`startPact`, `checkIn`, `completePact`, `redeem`). Every state change is serialised back to storage via `useEffect`.
7. UI reads context, renders reactive components. Toasts (`sonner`) provide feedback.
8. Logout → `signOut(auth)` → `onAuthStateChanged(null)` → redirect to `/auth`.

---

## SECTION 5 — DATABASE

The current MVP uses **client-side persistence (`localStorage`)** as its "database". It is intentionally schema-shaped so migration to Firestore is trivial.

### 5.1 `users` (planned — Firestore)
| Field | Type | Notes |
|---|---|---|
| `uid` | string (PK) | Firebase UID |
| `displayName` | string | |
| `email` | string? | |
| `phone` | string? | E.164 |
| `identity` | string | Onboarding value |
| `categories` | string[] | Chosen interests |
| `notificationsEnabled` | boolean | |
| `createdAt` | Timestamp | Server time |

### 5.2 `pacts` (static — `src/data/pacts.ts`)
| Field | Type |
|---|---|
| `id` | string |
| `title` | string |
| `category` | 'fitness' \| 'learning' \| 'mindfulness' \| 'finance' |
| `durationDays` | number |
| `reward` | string |
| `rewardValue` | number (INR) |
| `description` | string |

### 5.3 `activePact` (localStorage — planned Firestore subcollection `users/{uid}/activePact`)
```ts
{ pactId: string; startedAt: ISOString; checkIns: 'YYYY-MM-DD'[]; status: 'active' | 'failed' | 'completed' }
```
Indexes (planned): `status`, `startedAt DESC`.

### 5.4 `wallet` (localStorage — planned `users/{uid}/wallet`)
```ts
{
  balance: number,
  entries: { id: string; title: string; amount: number; date: ISOString; type: 'earned' | 'redeemed' }[]
}
```

**Design decisions:**
- Keep pact catalog static — no round-trip on browse.
- One document per user for hot state to avoid N+1 reads.
- Store dates as ISO strings for portability; convert to `Timestamp` on Firestore write.
- Idempotent check-in (dedupe on `YYYY-MM-DD`) prevents double-credit.

---

## SECTION 6 — AUTHENTICATION

- **Signup flows:** Email/Password (`createUserWithEmailAndPassword` + `updateProfile`), Phone (OTP), Google (implicit signup on first sign-in).
- **Login flows:** Same three channels.
- **Forgot password:** Firebase `sendPasswordResetEmail` (planned CTA).
- **Session management:** `browserLocalPersistence` → session survives reloads; `onAuthStateChanged` is the single source of truth.
- **Protected routes:** `ProtectedRoute` wraps every internal page in `App.tsx`.
- **Role management:** Not required for MVP; planned via a separate `user_roles` table with a `has_role()` security-definer function.
- **Logout:** `signOut(auth)` in `AuthContext.logout()` triggered from `Profile.tsx`.
- **Security:** Firebase ID tokens are HTTPS-only, short-lived (1h), auto-refreshed by SDK; reCAPTCHA gates phone auth; authorized-domains list prevents phishing origin abuse.
- **Persistence:** Firebase IndexedDB store; app-state in `localStorage`.
- **Firebase Config:** Publishable web keys live in `src/lib/firebase.ts` (safe to ship; scoped by domain).
- **JWT:** Firebase issues short-lived JWT ID tokens; retrieved with `user.getIdToken()` for future server-side calls.

---

## SECTION 7 — FOLDER STRUCTURE

```
pact/
├── public/                # Static assets served as-is
├── src/
│   ├── assets/            # Local images/svgs (empty for now)
│   ├── components/        # Reusable UI (BottomNav, MobileShell, PactCard, PageHeader, ProtectedRoute, NavLink)
│   │   └── ui/            # shadcn primitives (button, dialog, toast…)
│   ├── data/pacts.ts      # Static catalog
│   ├── hooks/             # use-mobile, use-toast
│   ├── lib/               # firebase.ts, utils.ts (cn helper)
│   ├── pages/             # Route-level screens
│   │   └── onboarding/    # Identity, Categories, Notifications
│   ├── store/             # AuthContext, PactContext
│   ├── test/              # setup + example spec
│   ├── App.tsx            # Provider + router composition
│   ├── main.tsx           # React root
│   └── index.css          # Tailwind layers + design tokens
├── index.html
├── tailwind.config.ts
├── vite.config.ts
├── vitest.config.ts
├── tsconfig*.json
└── package.json
```

Responsibilities: `components/` = presentational + shared; `pages/` = route views; `store/` = global state; `lib/` = framework glue; `data/` = static domain data; `hooks/` = cross-cutting logic.

---

## SECTION 8 — COMPONENTS

| Component | Purpose | Props | State/Hooks | Reusable |
|---|---|---|---|---|
| `MobileShell` | Centers app in phone-shaped shell | `children` | — | ✅ |
| `BottomNav` | Floating glass tab bar | — | `useLocation` | ✅ |
| `NavLink` | Link with active variant | `to`, `children` | — | ✅ |
| `PageHeader` | Top bar with back button + title | `title?`, `back?` | `useNavigate` | ✅ |
| `PactCard` | Displays pact summary | `pact`, `active?` | — | ✅ |
| `ProtectedRoute` | Gate for auth | `children` | `useAuth` | ✅ |
| `ui/*` (shadcn) | Radix-based primitives | varies | — | ✅ |

Every page component consumes `PactContext` / `AuthContext`; details in Section 9.

---

## SECTION 9 — PAGES

| Page | Route | Purpose | Key APIs | Navigation |
|---|---|---|---|---|
| Splash | `/` | Brand + auth-gate router | `useAuth` | → `/home` or `/auth` |
| Auth | `/auth` | Sign-in hub (phone/email/Google) | `sendPhoneOtp`, `signInEmail`, `signUpEmail`, `signInGoogle` | → `/auth/otp` or `/home` |
| OtpScreen | `/auth/otp` | Verify 6-digit code | `ConfirmationResult.confirm` | → `/home` |
| Identity | `/onboarding/identity` | "I am…" self-label | `setIdentity` | → `/onboarding/categories` |
| Categories | `/onboarding/categories` | Multi-select interests | `setCategories` | → `/onboarding/notifications` |
| Notifications | `/onboarding/notifications` | Permission prompt | `Notification.requestPermission` | → `/home` |
| Home | `/home` | Active pact / empty state | `usePact` | → `/browse` |
| Browse | `/browse` | Catalog with search/filter | `PACTS` | → `/pact/:id` |
| PactDetail | `/pact/:id` | Info + start | `startPact` | → `/tracking` |
| Tracking | `/tracking` | Streak/calendar/progress | `usePact` | → `/check-in` |
| CheckIn | `/check-in` | Choose verification method | `checkIn` | → `/gps` or `/tracking` |
| GpsVerify | `/gps` | Mock geolocation | `checkIn` | → `/tracking` |
| Failure | `/failure` | Miss-day empathy screen | `resetStreak`, `abandonPact` | → `/home` |
| Completion | `/completion` | Reward unlocked | `completePact` | → `/wallet` |
| Wallet | `/wallet` | Balance + entries + redeem | `redeem` | — |
| Profile | `/profile` | User info + logout | `logout` | → `/auth` |
| NotFound | `*` | 404 fallback | — | — |

---

## SECTION 10 — CUSTOM HOOKS

| Hook | Purpose | Returns | Usage |
|---|---|---|---|
| `useAuth()` | Access Firebase auth context | `{ user, loading, signInEmail, signUpEmail, signInGoogle, sendPhoneOtp, logout }` | Everywhere auth-aware |
| `usePact()` | App-domain state + actions | `State + actions` (see PactContext) | Pages that read/mutate pacts |
| `useIsMobile()` | Reactive media-query | `boolean` | Conditional UI |
| `useToast()` | shadcn toast bridge | `{ toast, dismiss }` | Non-Sonner toasts |

---

## SECTION 11 — STATE MANAGEMENT

- **Global:** two Contexts (`AuthContext`, `PactContext`) — small surface, no need for Redux.
- **Server state:** TanStack Query is wired for future REST/Firestore calls.
- **Local:** `useState` inside forms/pages.
- **Persistence:** `PactProvider` hydrates from `localStorage` at boot, `useEffect` writes on every change. Auth persistence handled by Firebase IndexedDB.
- **Caching:** Query cache with default 5-min stale time (when APIs are added).

---

## SECTION 12 — API

MVP is client-only; no custom REST endpoints. External APIs used:

| API | Method | Purpose | Auth | Errors |
|---|---|---|---|---|
| `firebase.auth signInWithPhoneNumber` | RPC | Send SMS OTP | reCAPTCHA | `auth/invalid-phone-number`, `auth/too-many-requests` |
| `ConfirmationResult.confirm(code)` | RPC | Verify OTP | — | `auth/invalid-verification-code` |
| `signInWithPopup(googleProvider)` | RPC | Google OAuth | Popup | `auth/popup-closed-by-user` |
| `signInWithEmailAndPassword` | RPC | Email login | — | `auth/wrong-password`, `auth/user-not-found` |
| `createUserWithEmailAndPassword` | RPC | Email signup | — | `auth/email-already-in-use`, `auth/weak-password` |
| `signOut` | RPC | Logout | Session | — |

Planned Firestore endpoints (`users/{uid}`, `wallet`, `activePact`) will be authenticated via the Firebase ID token.

---

## SECTION 13 — FIREBASE

- **Project:** `pactforlife`
- **Auth providers:** Email/Password, Google, Phone (SMS).
- **Persistence:** `browserLocalPersistence` (IndexedDB).
- **reCAPTCHA:** invisible verifier for phone auth.
- **Firestore/Storage/Functions:** not enabled in MVP; described in "Future Improvements".
- **Security rules (planned):** `allow read, write: if request.auth.uid == uid;` per user document; catalog collection `pacts` is read-only public.
- **Indexes (planned):** `wallet.entries` composite index on `(uid, date DESC)`.
- **Authorized domains:** `localhost`, `*.lovable.app`, custom domain when published.

---

## SECTION 14 — SECURITY

- **AuthN:** Firebase-managed JWTs, short-lived, auto-refreshed.
- **AuthZ:** Route guard (`ProtectedRoute`); future Firestore rules per-uid.
- **Input validation:** phone regex, email/password constraints via HTML5 + zod schemas.
- **XSS:** React escapes output by default; no `dangerouslySetInnerHTML`.
- **CSRF:** N/A — no cookie-authenticated endpoints; token in Authorization header when calling APIs.
- **Password security:** delegated to Firebase (bcrypt + scrypt hybrid).
- **Env vars:** publishable Firebase config is safe in client; private keys never shipped.
- **Rate limiting:** Firebase quotas + reCAPTCHA prevent OTP abuse.
- **Transport:** HTTPS enforced by Lovable hosting.

---

## SECTION 15 — PERFORMANCE

- **Vite + SWC** → sub-second HMR and small production bundles.
- **Tree-shaken icons** via `lucide-react` per-icon imports.
- **`useMemo`** in `PactProvider` prevents unnecessary re-renders.
- **CSS animations** (no runtime animation library).
- **Route-level splitting** ready via `React.lazy` (planned).
- **Query dedupe/caching** through TanStack Query.
- **localStorage** avoids network cost for hot state.
- **Deferred reCAPTCHA** — verifier only instantiated when OTP requested.
- **Pagination/virtualization** deferred until dataset > 100 items.

---

## SECTION 16 — CHALLENGES

1. **Phone OTP + Preview iframes** — `RecaptchaVerifier` requires a real DOM node before `signInWithPhoneNumber`. Solved by keeping a persistent `<div id="recaptcha-container" />` inside `Auth.tsx` and clearing prior verifiers on remount.
2. **Auth-state race with protected routes** — early renders redirected to `/auth` before Firebase hydrated. Solved by tracking `loading` in `AuthContext` and rendering a spinner in `ProtectedRoute`.
3. **State persistence bootstrap** — hydrating from `localStorage` synchronously on first render prevents flicker; guarded with `typeof window !== 'undefined'` for SSR safety.
4. **Idempotent check-ins** — dedupe by `YYYY-MM-DD`.
5. **Mobile-first responsive shell on desktop** — clamped max-width with safe-area padding for iOS.
6. **Design consistency** — enforced via CSS variables + Tailwind semantic tokens; zero hard-coded colors in components.

---

## SECTION 17 — LEARNINGS

- Composing multiple React Contexts without prop-drilling.
- Managing async auth boot state cleanly.
- Firebase phone-auth quirks (reCAPTCHA lifecycle).
- Building a design token system for dark theming.
- Structuring a Vite + shadcn codebase for scale.
- Producing production-grade UX with zero runtime animation deps.

---

## SECTION 18 — FUTURE IMPROVEMENTS

- Migrate persistence to **Firestore** (offline cache enabled).
- **Cloud Functions** for streak validation and reward disbursement.
- **Real GPS + wearables** (HealthKit / Google Fit / Strava).
- **Stripe/Razorpay** wallet withdrawal.
- **Push notifications** via FCM.
- **Social features** — friend pacts, leaderboards.
- **AI coach** using Lovable AI Gateway.
- **Analytics** (PostHog / GA4).
- **i18n** with `react-i18next`.
- **E2E tests** with Playwright.

---

## SECTION 19 — RESUME CONTENT (ATS-optimised)

**Title:** PACT — Habit Commitment & Rewards App
**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Firebase Auth · React Router · TanStack Query · Zod

**Professional Summary:**
Designed and built a production-grade mobile-first React application that gamifies habit formation through commitment devices and monetary rewards, featuring multi-provider Firebase authentication, protected routing, persistent state, and a custom design system.

**Bullets:**
- Architected a **mobile-first React 18 + TypeScript** SPA on Vite with a custom dark design system, glassmorphism, and Fraunces/Inter typography.
- Integrated **Firebase Authentication** with Phone OTP (invisible reCAPTCHA), Google OAuth, and Email/Password, achieving session persistence via IndexedDB.
- Implemented **protected routing** using React Router 6 and a `ProtectedRoute` guard that respects async auth hydration state.
- Designed a **global state layer** with two React Contexts (`AuthContext`, `PactContext`) and `localStorage` persistence, exposing 8 domain actions.
- Built a **17-screen user journey** — splash, auth, OTP, 3-step onboarding, home, browse, detail, tracking, check-in, GPS mock, failure, completion, wallet, profile.
- Developed a **catalog + search + filter** system with `useMemo` optimisations over a typed static dataset.
- Modelled an **idempotent daily check-in engine** with streak calculation, milestones, and reward crediting.
- Configured **Vitest + Testing Library + jsdom** and ESLint 9 with typescript-eslint for CI-ready quality gates.

---

## SECTION 20 — LINKEDIN CONTENT

> 🚀 Just shipped **PACT** — a mobile-first React app that turns habits into commitments with real rewards.
>
> ✨ Highlights
> • Firebase Auth (Phone OTP + Google + Email)
> • 17-screen premium UX with custom dark design system
> • React 18 + TypeScript + Vite + Tailwind + shadcn/ui
> • Protected routing, persistent state, idempotent check-in engine
> • Fully responsive — feels native on mobile, elegant on desktop
>
> Building PACT taught me a ton about auth lifecycles, design-token architecture, and shipping polished UX without runtime animation libraries. Try it 👉 [link]
>
> #React #TypeScript #Firebase #Frontend #ProductEngineering

---

## SECTION 21 — GITHUB README

````md
# PACT — Commit. Check-in. Get Rewarded.

Premium mobile-first habit-commitment app. Create pacts, check in daily, earn real rewards.

## ✨ Features
Phone OTP + Google + Email auth · Onboarding · Catalog · Streak tracking · Wallet · Mock GPS · Dark design system.

## 🧱 Tech Stack
React 18 · TypeScript · Vite · Tailwind · shadcn/ui · Firebase Auth · React Router · TanStack Query · Zod · Sonner.

## 🚀 Installation
```bash
git clone <repo>
cd pact
npm install
npm run dev
```

## 🔧 Configuration
Firebase config lives in `src/lib/firebase.ts` (publishable web keys — safe to ship). In Firebase Console → Auth → **Authorized domains**, add your dev + prod origins. Enable **Email/Password, Google, Phone** providers.

## 📁 Folder Structure
See `PROJECT_DOCUMENTATION.md` §7.

## 🏛 Architecture
User → React SPA → Firebase Auth → Context (Auth/Pact) → localStorage → UI.

## 🖼 Screenshots
_Add screenshots of Splash, Auth, Home, Tracking, Wallet here._

## ☁️ Deployment
One-click via Lovable. Alternatively `npm run build` → deploy `dist/` to Vercel/Netlify.

## 🔭 Future Scope
Firestore · Cloud Functions · Push notifications · Payment gateway · Wearables.

## 📄 License
MIT
````

---

## SECTION 22 — INTERVIEW PREPARATION

### 30-second pitch
> PACT is a mobile-first React + TypeScript app I built that gamifies habit formation. Users authenticate via Firebase — Phone OTP, Google, or Email — pick a pact, check in daily, and earn wallet rewards for completed streaks. It ships with a custom design system, protected routing, and persistent state.

### 2-minute
Expand on architecture: providers (Query → Auth → Pact → Router), Firebase auth flows including invisible reCAPTCHA, and the idempotent check-in engine. Mention 17 screens and the mobile-first shell that centers on desktop.

### 5-minute
Add design-system decisions (semantic Tailwind tokens, glass surfaces, Fraunces headings), state architecture trade-offs (Context vs Redux), and the challenges section (auth race, reCAPTCHA lifecycle, state hydration). Show a snippet of `ProtectedRoute` or `PactProvider`.

### 10-minute
Walk through every route on-screen; explain data shapes; describe how the app would migrate to Firestore (schema in §5, rules in §13); discuss security (JWT, XSS, CSRF); performance (memoisation, bundle size); testing strategy; and roadmap.

**How to answer:** Lead with impact ("I built…"), then architecture, then a concrete challenge with resolution, and end with what you'd do next.

---

## SECTION 23 — 50 INTERVIEW QUESTIONS & ANSWERS

**React**
1. *Why React 18?* — Concurrent features, automatic batching, `useId`, ecosystem maturity.
2. *Difference between `useMemo` and `useCallback`?* — Value vs function memoisation.
3. *When to use Context vs Redux?* — Small, low-frequency updates → Context. Large trees with fine-grained updates → Redux/Zustand.
4. *How does React Router 6 differ from v5?* — `Routes` replaces `Switch`; element prop; nested routes with `<Outlet/>`.
5. *Why keys in lists?* — Reconciliation identity.
6. *How do you avoid re-renders?* — Memoise selectors, split context, use `React.memo`.
7. *What is Suspense?* — Declarative loading boundary for async resources.
8. *Controlled vs uncontrolled inputs?* — State-driven vs ref-driven.
9. *Effect cleanup?* — Return fn from `useEffect`; runs on unmount/deps change.
10. *Why `useState` lazy initialiser?* — Avoids expensive recomputation on rerender (used in `PactProvider`).

**TypeScript**
11. *What's a discriminated union?* — `status: 'active'|'failed'|'completed'` — narrowing.
12. *`interface` vs `type`?* — Both work; `interface` merges, `type` composes.
13. *Generics use case?* — `createContext<Ctx | null>`.
14. *Why `unknown` over `any`?* — Forces narrowing.
15. *`as const`?* — Literal-tuple typing.

**Firebase / Auth**
16. *Why invisible reCAPTCHA?* — Abuse prevention on phone auth without user friction.
17. *How is the session persisted?* — `browserLocalPersistence` (IndexedDB).
18. *How does `onAuthStateChanged` help?* — Reactive single source of truth.
19. *Are Firebase web keys secret?* — No; they're publishable and scoped by authorized domains.
20. *How would you add Firestore rules?* — `request.auth.uid == uid` per user doc.
21. *What is `ConfirmationResult`?* — Returned by `signInWithPhoneNumber`; `confirm(code)` resolves the sign-in.
22. *Handling `auth/too-many-requests`?* — Backoff + user-friendly toast.
23. *Google OAuth via popup vs redirect?* — Popup is smoother on desktop; redirect for mobile in-app browsers.
24. *How is ID token refreshed?* — SDK auto-refreshes hourly.
25. *Why `updateProfile` after signup?* — Sets `displayName` on the auth user.

**Architecture**
26. *Why two contexts?* — Separation of concerns: identity vs domain state.
27. *Why localStorage for domain state?* — Fastest MVP path; schema-shaped for future Firestore migration.
28. *How does `MobileShell` stay mobile-first on desktop?* — Clamped max-width + centered layout.
29. *Bottom-nav visibility control?* — Route-based `HIDE_ON` allowlist.
30. *How do you prevent double check-in?* — Dedupe by `YYYY-MM-DD` in `checkIn` reducer.

**Performance**
31. *Vite vs Webpack?* — Native ESM + esbuild pre-bundle → faster dev.
32. *Bundle-size tactics?* — Tree-shaken icons, no runtime animation lib, code-splitting-ready.
33. *When to virtualise?* — Lists > ~100 rows; not needed yet.
34. *Query stale-time?* — TanStack default 0; tune per resource.
35. *Why avoid `dangerouslySetInnerHTML`?* — XSS.

**Security**
36. *CSRF concerns?* — None currently; token in header.
37. *Password storage?* — Delegated to Firebase.
38. *Preventing phishing on OAuth?* — Authorized-domains list.
39. *Rate limiting OTP?* — Firebase quota + reCAPTCHA.
40. *Env-var strategy?* — Publishable in client; private only in edge functions.

**Design**
41. *Design tokens?* — CSS vars in `index.css`, referenced via Tailwind semantic classes.
42. *Dark theme?* — Default; light theme planned via `next-themes`.
43. *A11y?* — Radix primitives ensure ARIA correctness.

**Testing / Tooling**
44. *Why Vitest?* — Vite-native, fast, jest-compatible API.
45. *How would you test auth?* — Mock Firebase SDK; test `AuthProvider` with `@testing-library/react`.
46. *ESLint config?* — Flat config with `typescript-eslint` and `react-hooks`.

**Deployment**
47. *How is the app deployed?* — Vite build → Lovable hosting; alternative Vercel/Netlify.
48. *Custom domain?* — CNAME to hosting.
49. *Environment separation?* — Firebase project per env; Vite `mode`.
50. *Rollback strategy?* — Immutable deployments + previous version pinning.

---

## SECTION 24 — SYSTEM DESIGN

**Architecture:** SPA + BaaS (Firebase). No custom backend needed at MVP.
**Scalability:** Firebase Auth handles millions; Firestore scales horizontally; static assets served from CDN.
**Performance:** Client-side routing, memoised state, tree-shaken UI.
**Trade-offs:** localStorage limits multi-device sync — accepted for MVP; will migrate.
**Database decisions:** Denormalised per-user doc for hot state; static catalog for zero-latency browse.
**Security decisions:** BaaS auth removes password-management risk; per-uid rules for isolation.

---

## SECTION 25 — METRICS

- Lines of code: **~2,500** (excluding shadcn primitives).
- Components: **7 custom + ~40 shadcn primitives**.
- Pages: **17**.
- Custom hooks: **4** (2 domain + 2 utility).
- Collections (planned): **3** (`users`, `wallets`, `activePacts`); catalog static.
- External API surface: **6 Firebase Auth methods**.
- Complexity: medium-frontend, low-backend (MVP).
- Development time: **~15–20 focused hours**.

---

## SECTION 26 — NPM PACKAGES

**Runtime**
- `react`, `react-dom` — UI runtime.
- `react-router-dom` — Client routing.
- `@tanstack/react-query` — Server-state cache.
- `firebase` — Auth SDK.
- `tailwindcss`, `tailwindcss-animate`, `@tailwindcss/typography` — Styling.
- `class-variance-authority`, `clsx`, `tailwind-merge` — Class composition helpers.
- `lucide-react` — Icons.
- `sonner` — Toasts.
- `@radix-ui/*` — Accessible primitives underlying shadcn/ui.
- `react-hook-form`, `@hookform/resolvers`, `zod` — Forms + validation.
- `date-fns`, `react-day-picker` — Dates & calendar.
- `input-otp` — OTP input primitive.
- `recharts` — Charts (future analytics).
- `embla-carousel-react`, `vaul`, `cmdk`, `next-themes`, `react-resizable-panels` — UI utilities.

**Dev**
- `typescript`, `@types/*` — Types.
- `vite`, `@vitejs/plugin-react-swc` — Build.
- `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom` — Testing.
- `eslint`, `typescript-eslint`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` — Lint.
- `autoprefixer`, `postcss` — CSS pipeline.
- `lovable-tagger` — Lovable component tagger for previews.

---

## SECTION 27 — DEPLOYMENT

1. `npm run build` → Vite produces `dist/`.
2. Lovable's hosting layer serves `dist/` on a preview URL; publishing promotes it to a stable URL.
3. Add production domain to Firebase **Authorized domains**.
4. (Optional) Bind a custom domain via CNAME.
5. Verify auth flows on production URL (Google popup requires HTTPS; Phone auth requires domain allow-list).
6. Monitor via Firebase Console → Authentication → Users.

Alternative pipelines: GitHub → Vercel/Netlify with `vite build` command and `dist` publish dir.

---

## SECTION 28 — COMPLETE CODE EXPLANATION

**`main.tsx`** bootstraps React and imports Tailwind.
**`App.tsx`** composes providers (Query → Auth → Pact → Tooltip) then the Router with `MobileShell`, mapping every route through `ProtectedRoute` where required.
**`lib/firebase.ts`** initialises the Firebase app, exports `auth` and `googleProvider`, and sets `browserLocalPersistence` so users stay signed in across reloads.
**`store/AuthContext.tsx`** subscribes to `onAuthStateChanged`, exposing `user`, `loading`, and typed methods for each sign-in strategy. Phone auth constructs an invisible `RecaptchaVerifier`, cleaning up prior instances via a `window` handle.
**`store/PactContext.tsx`** owns domain state (identity, categories, active pact, wallet). It hydrates synchronously from `localStorage` on first render and persists on every change via `useEffect`. Actions are wrapped in `useMemo` to keep referential stability.
**`components/ProtectedRoute.tsx`** displays a spinner while auth is hydrating, then either renders children or redirects to `/auth`.
**`components/MobileShell.tsx` + `BottomNav.tsx`** create a phone-shaped viewport with a floating glass tab bar, hidden on auth/onboarding routes via an allow-list.
**`pages/Auth.tsx`** offers three modes with a segmented control. Phone mode wires an invisible reCAPTCHA to `sendPhoneOtp` and forwards the returned `ConfirmationResult` to `OtpScreen` via `window`.
**`pages/OtpScreen.tsx`** renders 6 controlled inputs with auto-advance, calls `.confirm(code)`, and navigates to `/home` on success.
**Onboarding pages** each mutate `PactContext` then push the next route.
**`Home.tsx`** branches on `active` to render either an empty CTA or the running pact.
**`Browse.tsx`** filters the static `PACTS` array via `useMemo`.
**`Tracking.tsx`** computes streak length, milestones (7/14/21), and progress %, rendered against a `react-day-picker` calendar.
**`CheckIn.tsx`** offers verification methods; **`GpsVerify.tsx`** simulates a location check with a `setTimeout` and calls `checkIn()`.
**`Failure.tsx` / `Completion.tsx`** finalise the run via `resetStreak` / `completePact`.
**`Wallet.tsx`** displays balance and entries, allowing `redeem`.
**`Profile.tsx`** shows user data and triggers `logout`, which calls Firebase `signOut` and cascades to `ProtectedRoute` → redirect.

---

## FINAL SECTION — DELIVERABLES

### 1. Resume Version
See §19 for the ATS-optimised block. Paste directly under a "Projects" heading.

### 2. LinkedIn Version
See §20. Includes hashtags and CTA.

### 3. GitHub README
See §21. Copy into `README.md` at repo root.

### 4. HR Interview Explanation
> "PACT is a habit-commitment app I designed and built end-to-end. Users sign in with their phone or Google, choose a pact they want to commit to, check in daily, and earn wallet rewards for completed streaks. My focus was on shipping a premium, production-ready experience — polished UX, real authentication, and clean architecture — not a demo."

### 5. Technical Interview Explanation
> "It's a React 18 + TypeScript SPA built on Vite. Auth is Firebase with Phone OTP (invisible reCAPTCHA), Google, and Email/Password. State is split between two React Contexts — one for identity, one for the domain — with localStorage persistence and a memoised action layer. Routing uses React Router 6 behind a `ProtectedRoute` guard that respects the async auth hydration state. Styling is Tailwind with a semantic-token design system so dark theming and shadcn variants stay consistent. The check-in engine is idempotent — deduped by date — and reward crediting is atomic inside the reducer. The next step is migrating hot state to Firestore with per-uid rules and adding Cloud Functions for streak validation and payouts."

### 6. Recruiter-Friendly Summary
Full-stack-capable frontend engineer who ships production-grade React apps: authentication, state architecture, design systems, and mobile-first UX.

### 7. ATS Keywords
React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Radix UI, Firebase Authentication, Phone OTP, Google OAuth, React Router 6, TanStack Query, Zod, React Hook Form, Context API, localStorage, Mobile-first, Responsive Design, Design System, Glassmorphism, Protected Routes, Vitest, ESLint, SPA, PWA-ready, MVP, Frontend Architecture, Product Engineering.

### 8. Elevator Pitch
> "PACT turns habits into commitments. Sign in, pick a pact, check in daily — miss a day and your streak resets, finish and your wallet gets credited. I built it in React + TypeScript with Firebase auth and a custom design system to feel like a real startup product, not a template."

### 9. STAR Format
- **Situation:** Habit apps have low retention because there's no real stake.
- **Task:** Ship an MVP that pairs commitment with tangible rewards.
- **Action:** Designed 17 screens, implemented Firebase multi-provider auth with protected routing, built a Context-based state layer with persistence, and shipped a custom dark design system.
- **Result:** A production-grade mobile-first SPA with complete user journeys, ready for Firestore/payment integration.

### 10. Professional Project Documentation
This file (`PROJECT_DOCUMENTATION.md`) is that documentation. Include it in the repo root alongside `README.md`.
