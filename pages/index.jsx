import {
  Header,
  Hero,
  About,
  Expertise,
  Package,
  Tracks,
  Clips,
  StudioLife,
  Artists,
  Testimonial,
  Team,
  Contact,
  Faqs,
  Footer,
  WarddChatbot,
} from "@/components/index";
import TargetCursor from "@/components/ui/TargetCursor";

export default function Home() {
  return (
    <>
      <TargetCursor />
      <Header />
      <Hero />
      <main>
        <About />
        <Expertise />
        <Package />
        <Tracks />
        <Clips />
        <StudioLife />
        <Artists />
        <Testimonial />
        <Team />
        <Contact />
        <Faqs />
      </main>
      <Footer />
      <WarddChatbot />
    </>
  );
}