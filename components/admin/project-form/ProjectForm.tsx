import React from 'react'
import BasicInformation from './BasicInformation'
import ImageSection from './ImageSection'
import StackTechniqueSection from './StackTechniqueSection'
import CategorySection from './CategorySection'
import ArticleSection from './ArticleSection'
import FormActions from './FormActions'
import ProjectFormHeader from './ProjectFormHeader'
import { useProjectForm } from '../../../hooks/admin/useProjectForm'
import type { ProjectFormData } from '@/types/Project'

interface ProjectFormProps {
  title: string
  description: string
  initialData?: Partial<ProjectFormData>
  onSubmit: (formData: ProjectFormData) => Promise<void>
  backUrl?: string
}

const ProjectForm = ({
  title,
  description,
  initialData,
  onSubmit,
  backUrl
}: ProjectFormProps) => {
  const {
    formData,
    setFormData,
    stackTechniques,
    loading,
    handleInputChange,
    handleStackTechniqueToggle,
    addImage,
    removeImage,
    updateImage,
    handleSubmit
  } = useProjectForm({ 
    initialData, 
    onSubmit 
  })

  return (
    <div className="px-4 sm:px-0">
      <ProjectFormHeader
        title={title}
        description={description}
        backUrl={backUrl}
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
            setFormData(prev => ({
              ...prev,
              categories
            }))
          }}
        />

        <ArticleSection
          formData={formData}
          onChange={(content, html) => {
            setFormData(prev => ({
              ...prev,
              articleContent: content ? JSON.parse(content) : null,
              articleHtml: html
            }))
          }}
        />

        <FormActions 
          loading={loading} 
          onCancel={backUrl}
        />
      </form>
    </div>
  )
}

export default ProjectForm
