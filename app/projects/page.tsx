'use client'

import React from 'react'
import { useProjects } from '@/hooks/projects/useProjects'
import {ProjectsGrid} from '@/components/projects/maxi-list'
import ProjectNavigationButtons from '@/components/projects/maxi-list/ProjectNavigationButtons'

import ProjectsErrorState from '@/components/projects/maxi-list/state/ProjectsErrorState'
import ProjectsEmptyState from '@/components/projects/maxi-list/state/ProjectsEmptyState'
import { Loader } from '@/components/ui/Loader'
import { Header } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { SectionTitle } from '@/components/ui/SectionTitle'

// Composant principal
export default function ProjectsPage() {
  const { projects, loading, error } = useProjects()

  return (
    <div className="w-full min-h-screen dark:bg-[url('/bg/dark-background.png')] bg-[url('/bg/light-background.png')] bg-cover bg-center relative">
      <Header />
      <div className="relative flex flex-col items-center justify-center w-[95%] sm:w-[90%] border-x border-foreground/10 mx-auto gap-16 px-4 md:px-10 xl:px-20 py-40">
        <SectionTitle 
          title="Mes Projets" 
          image="/light-rubix.png" 
          imageSize='small' 
          imageOnLeft={true}
          darkImage="/light-rubix.png"
          lightImage="/dark-rubix.png"
        />
        {/* Contenu principal */}
        {loading && <Loader/>}
        {error && <ProjectsErrorState error={error} />}
        {!loading && !error && projects.length === 0 && <ProjectsEmptyState />}
        {!loading && !error && projects.length > 0 && <ProjectsGrid projects={projects} />}

        <div className="text-center">
          <ProjectNavigationButtons 
            showBackToHome={true}
            variant="light"
          />
        </div>
      </div>

      <div className='w-[95%] sm:w-[90%] mx-auto border-x border-foreground/10'>
        <Footer />
      </div>
    </div>
  )
}
