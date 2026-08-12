import { MotionProvider } from "@/components/motion";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ForWhom } from "@/components/ForWhom";
import { VisualStory } from "@/components/VisualStory";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Packages } from "@/components/Packages";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";

export default function Home() {
  return (
    <MotionProvider>
      <Header />
      <main className="flex-1">
        <Hero />
        <ForWhom />
        <VisualStory />
        <Services />
        <HowItWorks />
        <Packages />
        <About />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFab />
    </MotionProvider>
  );
}
