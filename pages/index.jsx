import {
  Header,
  Hero,
  About,
  Expertise,
  Package,
  Tracks,
  Clips,
  Studio,
  StudioLife,
  Artists,
  Contact,
  // Faqs, // FAQ section hidden for now
  Footer,
  WarddChatbot,
} from "@/components/index";
import TargetCursor from "@/components/ui/TargetCursor";
import { getTracks } from "@/lib/spotify";
import { getVideos } from "@/lib/youtube";
import { TRACK_IDS, OVERRIDES } from "@/data/tracks";
import { CLIP_IDS, OVERRIDES as CLIP_OVERRIDES } from "@/data/clips";

// Runs on the server at build time (and refreshes every 12h): fetches title,
// artist and cover for each release, and title + channel for each clip, so the
// page can render its own player UI.
export async function getStaticProps() {
  const [tracks, clips] = await Promise.all([
    getTracks(TRACK_IDS, OVERRIDES),
    getVideos(CLIP_IDS, CLIP_OVERRIDES),
  ]);
  return { props: { tracks, clips }, revalidate: 60 * 60 * 12 };
}

export default function Home({ tracks, clips }) {
  
  return (
    <>
      <TargetCursor />
      <Header />
      <Hero />
      <main>
        <About />
        <Expertise />
        <Studio />
        <Package />
        <Tracks tracks={tracks} />
        <Clips clips={clips} />
        <StudioLife />
        <Artists />
        {/* <Faqs /> */}
        <Contact />
      </main>
      <Footer />
      <WarddChatbot />
    </>
  );
}
