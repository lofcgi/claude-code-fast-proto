import { auth } from "@/auth";
import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/sections/hero";
import { LogoCarousel } from "@/components/sections/logo-carousel";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Features } from "@/components/sections/features";
import { Languages } from "@/components/sections/languages";
import { Stats } from "@/components/sections/stats";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Footer } from "@/components/sections/footer";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Navbar user={session?.user} />
      <main>
        <HeroSection />
        <LogoCarousel />
        <HowItWorks />
        <Features />
        <Languages />
        <Stats />
        <Testimonials />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
