"use client"

import React from 'react'
import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

type Props = {
    title: string
    image: string
    imageWidth?: number
    imageHeight?: number
    imageOnLeft?: boolean
    reverseOnMobile?: boolean
    imageSize?: 'normal' | 'small'
    // Nouvelles props pour le mode sombre
    darkImage?: string
    lightImage?: string
}

export const SectionTitle = ({title, image, imageOnLeft = true, reverseOnMobile = false, imageSize = 'normal', darkImage, lightImage}: Props) => {
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  
  // Éviter l'hydratation mismatch
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Déterminer l'image à utiliser selon le thème
  const getImageSrc = () => {
    if (!mounted) return image // Image par défaut pendant le chargement
    
    // Si darkImage et lightImage sont fournis, les utiliser selon le thème
    if (darkImage && lightImage) {
      // Utiliser resolvedTheme pour obtenir le thème effectif lorsque l'option "system" est sélectionnée
      const currentTheme = resolvedTheme ?? theme
      
      // Debug temporaire - REGARDEZ LA CONSOLE DE VOTRE NAVIGATEUR
      console.log('🔍 DEBUG THEME:', {
        theme,
        resolvedTheme,
        currentTheme,
        darkImage,
        lightImage,
        'Image sélectionnée': currentTheme === 'dark' ? darkImage : lightImage
      })

      return currentTheme === 'dark' ? darkImage : lightImage
    }
    
    // Sinon, utiliser l'image par défaut
    return image
  }
  
  // Définir les classes selon la logique voulue
  let flexClasses = "";
  
  if (imageOnLeft && reverseOnMobile) {
    // Image à gauche normalement, mais inversé sur mobile
    flexClasses = "flex-col-reverse md:flex-row";
  } else if (imageOnLeft && !reverseOnMobile) {
    // Image à gauche normalement
    flexClasses = "flex-col md:flex-row";
  } else if (!imageOnLeft && reverseOnMobile) {
    // Image à droite normalement, mais inversé sur mobile  
    flexClasses = "flex-col md:flex-row-reverse";
  } else {
    // Image à droite normalement
    flexClasses = "flex-col-reverse md:flex-row-reverse";
  }
  
  return (
    <div className={`flex ${flexClasses} items-center justify-center md:gap-0 mb-20`}>
      {/* Toujours dans le même ordre dans le JSX */}
      <Image 
        src={getImageSrc()} 
        alt="Cube" 
        width={300} 
        height={300} 
        className={imageSize === 'small' ? 'w-[150px] h-[150px] saturate-200' : 'w-[150px] h-[150px] md:w-[250px] md:h-[250px] saturate-200 contrast-more:'} 
      />
      <div className="md:text-4xl text-2xl font-bold text-foreground -mt-6 md:mt-0 text-center">{title}</div>
    </div>
  )
}