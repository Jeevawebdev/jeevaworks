"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "en" | "ta";

const copy = {
  en: {
    nav: {
      services: "Services",
      how: "How it works",
      packages: "Packages",
      about: "About",
      contact: "Contact",
      quote: "Quick quote",
      call: "Call",
      whatsapp: "WhatsApp",
    },
    hero: {
      greeting: "Vanakkam · Based in Chennai, Tamil Nadu",
      body: "Simple websites and apps that help shops, clinics, and local businesses get found, get trusted, and get more customers.",
      ctaWhatsapp: "Message on WhatsApp",
      ctaPackages: "See packages",
      serving: "Serving Chennai · suburbs · rural Tamil Nadu",
      role: "Your local web & app partner",
    },
    services: {
      eyebrow: "What I build",
      title: "Digital presence that feels local — not corporate jargon.",
      body: "I explain everything in plain language. You get a site your customers understand on a phone, in Tamil Nadu network conditions.",
      items: [
        {
          title: "Business website",
          body: "A clean site for your shop, clinic, school, or service — so customers find you on Google and trust you before they call.",
        },
        {
          title: "WhatsApp-ready pages",
          body: "One-tap enquiry buttons, price lists, and location maps. Built for how people in Chennai and nearby towns actually enquire.",
        },
        {
          title: "Booking & enquiry apps",
          body: "Simple booking forms, order requests, and admin panels so you stop losing leads buried in chat scrolls.",
        },
        {
          title: "Fix & improve existing site",
          body: "Slow, outdated, or hard to update? I refresh speed, mobile view, and contact flow without starting from zero.",
        },
      ],
    },
    packages: {
      eyebrow: "Transparent packages",
      title: "Know the starting price before you message.",
      body: "Final quote depends on pages and features — but you will never get a surprise bill. Rural and first-time website owners are welcome.",
      ask: "Ask about this package",
      items: [
        {
          name: "Starter site",
          note: "Best for small shops & services",
          features: [
            "3–5 page mobile-first website",
            "WhatsApp & call buttons",
            "Google Maps location",
            "Basic Google-friendly setup",
            "1 round of revisions",
          ],
        },
        {
          name: "Business site",
          note: "Most chosen by local businesses",
          features: [
            "Up to 8 pages + gallery / menu",
            "Enquiry form + WhatsApp flow",
            "Faster loading & SEO basics",
            "Domain connect help + HTTPS",
            "2 revision rounds + 15-day support",
          ],
        },
        {
          name: "Custom app",
          note: "Booking, orders, dashboards",
          features: [
            "Custom screens for your workflow",
            "Admin panel for you / staff",
            "Secure login where needed",
            "Hosting guidance on Vercel / cloud",
            "Scoped after a free discovery chat",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's talk about your business online.",
      body: "Prefer WhatsApp? Most clients do. Fill the short form and it opens a ready message — or call me directly.",
      phone: "Phone / WhatsApp",
      email: "Email",
      based: "Based in",
      name: "Your name",
      business: "Business name",
      place: "Area / town",
      need: "What do you need?",
      submit: "Continue on WhatsApp",
      hint: "Opens WhatsApp with your details filled in. No spam.",
      namePh: "e.g. Ramesh",
      businessPh: "e.g. Sri Krishna Stores",
      placePh: "e.g. Tambaram / Villupuram",
      needs: [
        "Business website",
        "WhatsApp-ready landing page",
        "Booking / enquiry app",
        "Fix my existing website",
        "Not sure — need advice",
      ],
      formMsg: (name: string, business: string, place: string, need: string) =>
        [
          `Hi Jeeva, this is ${name || "a client"}.`,
          business ? `Business: ${business}.` : "",
          place ? `Location: ${place}.` : "",
          `I need: ${need}.`,
          "Saw you on jeevaworks.in.",
        ]
          .filter(Boolean)
          .join(" "),
    },
    quotes: {
      eyebrow: "Quick quote",
      title: "Tell me what you need — one tap to WhatsApp.",
      body: "No forms. No waiting. Open a ready message and talk to me directly.",
      items: [
        {
          id: "shop",
          label: "Shop website",
          desc: "Kirana, retail, local store",
          message:
            "Hi Jeeva, I need a website for my shop. Saw you on jeevaworks.in.",
        },
        {
          id: "clinic",
          label: "Clinic booking",
          desc: "Clinic, lab, appointments",
          message:
            "Hi Jeeva, I need a clinic booking / enquiry website. Saw you on jeevaworks.in.",
        },
        {
          id: "fix",
          label: "Fix my site",
          desc: "Slow, old, or broken site",
          message:
            "Hi Jeeva, I need help fixing / improving my existing website. Saw you on jeevaworks.in.",
        },
      ],
    },
  },
  ta: {
    nav: {
      services: "சேவைகள்",
      how: "எப்படி?",
      packages: "பேக்கேஜ்",
      about: "என்னைப் பற்றி",
      contact: "தொடர்பு",
      quote: "விரைவு மேற்கோள்",
      call: "அழைக்க",
      whatsapp: "வாட்ஸ்அப்",
    },
    hero: {
      greeting: "வணக்கம் · சென்னை, தமிழ்நாடு",
      body: "கடைகள், கிளினிக்குகள் மற்றும் உள்ளூர் வணிகங்களுக்கு வாடிக்கையாளர்களை ஈர்க்க உதவும் எளிய வலைத்தளங்களும் ஆப்ஸும்.",
      ctaWhatsapp: "வாட்ஸ்அப்பில் அனுப்பு",
      ctaPackages: "பேக்கேஜ் பார்க்க",
      serving: "சென்னை · புறநகர் · கிராமப்புற தமிழ்நாடு",
      role: "உங்கள் உள்ளூர் வலை & ஆப் பார்ட்னர்",
    },
    services: {
      eyebrow: "நான் உருவாக்குவது",
      title: "உள்ளூர் உணர்வுள்ள டிஜிட்டல் முகவரி — கடினமான டெக் மொழி இல்லை.",
      body: "எல்லாம் எளிய மொழியில் விளக்குவேன். வாடிக்கையாளர்கள் மொபைலில் எளிதாக புரிந்துகொள்ளும் வலைத்தளம் கிடைக்கும்.",
      items: [
        {
          title: "வணிக வலைத்தளம்",
          body: "உங்கள் கடை, கிளினிக், பள்ளி அல்லது சேவைக்கு சுத்தமான வலைத்தளம் — கூகுளில் கண்டுபிடித்து, அழைப்பதற்கு முன் நம்பிக்கை வரும்.",
        },
        {
          title: "வாட்ஸ்அப் தயார் பக்கங்கள்",
          body: "ஒரு டேப்பில் விசாரணை, விலை பட்டியல், மேப்ஸ். சென்னை மற்றும் அருகிலுள்ள ஊர்களில் மக்கள் கேட்கும் விதத்திற்கு ஏற்ப.",
        },
        {
          title: "புக்கிங் & விசாரணை ஆப்ஸ்",
          body: "புக்கிங் படிவங்கள், ஆர்டர் கோரிக்கைகள், அட்மின் பேனல் — சாட்ஸில் தொலைந்த லீட்களை நிறுத்த.",
        },
        {
          title: "இருக்கும் சைட்டை சரிசெய்",
          body: "மெதுவா? பழையதா? புதுப்பிக்க கடினமா? வேகம், மொபைல் வியூ, தொடர்பு பகுதியை மேம்படுத்துவேன்.",
        },
      ],
    },
    packages: {
      eyebrow: "தெளிவான பேக்கேஜ்",
      title: "செய்தி அனுப்புவதற்கு முன் விலையை தெரிந்துகொள்ளுங்கள்.",
      body: "பக்கங்கள் மற்றும் அம்சங்களைப் பொறுத்து இறுதி விலை மாறும் — ஆனால் எதிர்பாராத பில் வராது. முதல் முறை வலைத்தளம் வாங்குபவர்களும் வரவேற்கப்படுகிறீர்கள்.",
      ask: "இந்த பேக்கேஜ் பற்றி கேள்",
      items: [
        {
          name: "ஸ்டார்டர் சைட்",
          note: "சிறிய கடைகள் & சேவைகளுக்கு ஏற்றது",
          features: [
            "3–5 பக்கம் மொபைல்-முதல் வலைத்தளம்",
            "வாட்ஸ்அப் & அழைப்பு பட்டன்கள்",
            "கூகுள் மேப்ஸ் இருப்பிடம்",
            "அடிப்படை கூகுள் தயார் அமைப்பு",
            "1 முறை திருத்தம்",
          ],
        },
        {
          name: "பிசினஸ் சைட்",
          note: "உள்ளூர் வணிகங்கள் அதிகம் தேர்வு செய்வது",
          features: [
            "8 பக்கம் வரை + கேலரி / மெனு",
            "விசாரணை படிவம் + வாட்ஸ்அப்",
            "வேகமான ஏற்றம் & SEO அடிப்படை",
            "டொமைன் இணைப்பு + HTTPS உதவி",
            "2 திருத்தம் + 15 நாள் ஆதரவு",
          ],
        },
        {
          name: "கஸ்டம் ஆப்",
          note: "புக்கிங், ஆர்டர், டாஷ்போர்டு",
          features: [
            "உங்கள் வேலைக்கு ஏற்ற திரைகள்",
            "உங்களுக்கான அட்மின் பேனல்",
            "தேவைப்பட்டால் பாதுகாப்பான லாகின்",
            "Vercel / கிளவுட் ஹோஸ்டிங் வழிகாட்டல்",
            "இலவச அறிமுக அரட்டைக்குப் பிறகு திட்டம்",
          ],
        },
      ],
    },
    contact: {
      eyebrow: "தொடர்பு",
      title: "உங்கள் வணிகத்தை ஆன்லைனில் கொண்டுவர பேசுவோம்.",
      body: "வாட்ஸ்அப் விருப்பமா? பெரும்பாலானவர்கள் அப்படித்தான். சிறிய படிவத்தை நிரப்பினால் தயார் செய்தி திறக்கும் — அல்லது நேரடியாக அழையுங்கள்.",
      phone: "போன் / வாட்ஸ்அப்",
      email: "மின்னஞ்சல்",
      based: "இருப்பிடம்",
      name: "உங்கள் பெயர்",
      business: "வணிக பெயர்",
      place: "பகுதி / ஊர்",
      need: "உங்களுக்கு என்ன வேண்டும்?",
      submit: "வாட்ஸ்அப்பில் தொடரவும்",
      hint: "உங்கள் விவரங்களுடன் வாட்ஸ்அப் திறக்கும். ஸ்பாம் இல்லை.",
      namePh: "எ.கா. ரமேஷ்",
      businessPh: "எ.கா. ஸ்ரீ கிருஷ்ணா ஸ்டோர்ஸ்",
      placePh: "எ.கா. தாம்பரம் / விழுப்புரம்",
      needs: [
        "வணிக வலைத்தளம்",
        "வாட்ஸ்அப் தயார் பக்கம்",
        "புக்கிங் / விசாரணை ஆப்",
        "இருக்கும் சைட்டை சரிசெய்",
        "தெரியவில்லை — ஆலோசனை வேண்டும்",
      ],
      formMsg: (name: string, business: string, place: string, need: string) =>
        [
          `வணக்கம் ஜீவா, நான் ${name || "ஒரு வாடிக்கையாளர்"}.`,
          business ? `வணிகம்: ${business}.` : "",
          place ? `இடம்: ${place}.` : "",
          `எனக்கு வேண்டும்: ${need}.`,
          "jeevaworks.in இல் பார்த்தேன்.",
        ]
          .filter(Boolean)
          .join(" "),
    },
    quotes: {
      eyebrow: "விரைவு மேற்கோள்",
      title: "என்ன வேண்டும் என்று சொல்லுங்கள் — ஒரு டேப்பில் வாட்ஸ்அப்.",
      body: "படிவம் இல்லை. காத்திருப்பு இல்லை. தயார் செய்தியுடன் நேரடியாக பேசுங்கள்.",
      items: [
        {
          id: "shop",
          label: "கடை வலைத்தளம்",
          desc: "கிரானா, சில்லறை, உள்ளூர் கடை",
          message:
            "வணக்கம் ஜீவா, என் கடைக்கு வலைத்தளம் வேண்டும். jeevaworks.in இல் பார்த்தேன்.",
        },
        {
          id: "clinic",
          label: "கிளினிக் புக்கிங்",
          desc: "கிளினிக், லேப், அப்பாயிண்ட்மென்ட்",
          message:
            "வணக்கம் ஜீவா, கிளினிக் புக்கிங் / விசாரணை வலைத்தளம் வேண்டும். jeevaworks.in இல் பார்த்தேன்.",
        },
        {
          id: "fix",
          label: "சைட் சரிசெய்",
          desc: "மெதுவான / பழைய / பழுதான சைட்",
          message:
            "வணக்கம் ஜீவா, இருக்கும் வலைத்தளத்தை சரிசெய்ய / மேம்படுத்த உதவி வேண்டும். jeevaworks.in இல் பார்த்தேன்.",
        },
      ],
    },
  },
};

type Dictionary = {
  nav: {
    services: string;
    how: string;
    packages: string;
    about: string;
    contact: string;
    quote: string;
    call: string;
    whatsapp: string;
  };
  hero: {
    greeting: string;
    body: string;
    ctaWhatsapp: string;
    ctaPackages: string;
    serving: string;
    role: string;
  };
  services: {
    eyebrow: string;
    title: string;
    body: string;
    items: { title: string; body: string }[];
  };
  packages: {
    eyebrow: string;
    title: string;
    body: string;
    ask: string;
    items: { name: string; note: string; features: string[] }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    body: string;
    phone: string;
    email: string;
    based: string;
    name: string;
    business: string;
    place: string;
    need: string;
    submit: string;
    hint: string;
    namePh: string;
    businessPh: string;
    placePh: string;
    needs: string[];
    formMsg: (
      name: string,
      business: string,
      place: string,
      need: string,
    ) => string;
  };
  quotes: {
    eyebrow: string;
    title: string;
    body: string;
    items: { id: string; label: string; desc: string; message: string }[];
  };
};

const dictionaries: Record<Lang, Dictionary> = copy;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
  isTa: boolean;
};

const LangContext = createContext<LangContextValue | null>(null);

const STORAGE_KEY = "jw-lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Lang | null;
    if (saved === "en" || saved === "ta") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "ta" ? "ta" : "en";
    document.documentElement.dataset.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      t: dictionaries[lang],
      isTa: lang === "ta",
    }),
    [lang, setLang],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
