'use client'

import React from 'react'
import { notFound } from 'next/navigation'
import { useProject } from '@/hooks/projects/useProjects'
import { useRouteParams } from '@/hooks/useNavigation'
import ProjectGallery from '@/components/projects/maxi-list/project-gallery'
import {
  ProjectBreadcrumb,
  ProjectHeader,
  ProjectArticle,
  ProjectInfo,
  ProjectDetailErrorState
} from '@/components/projects/detail'
import ProjectNavigationButtons from '@/components/projects/maxi-list/ProjectNavigationButtons'
import { Loader } from '@/components/ui/Loader'
import { Header } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'

// Composant principal
export default function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const slug = useRouteParams(params)
  const { project, loading, error } = useProject(slug)

  if (loading) {
    return (
      <div className="min-h-screen bg-background dark:bg-[url('/bg/dark-background.png')] bg-[url('/bg/light-background.png')] bg-cover bg-center">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <Loader/>
        </div>
      </div>
    )
  }

  if (error || !project) {
    if (error === 'Project not found') {
      notFound()
    }
    return (
      <div className="min-h-screen bg-background dark:bg-[url('/bg/dark-background.png')] bg-[url('/bg/light-background.png')] bg-cover bg-center">
        <Header />
        <div className="container mx-auto px-4 py-20">
          <ProjectDetailErrorState error={error || 'Projet non trouvé'} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background dark:bg-[url('/bg/dark-background.png')] bg-[url('/bg/light-background.png')] bg-cover bg-center">
      <Header />
      <div className="container w-[90%] border-x border-foreground/10 mx-auto px-4 md:px-20 py-40">
        {/* Breadcrumb */}
        <ProjectBreadcrumb projectName={project.name} />

        {/* Header du projet */}
        <ProjectHeader project={project} />

        {/* Galerie d'images */}
        <div className="mb-16">
          <ProjectGallery images={project.images} />
        </div>

        {/* Article détaillé */}
        <ProjectArticle articleHtml={project.articleHtml} />

        {/* Informations supplémentaires */}
        <ProjectInfo project={project} />

        {/* Navigation finale */}
        <div className="mt-16 flex justify-end">
          <ProjectNavigationButtons 
            showBackToProjects={true}
            showBackToHome={true}
            variant="light"
          />
        </div>
      </div>
      <Footer />
    </div>
  )
}
