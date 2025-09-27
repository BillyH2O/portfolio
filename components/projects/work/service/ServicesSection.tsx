import React from 'react'
import { servicesData } from '@/app/data'
import ServiceCard from './ServiceCard'

interface ServicesSectionProps {
  activeCategory: string
}

const ServicesSection = ({ activeCategory }: ServicesSectionProps) => {

  // Récupérer les services pour la catégorie active
  const services = servicesData[activeCategory as keyof typeof servicesData] || []

  return (
    <div className="py-12">
      {/* Grille des services */}
      <div className="flex flex-wrap gap-4 md:gap-6 lg:gap-9 items-center justify-center justify-items-start">
        {services.map((service) => {
          // Utiliser la carte appropriée selon le type
            return (
              <ServiceCard
                key={service.id}
                title={service.title}
                bio={service.bio}
                image={service.image}
              />
            )
        })}
      </div>

      {/* Message si text-foreground service */}
      {services.length === 0 && (
        <div className="text-center py-20">
          <div className="text-secondary-foreground mb-4">
            <svg className="w-16 h-16 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">Aucun service disponible</h3>
          <p className="text-secondary-foreground">Les services pour cette catégorie seront bientôt disponibles.</p>
        </div>
      )}
    </div>
  )
}

export default ServicesSection
