import React from 'react'
import Image from 'next/image'
import { ProjectImage } from '@/types/Project'

interface ProjectCardImageProps {
  image?: ProjectImage
  projectName?: string
}
// Composant pour l'image du projet
const ProjectCardImage = ({ image, projectName }: ProjectCardImageProps) => {
  if (!image) return null

  return (
    <div className="relative w-full h-full overflow-hidden">
      <Image
        src={image.url}
        alt={image.alt || `Image du projet ${projectName || ''}`}
        fill
        className="object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
    </div>
  )
}

export default ProjectCardImage
