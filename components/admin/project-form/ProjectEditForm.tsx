import React from 'react'
import Link from 'next/link'
import BasicInformation from './BasicInformation'
import ImageSection from './ImageSection'
import StackTechniqueSection from './StackTechniqueSection'
import CategorySection from './CategorySection'
import ArticleSection from './ArticleSection'
import FormActions from './FormActions'
import ProjectFormHeader from './ProjectFormHeader'
import type { ProjectFormData } from '@/types/Project'
import { useProjectEdit } from '@/hooks/admin/useProjectEdit'
import { Loader } from '@/components/ui/Loader'

interface ProjectEditFormProps {
  slug: string
  onSubmit: (formData: ProjectFormData) => Promise<void>
}

const ProjectEditForm = ({ slug, onSubmit }: ProjectEditFormProps) => {
  const {
    formData,
    setFormData,
    stackTechniques,
    loading,
    saving,
    error,
    handleInputChange,
    handleStackTechniqueToggle,
    addImage,
    removeImage,
    updateImage,
    handleSubmit
  } = useProjectEdit({ slug, onSubmit })

  if (loading) {
    return (
      <div className="px-4 sm:px-0">
        <Loader/>
      </div>
    )
  }

  if (error) {
    return (
      <div className="px-4 sm:px-0">
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <svg className="h-5 w-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
          <div className="mt-4">
            <Link
              href="/admin/projects"
              className="text-sm text-red-600 hover:text-red-500 underline"
            >
              Retour aux projets
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 sm:px-0">
      <ProjectFormHeader
        title="Modifier le projet"
        description="Modifiez les informations, images et technologies du projet"
      />

      <form onSubmit={handleSubmit} className="space-y-8">
        <BasicInformation
          formData={formData}
          onChange={handleInputChange}
        />

        <ImageSection
          formData={formData}
          onAddImage={addImage}
          onRemoveImage={removeImage}
          onUpdateImage={updateImage}
        />

        <StackTechniqueSection
          formData={formData}
          stackTechniques={stackTechniques}
          onToggle={handleStackTechniqueToggle}
        />

        <CategorySection
          formData={formData}
          onCategoriesChange={(categories) => {
            setFormData((prev: ProjectFormData) => ({
              ...prev,
              categories
            }))
          }}
        />

        <ArticleSection
          formData={formData}
          onChange={(content, html) => {
            setFormData((prev) => ({
              ...prev,
              articleContent: content ? JSON.parse(content) : null,
              articleHtml: html
            }))
          }}
        />

        <FormActions 
          loading={saving} 
          submitText="Modifier le projet"
        />
      </form>
    </div>
  )
}

export default ProjectEditForm
