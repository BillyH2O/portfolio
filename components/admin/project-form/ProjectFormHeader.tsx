import React from 'react'
import Link from 'next/link'

interface ProjectFormHeaderProps {
  title: string
  description: string
  backUrl?: string
}

const ProjectFormHeader = ({ 
  title, 
  description, 
  backUrl = "/admin/projects" 
}: ProjectFormHeaderProps) => {
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <Link
          href={backUrl}
          className="text-secondary-foreground hover:text-gray-600 mr-4"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
      </div>
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  )
}

export default ProjectFormHeader
