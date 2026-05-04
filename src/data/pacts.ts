export type Pact = {
  id: string;
  title: string;
  brand: string;
  category: string;
  description: string;
  durationDays: number;
  reward: string;
  rewardValue: number;
  color: string;
  emoji: string;
};

export const PACTS: Pact[] = [
  {
    id: "morning-run",
    title: "Morning Run",
    brand: "Nike Run Club",
    category: "Fitness",
    description: "Run 2km every morning before 8 AM. GPS verified.",
    durationDays: 21,
    reward: "₹1,200 Nike voucher",
    rewardValue: 1200,
    color: "from-emerald-700/40 to-emerald-900/40",
    emoji: "🏃",
  },
  {
    id: "read-20",
    title: "Read 20 minutes",
    brand: "Kindle",
    category: "Learning",
    description: "Read for at least 20 minutes a day. Photo verified.",
    durationDays: 30,
    reward: "₹800 Kindle credit",
    rewardValue: 800,
    color: "from-amber-700/30 to-amber-900/40",
    emoji: "📖",
  },
  {
    id: "meditate-10",
    title: "Meditate 10 min",
    brand: "Calm",
    category: "Mindfulness",
    description: "10 minutes of guided meditation each morning.",
    durationDays: 14,
    reward: "3 months Calm Premium",
    rewardValue: 1500,
    color: "from-teal-700/40 to-teal-900/50",
    emoji: "🧘",
  },
  {
    id: "no-sugar",
    title: "No Added Sugar",
    brand: "HealthifyMe",
    category: "Health",
    description: "Avoid added sugar for 21 days. Self check-in.",
    durationDays: 21,
    reward: "₹999 HealthifyMe credit",
    rewardValue: 999,
    color: "from-rose-800/30 to-rose-900/40",
    emoji: "🍎",
  },
  {
    id: "deep-work",
    title: "90 min Deep Work",
    brand: "Notion",
    category: "Deep Work",
    description: "One uninterrupted 90-minute focus session daily.",
    durationDays: 14,
    reward: "Notion Plus 6 months",
    rewardValue: 1800,
    color: "from-stone-700/40 to-stone-900/40",
    emoji: "🎯",
  },
  {
    id: "early-rise",
    title: "Wake at 6 AM",
    brand: "Headspace",
    category: "Morning",
    description: "Check-in by 6:15 AM every morning.",
    durationDays: 30,
    reward: "₹1,500 Amazon voucher",
    rewardValue: 1500,
    color: "from-orange-700/30 to-orange-900/40",
    emoji: "🌅",
  },
];

export const CATEGORIES = ["Fitness", "Mindfulness", "Learning", "Morning", "Health", "Deep Work"];
