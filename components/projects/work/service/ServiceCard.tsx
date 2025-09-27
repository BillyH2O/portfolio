import React from 'react'
import Image from 'next/image'

interface ServiceCardProps {
  title: string
  bio: string
  image: string
}

const ServiceCard = ({ title, bio, image }: ServiceCardProps) => {
  return (
    <div className="bg-card border-foreground/20 hover:border-foreground/30 hover:bg-blue-300/10 backdrop-blur-sm border rounded-2xl p-6 transition-all duration-300 group relative w-full">
      {/* Titre du service */}
      <h3 className="text-xl font-bold text-foreground mb-3 transition-colors">
        {title}
      </h3>

      {/* Description du service */}
      <p className="text-secondary text-sm leading-relaxed mb-4 w-[80%]">
        {bio}
      </p>

      {/* Icône Service */}
      <Image src={image} alt={title} width={40} height={20} className='w-12 md:w-16 lg:w-20 absolute bottom-0 right-0' />
    </div>
  )
}

export default ServiceCard
