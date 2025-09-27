import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

// Types
interface ProjectCardProps {
  title: string
  description: string
  image: string
  slug?: string
  onClick?: () => void
}

// Composant pour l'image du projet
const ProjectImage = ({ src, alt, title }: { src: string; alt: string; title: string }) => (
  <Image 
    src={src} 
    alt={alt || title} 
    width={200} 
    height={180} 
    className="rounded-4xl w-48 h-40 object-cover transition-transform duration-300 hover:saturate-150"
  />
)

// Composant pour le titre du projet
const ProjectTitle = ({ title }: { title: string }) => (
  <div className="text-lg text-foreground text-left group-hover:text-blue-400 transition-colors"> 
    {title}
  </div>
)

// Composant pour la description du projet
const ProjectDescription = ({ description }: { description: string }) => (
  <div className="text-sm text-foreground overflow-hidden" style={{
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    textOverflow: 'ellipsis'
  }}> 
    {description}
  </div>
)

// Composant pour l'indicateur de navigation
const NavigationIndicator = ({ hasNavigation }: { hasNavigation: boolean }) => {
  if (!hasNavigation) return null

  return (
    <div className="flex items-center text-blue-400 group-hover:text-blue-300 transition-colors text-xs mt-auto">
      <span>Voir plus</span>
      <svg className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  )
}

// Composant principal pour le contenu de la card
const CardContent = ({ title, description, image, hasNavigation }: ProjectCardProps & { hasNavigation: boolean }) => (
  <div className="bg-card border-foreground/20 hover:border-foreground/30 hover:bg-blue-300/10 flex flex-col items-start justify-start gap-3 w-56 h-80 p-4 border rounded-4xl cursor-pointer transition-all duration-300 group">
    <ProjectImage src={image} alt={title} title={title} />
    <ProjectTitle title={title} />
    <ProjectDescription description={description} />
    <NavigationIndicator hasNavigation={hasNavigation} />
  </div>
)

// Composant principal ProjectCard
const ProjectCard = ({ title, description, image, slug, onClick }: ProjectCardProps) => {
  // Logique de navigation intégrée directement dans le composant
  const hasNavigation = Boolean(slug || onClick)

  // Si on a un slug, utiliser Link pour la navigation
  if (slug) {
    return (
      <Link href={`/projects/${slug}`} className="block">
        <CardContent 
          title={title}
          description={description}
          image={image}
          hasNavigation={hasNavigation}
        />
      </Link>
    )
  }

  // Sinon, utiliser onClick si fourni
  if (onClick) {
    return (
      <div onClick={onClick}>
        <CardContent 
          title={title}
          description={description}
          image={image}
          hasNavigation={hasNavigation}
        />
      </div>
    )
  }

  // Par défaut, juste afficher la card
  return (
    <CardContent 
      title={title}
      description={description}
      image={image}
      hasNavigation={hasNavigation}
    />
  )
}

export default ProjectCard