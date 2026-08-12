export const site = {
  brand: "JeevaWorks",
  name: "Jeeva C",
  tagline: "Websites & apps for Chennai businesses",
  phone: "+91 9344539265",
  phoneHref: "tel:+919344539265",
  whatsapp: "919344539265",
  email: "jeevawebdev1@gmail.com",
  linkedin: "https://linkedin.com/in/jeevawebd",
  domain: "jeevaworks.in",
  location: "Chennai, Tamil Nadu",
  serving: "Chennai · suburbs · rural Tamil Nadu",
} as const;

export const whatsappLink = (text?: string) => {
  const msg =
    text ??
    "Hi Jeeva, I saw jeevaworks.in — I need a website / app for my business.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`;
};
