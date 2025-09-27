
'use client'

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/navbar";
import HeroSection from "@/components/layout/HeroSection";
import ProjectSection from "@/components/layout/ProjectSection";
import { TestimonialSection } from "@/components/layout/TestimonalSection";
import { useScrollTo } from "@/hooks/useScrollTo";

export default function Home() {
  // Initialiser le hook pour gérer les hash URLs
  useScrollTo()
  return (
    <div className="min-h-screen flex flex-col items-center">
      {/* Section Hero avec Header - Vidéo en pleine largeur */}
      <div id="accueil" className="w-full min-h-screen relative">
        <div className="w-full h-[100vh] border-x border-foreground/10 relative z-10">
          <Header />
          <HeroSection />    
        </div>
      </div>

      <div className="w-full min-h-screen dark:bg-[url('/bg/dark-background.png')] bg-[url('/bg/light-background.png')] bg-cover bg-center relative">
        <div className="w-[95%] sm:w-[90%] mx-auto min-h-screen border-x border-foreground/10 relative z-0">
          <div id="competences">
            <ProjectSection />
          </div>
          <div id="avis">
            <TestimonialSection />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
