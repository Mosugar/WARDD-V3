import { Preloader, Header, Hero, About, Contact, Tracks, Clips, StudioLife, Artists, Team, Testimonial, Package, Services, Faqs, Footer, WarddChatbot, BeatsShowcase } from "@/components/index";

export default function Home() {
  return (
    <>
      {/* <Preloader /> */}
      <Header />
      <Hero />
      <main>
        <About />
        <Package />
        {/* <Tracks /> */}
        <Clips />
        <StudioLife />
        <Artists />
        <Testimonial />
        <Team />
        {/* <BeatsShowcase/> */}
        <Contact />
        <Faqs />
      </main>
      <Footer />
      <WarddChatbot />
    </>
  );
}