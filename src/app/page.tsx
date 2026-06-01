import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/sections/hero";
import { Authority } from "@/components/sections/authority";
import { Gallery } from "@/components/sections/gallery";
import { Guarantee } from "@/components/sections/guarantee";
import { Process } from "@/components/sections/process";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { SiteFooter } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Authority />
        <Gallery />
        <Guarantee />
        <Process />
        <Pricing />
        <About />
      </main>
      <SiteFooter />
    </>
  );
}
