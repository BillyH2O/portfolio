"use client"

import React from 'react'
import { useProjectSection } from '@/hooks/projects/useProjectSection'
import CategoryButtons from '../projects/work/mini-list/CategoryButtons'
import SectionButtons from '../projects/work/button/SectionButtons'
import ProjectGrid from '../projects/work/mini-list'
import ProjectSectionFooter from '../projects/work/layout/ProjectSectionFooter'
import ProjectSectionErrorState from '../projects/work/layout/ProjectSectionErrorState'
import { ServicesSection, StackSection } from '../projects/work/service'
import { SectionTitle } from '../ui/SectionTitle'
import ActionButton from '@/components/ui/ActionButton'
import { ArrowLeftIcon } from '@/components/ui/icons'
import Image from 'next/image'
import SubCategorySelector from '../projects/work/button/SubCategorySelector'
import { Loader } from '../ui/Loader'

// Composant principal refactorisé
export default function ProjectSection() {
  const {
    projects,
    categories,
    loading,
    error,
    activeCategory,
    setActiveCategory,
    activeSubCategory,
    setActiveSubCategory,
        activeSection,
        setActiveSection,
        getSubCategoryCount
      } = useProjectSection()

  // États de chargement et d'erreur
  if (loading) {
    return (
    <>
    <div className='relative w-full py-40 h-full flex flex-col md:flex-row items-center justify-center'>
            <SectionTitle  
              title="Mes Expertises" 
              image="/light-rubix.png" 
              imageOnLeft={true}
              darkImage="/light-rubix.png"
              lightImage="/dark-rubix.png"
            />
            <Image src="/elipse.png" alt="eclipse" width={300} height={160} className='absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[160px]' />
    </div>
    <Loader />
    </>
  )
  }

  if (error) {
    return <ProjectSectionErrorState error={error} />
  }

  // Interface principale
  return (  
    <div className='w-full py-40 border-b border-foreground/10 overflow-hidden'>
      {activeCategory === "" ? (
        <div className='flex flex-col items-center justify-center'>
          <div className='relative w-full h-full flex flex-col md:flex-row items-center justify-center'>
            <SectionTitle 
              title="Mes Expertises" 
              image="/light-rubix.png" 
              imageOnLeft={true}
              darkImage="/light-rubix.png"
              lightImage="/dark-rubix.png"
            />
            <Image src="/elipse.png" alt="eclipse" width={300} height={160} className='absolute top-1/2 left-[60%] transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[160px]' />
          </div>
          <CategoryButtons 
            setActiveCategory={setActiveCategory} 
            categories={categories}
          />
        </div>
      ) : (
        <div className='w-[95%] lg:w-[90%] mx-auto flex flex-col gap-4 lg:gap-6'>
          {/* Header avec titre centré */}
          <div className='flex items-center justify-center w-full mb-4'>
            <SectionTitle 
              title="Mes Expertises" 
              image="/light-rubix.png" 
              imageOnLeft={true}
              darkImage="/light-rubix.png"
              lightImage="/dark-rubix.png"
            />
          </div>

          {/* Top Bar avec Navigation et Actions */}
          <div className="p-2 lg:p-4">
            <div className="flex flex-col xl:flex-row items-center justify-between gap-4 lg:gap-6">
              {/* Boutons de navigation - Gauche */}
              <div className="flex items-center border border-foreground/20 p-1 rounded-3xl">
                <SectionButtons 
                  activeSection={activeSection}
                  setActiveSection={setActiveSection}
                />
              </div>
              
              {/* Groupe Filtre + Actions - Droite */}
              <div className="flex items-center justify-center flex-wrap gap-2 lg:gap-3 ">
                {/* Titre de section pour les non-projets */}
                {activeSection !== 'projects' && (
                  <div className="text-sm font-medium text-secondary-foreground mr-4">
                    Section: {activeSection === 'services' ? 'Services' : 'Technologies'}
                  </div>
                )}
                
                {/* Filtre pour les projets */}
                {activeSection === 'projects' && (
                  <SubCategorySelector
                    activeCategory={activeCategory}
                    activeSubCategory={activeSubCategory}
                    setActiveSubCategory={setActiveSubCategory}
                    categories={categories}
                    getSubCategoryCount={getSubCategoryCount}
                  />
                )}
                
                {/* Boutons d'action */}
                <ProjectSectionFooter />
                <ActionButton
                  onClick={() => setActiveCategory("")}
                  icon={<ArrowLeftIcon />}
                  iconPosition="left"
                  variant="default"
                  colorMode="blue"
                >
                  Retour
                </ActionButton>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="min-h-[500px]">
            {activeSection === 'projects' && (
              <ProjectGrid
                projects={projects}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            )}

            {activeSection === 'services' && (
              <ServicesSection activeCategory={activeCategory} />
            )}

            {activeSection === 'stack-technique' && (
              <StackSection/>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
