import React from 'react'
import Image from 'next/image'
import { ProjectImage } from '@/types/Project'

const GalleryImageItem = ({ image }: { image: ProjectImage }) => (
  <div className="relative aspect-video rounded-lg overflow-hidden group">
    <Image
      src={image.url}
      alt={image.alt}
      fill
      className="object-cover group-hover:scale-110 transition-transform duration-300"
    />
    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
  </div>
)

export default GalleryImageItem
