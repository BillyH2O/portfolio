import React from 'react'
import Image from 'next/image'
import { SectionTitle } from '../../../ui/SectionTitle'

// Composant pour l'en-tête de la section projets
const ProjectSectionHeader = () => {
  return (
    <div className='relative w-full h-full flex flex-col md:flex-row items-center justify-center'>
      <SectionTitle 
        title="Mes Projets" 
        image="/light-rubix.png" 
        imageOnLeft={true}
        darkImage="/light-rubix.png"
        lightImage="/dark-rubix.png"
      />
      <Image 
        src="/elipse.png" 
        alt="eclipse" 
        width={300} 
        height={160} 
        className='absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[160px] overflow-visible' 
      />
    </div>
  )
}

export default ProjectSectionHeader
