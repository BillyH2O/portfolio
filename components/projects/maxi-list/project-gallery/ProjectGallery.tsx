import React from 'react'
import { ProjectImage } from '@/types/Project'
import HeroImage from './HeroImage'
import GalleryImageItem from './GalleryImageItem'

const ProjectGallery = ({ images }: { images: ProjectImage[] }) => {
  // Logique simple pour organiser les images
  const heroImage = images.find(img => img.type === 'HERO')
  const galleryImages = images.filter(img => 
    img.type === 'GALLERY' || img.type === 'SCREENSHOT' || img.type === 'MOCKUP'
  )

  return (
    <div className="space-y-8">
      {/* Image principale (Hero) */}
      {heroImage && <HeroImage image={heroImage} />}

      {/* Galerie d'images */}
      {galleryImages.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <GalleryImageItem key={image.id} image={image} />
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectGallery
