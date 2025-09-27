"use client"

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { ContactButton } from '@/components/ui/ContactButton'

export default function HeroSection() {
  const { theme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const currentTheme = resolvedTheme ?? theme
  // Par défaut on montre la vidéo sombre pour éviter le flash blanc
  const videoSrc = mounted && currentTheme === 'light' ? '/light-background.mp4' : '/background.mp4'

  return (
    <main className="relative w-full h-full flex-1 flex flex-col items-center justify-center gap-10 text-center text-primary">
      {/* Background Video */}
      <video 
        key={videoSrc} 
        autoPlay 
        muted 
        loop 
        playsInline
        className="absolute top-0 left-0 w-full  h-full object-cover z-0 overflow-visible"
        src={videoSrc}
      >
        Your browser does not support the video tag.
      </video>
      
      {/* Dark overlay for better text readability */}
      <div className="absolute top-0 left-0 w-full h-full object-cover bg-black/10 z-10 overflow-visible"></div>
      
      {/* Content */}
      <div className=" w-[95%] sm:w-[90%] h-full py-72 border-x border-foreground/10 relative z-20 flex flex-col items-center justify-center gap-10">
        <div className="border border-foreground/10 bg-white/5 rounded-full px-4 py-2 text-primary text-sm">
        Ingénieur IA & développeur full-stack  
        </div>
        <h1 className="drop-shadow-lg text-white text-center text-4xl sm:text-6xl max-w-[90%]  font-semibold tracking-tighter md:text-[clamp(2rem,8vw,7rem)]"> Vous avez une idée ? <br /> Je la code pour vous </h1>
        <p className="text-xl md:text-2xl text-white/90 drop-shadow-md max-w-[90%] sm:max-w-[70%] lg:max-w-[800px] text-center px-4">
        Passionné par les nouvelles technologies, je développe des intelligence artificielles et des applications web modernes.  
        </p>
        <div className="flex flex-col md:flex-row gap-4">
        <button className="border border-foreground/10 bg-white/5 hover:bg-white/20 rounded-full px-4 py-2 cursor-pointer">
            Découvrir mes projets
        </button>
        <ContactButton rounded={true} className='bg-white hover:bg-white/5 text-black'>
            Contactez-moi
        </ContactButton>
        </div>
      </div>
    </main>
  )
}
