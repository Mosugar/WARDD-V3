import { Preloader, Header, Hero, About, Contact, Tracks, Clips, StudioLife, Artists, Team, Testimonial, Package, Services, Faqs, Footer } from "@/components/index";

export default function Home() {
  return (
    <>
      {/* <Preloader /> */}
      <Header />
      <Hero />
      <main>
        <About />
        {/* <Services /> */}
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
    </>
  );
}