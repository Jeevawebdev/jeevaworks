export type ChatIntent =
  | "prices"
  | "time"
  | "shop"
  | "clinic"
  | "fix"
  | "tamil"
  | "domain"
  | "pay"
  | "area"
  | "services"
  | "quote"
  | "hello"
  | "whatsapp"
  | "fallback";

const rules: { intent: ChatIntent; keys: string[] }[] = [
  {
    intent: "quote",
    keys: ["quote", "estimate", "start", "want a site", "மேற்கோள்", "தொடங்கு", "வேண்டும்"],
  },
  {
    intent: "prices",
    keys: [
      "price",
      "cost",
      "rate",
      "package",
      "charge",
      "fee",
      "rs",
      "rupee",
      "cheap",
      "விலை",
      "செலவு",
      "பேக்கேஜ்",
      "எவ்வளவு",
    ],
  },
  {
    intent: "time",
    keys: [
      "how long",
      "timeline",
      "days",
      "week",
      "when",
      "duration",
      "fast",
      "நாள்",
      "நேரம்",
      "எத்தனை",
      "எப்போது",
    ],
  },
  {
    intent: "clinic",
    keys: [
      "clinic",
      "hospital",
      "doctor",
      "lab",
      "booking",
      "appointment",
      "கிளினிக்",
      "மருத்துவ",
      "புக்கிங்",
      "லேப்",
    ],
  },
  {
    intent: "shop",
    keys: ["shop", "store", "kirana", "retail", "கடை", "ஸ்டோர்", "கிரானா"],
  },
  {
    intent: "fix",
    keys: [
      "fix",
      "slow",
      "old site",
      "broken",
      "update",
      "existing",
      "சரிசெய்",
      "மெது",
      "பழைய",
    ],
  },
  {
    intent: "tamil",
    keys: ["tamil", "தமிழ்", "language", "மொழி"],
  },
  {
    intent: "domain",
    keys: ["domain", "hosting", "https", "ssl", "vercel", "டொமைன்", "ஹோஸ்ட்"],
  },
  {
    intent: "pay",
    keys: ["pay", "upi", "gpay", "advance", "பணம்", "யுபிஐ", "அட்வான்ஸ்"],
  },
  {
    intent: "area",
    keys: [
      "chennai",
      "area",
      "location",
      "rural",
      "where",
      "town",
      "சென்னை",
      "ஊர்",
      "கிராம",
    ],
  },
  {
    intent: "whatsapp",
    keys: [
      "whatsapp",
      "call",
      "talk",
      "contact",
      "phone",
      "வாட்ஸ்அப்",
      "அழை",
      "தொடர்பு",
    ],
  },
  {
    intent: "hello",
    keys: ["hi", "hello", "hey", "vanakkam", "வணக்கம்", "ஹாய்"],
  },
  {
    intent: "services",
    keys: [
      "service",
      "what do you",
      "build",
      "website",
      "app",
      "சேவை",
      "வலைத்தளம்",
      "ஆப்",
    ],
  },
];

export function matchIntent(text: string): ChatIntent {
  const q = text.trim().toLowerCase();
  if (!q) return "hello";
  for (const rule of rules) {
    if (rule.keys.some((key) => q.includes(key))) return rule.intent;
  }
  return "fallback";
}

export const followUps: Record<ChatIntent, string[]> = {
  prices: ["time", "quote", "whatsapp"],
  time: ["prices", "quote"],
  shop: ["prices", "quote"],
  clinic: ["prices", "quote"],
  fix: ["time", "quote"],
  tamil: ["quote", "whatsapp"],
  domain: ["prices", "quote"],
  pay: ["quote", "whatsapp"],
  area: ["quote", "prices"],
  services: ["shop", "clinic", "fix"],
  quote: ["whatsapp"],
  hello: ["prices", "time", "quote"],
  whatsapp: ["quote"],
  fallback: ["quote", "whatsapp"],
};
