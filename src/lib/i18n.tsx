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
    chat: {
      open: "Chat",
      close: "Close",
      title: "JeevaWorks help",
      subtitle: "Usually replies instantly · then WhatsApp",
      online: "Online now",
      nudge: "Need a price? Ask here.",
      greeting:
        "Vanakkam — I am Jeeva’s helper. Prices, days, shop or clinic sites — tap below, type, or start a quote I can send to WhatsApp.",
      placeholder: "Ask price, days, shop, clinic…",
      send: "Send",
      whatsapp: "Send this on WhatsApp",
      typing: "Typing",
      chips: [
        { id: "quote", label: "Get a quote" },
        { id: "prices", label: "Prices" },
        { id: "time", label: "How long?" },
        { id: "shop", label: "Shop website" },
        { id: "clinic", label: "Clinic booking" },
        { id: "fix", label: "Fix my site" },
      ],
      follow: {
        prices: "Prices",
        time: "How long?",
        shop: "Shop site",
        clinic: "Clinic",
        fix: "Fix site",
        quote: "Get a quote",
        whatsapp: "WhatsApp Jeeva",
      },
      replies: {
        prices:
          "Starter ₹8,999 · Business ₹14,999 · Custom app from ₹24,999. Small shops usually start with Starter. No surprise bill.",
        time: "Simple site: about 5–7 days after we talk. I share a phone preview first, then we go live on your domain.",
        shop: "Shop sites include photos, WhatsApp button, map, and your area. Starter from ₹8,999 is enough for most stores.",
        clinic:
          "Clinic / lab sites: call + WhatsApp + booking or enquiry form. Most clinics pick Business ₹14,999.",
        fix: "I can speed up, make it mobile-friendly, and add WhatsApp — without rebuilding from zero. Quote after a quick look.",
        tamil:
          "Yes. Tamil or English on the site, and you can talk to Jeeva in both. This chat follows your EN / தமிழ் toggle.",
        domain:
          "I help connect jeevaworks-style hosting on Vercel (free) and your domain with HTTPS. Domain is bought separately.",
        pay: "UPI / GPay is fine. Small advance to start, rest when the site is ready. Clear before we begin.",
        area: "Based in Chennai. Suburbs and rural Tamil Nadu welcome — Tambaram, Sriperumbudur, nearby towns too.",
        services:
          "Business websites, WhatsApp pages, booking apps, and fixing old sites. Built for phone use in Tamil Nadu.",
        hello:
          "Vanakkam. Tap Get a quote, ask a price, or type in English or Tamil.",
        fallback:
          "I don’t have that answer here. Start a quote or WhatsApp Jeeva — he replies in English or Tamil.",
        whatsapp:
          "WhatsApp opens with your notes. Jeeva reads it and replies with a clear next step.",
        quote:
          "Let’s make a short note for Jeeva. What is your business?",
      },
      flow: {
        bizPrompt: "What is your business?",
        biz: [
          { id: "shop", label: "Shop / store" },
          { id: "clinic", label: "Clinic / lab" },
          { id: "school", label: "School / tuition" },
          { id: "other", label: "Other" },
        ],
        placePrompt: "Which area or town?",
        needPrompt: "What do you need?",
        needs: [
          { id: "website", label: "New website" },
          { id: "booking", label: "Booking / enquiry" },
          { id: "fix", label: "Fix existing site" },
        ],
        ready: "Ready. I can send this to Jeeva on WhatsApp.",
        wa: (biz: string, place: string, need: string) =>
          [
            "Hi Jeeva, quote from jeevaworks.in chat.",
            `Business: ${biz}.`,
            place ? `Place: ${place}.` : "",
            `Need: ${need}.`,
            "Please share a starting price.",
          ]
            .filter(Boolean)
            .join(" "),
      },
      waMessage:
        "Hi Jeeva, I was chatting on jeevaworks.in and want to talk about a website / app.",
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
    chat: {
      open: "அரட்டை",
      close: "மூடு",
      title: "JeevaWorks உதவி",
      subtitle: "உடனடி பதில் · பிறகு வாட்ஸ்அப்",
      online: "இப்போது ஆன்லைன்",
      nudge: "விலை வேண்டுமா? இங்கே கேளுங்கள்.",
      greeting:
        "வணக்கம் — நான் ஜீவாவின் உதவியாளர். விலை, நாட்கள், கடை அல்லது கிளினிக் சைட் — கீழே அழுத்தவும், எழுதவும், அல்லது வாட்ஸ்அப்பிற்கு மேற்கோள் தயார் செய்யலாம்.",
      placeholder: "விலை, நாள், கடை, கிளினிக்…",
      send: "அனுப்பு",
      whatsapp: "வாட்ஸ்அப்பில் அனுப்பு",
      typing: "எழுதுகிறேன்",
      chips: [
        { id: "quote", label: "மேற்கோள் பெறு" },
        { id: "prices", label: "விலை" },
        { id: "time", label: "எத்தனை நாள்?" },
        { id: "shop", label: "கடை வலைத்தளம்" },
        { id: "clinic", label: "கிளினிக் புக்கிங்" },
        { id: "fix", label: "சைட் சரிசெய்" },
      ],
      follow: {
        prices: "விலை",
        time: "எத்தனை நாள்?",
        shop: "கடை",
        clinic: "கிளினிக்",
        fix: "சரிசெய்",
        quote: "மேற்கோள்",
        whatsapp: "வாட்ஸ்அப்",
      },
      replies: {
        prices:
          "ஸ்டார்டர் ₹8,999 · பிசினஸ் ₹14,999 · கஸ்டம் ஆப் ₹24,999 முதல். சிறிய கடைகளுக்கு ஸ்டார்டர் போதும். எதிர்பாராத பில் இல்லை.",
        time: "எளிய சைட்: பேசி முடித்த பிறகு சுமார் 5–7 நாள். முதலில் மொபைல் ப்ரிவியூ, பிறகு உங்கள் டொமைனில் லைவ்.",
        shop: "கடை சைட்: புகைப்படம், வாட்ஸ்அப் பட்டன், மேப், உங்கள் ஊர். பெரும்பாலும் ஸ்டார்டர் ₹8,999 போதும்.",
        clinic:
          "கிளினிக் / லேப்: அழைப்பு + வாட்ஸ்அப் + புக்கிங் படிவம். பெரும்பாலும் பிசினஸ் ₹14,999.",
        fix: "வேகம், மொபைல், வாட்ஸ்அப் சேர்க்கலாம் — முழுவதும் புதிதாக கட்ட வேண்டாம். பார்த்து விலை சொல்வேன்.",
        tamil:
          "ஆம். சைட்டில் தமிழ் அல்லது ஆங்கிலம். ஜீவா இரு மொழியிலும் பேசுவார். இந்த அரட்டை EN / தமிழ் சுவிச்சை பின்பற்றும்.",
        domain:
          "Vercel இல் இலவச ஹோஸ்டிங் + உங்கள் டொமைன் + HTTPS உதவி செய்வேன். டொமைன் தனியாக வாங்க வேண்டும்.",
        pay: "UPI / GPay சரி. தொடங்க சிறிய அட்வான்ஸ், சைட் தயார் ஆனதும் மீதி. தொடங்குவதற்கு முன் தெளிவு.",
        area: "சென்னை. புறநகர், கிராமப்புற தமிழ்நாடு — தாம்பரம், ஸ்ரீபெரும்புதூர், அருகில் உள்ள ஊர்களும் வரவேற்கப்படுகின்றன.",
        services:
          "வணிக வலைத்தளம், வாட்ஸ்அப் பக்கம், புக்கிங் ஆப், பழைய சைட் சரிசெய்தல். தமிழ்நாட்டு மொபைலுக்கு ஏற்ப.",
        hello:
          "வணக்கம். மேற்கோள் பெறு என்று அழுத்தவும், விலை கேட்கவும், அல்லது தமிழ் / ஆங்கிலத்தில் எழுதவும்.",
        fallback:
          "இங்கே அந்த பதில் இல்லை. மேற்கோள் தொடங்கவும் அல்லது ஜீவாவை வாட்ஸ்அப்பில் கேளுங்கள்.",
        whatsapp:
          "வாட்ஸ்அப் உங்கள் குறிப்புடன் திறக்கும். ஜீவா படித்து அடுத்த அடியை தெளிவாக சொல்வார்.",
        quote: "ஜீவாவிற்கு ஒரு சிறிய குறிப்பு தயார் செய்வோம். உங்கள் வணிகம் என்ன?",
      },
      flow: {
        bizPrompt: "உங்கள் வணிகம் என்ன?",
        biz: [
          { id: "shop", label: "கடை" },
          { id: "clinic", label: "கிளினிக் / லேப்" },
          { id: "school", label: "பள்ளி / டியூஷன்" },
          { id: "other", label: "மற்றவை" },
        ],
        placePrompt: "எந்த பகுதி / ஊர்?",
        needPrompt: "உங்களுக்கு என்ன வேண்டும்?",
        needs: [
          { id: "website", label: "புதிய வலைத்தளம்" },
          { id: "booking", label: "புக்கிங் / விசாரணை" },
          { id: "fix", label: "இருக்கும் சைட் சரிசெய்" },
        ],
        ready: "தயார். இதை ஜீவாவிற்கு வாட்ஸ்அப்பில் அனுப்பலாம்.",
        wa: (biz: string, place: string, need: string) =>
          [
            "வணக்கம் ஜீவா, jeevaworks.in அரட்டையில் இருந்து மேற்கோள்.",
            `வணிகம்: ${biz}.`,
            place ? `இடம்: ${place}.` : "",
            `தேவை: ${need}.`,
            "தொடக்க விலை சொல்லுங்கள்.",
          ]
            .filter(Boolean)
            .join(" "),
      },
      waMessage:
        "வணக்கம் ஜீவா, jeevaworks.in அரட்டையில் இருந்து வலைத்தளம் / ஆப் பற்றி பேச விரும்புகிறேன்.",
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
  chat: {
    open: string;
    close: string;
    title: string;
    subtitle: string;
    online: string;
    nudge: string;
    greeting: string;
    placeholder: string;
    send: string;
    whatsapp: string;
    typing: string;
    chips: { id: string; label: string }[];
    follow: Record<string, string>;
    replies: {
      prices: string;
      time: string;
      shop: string;
      clinic: string;
      fix: string;
      tamil: string;
      domain: string;
      pay: string;
      area: string;
      services: string;
      hello: string;
      fallback: string;
      whatsapp: string;
      quote: string;
    };
    flow: {
      bizPrompt: string;
      biz: { id: string; label: string }[];
      placePrompt: string;
      needPrompt: string;
      needs: { id: string; label: string }[];
      ready: string;
      wa: (biz: string, place: string, need: string) => string;
    };
    waMessage: string;
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
