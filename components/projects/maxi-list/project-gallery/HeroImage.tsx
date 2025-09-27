import React from 'react'
import Image from 'next/image'
import { ProjectImage } from '@/types/Project'

const HeroImage = ({ image }: { image: ProjectImage }) => (
  <div className="relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden">
    <Image
      src={image.url}
      alt={image.alt}
      fill
      className="object-cover"
      priority
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
  </div>
)

export default HeroImage
