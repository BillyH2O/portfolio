import React from 'react'

export type SectionType = 'projects' | 'services' | 'stack-technique'

interface SectionButtonsProps {
  activeSection: SectionType
  setActiveSection: (section: SectionType) => void
}

const SectionButtons = ({ activeSection, setActiveSection }: SectionButtonsProps) => {
  const sections = [
    { 
      id: 'projects' as SectionType, 
      label: 'Projets', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    { 
      id: 'services' as SectionType, 
      label: 'Services', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z" />
        </svg>
      )
    },
    { 
      id: 'stack-technique' as SectionType, 
      label: 'Technologies', 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
    }
  ]

  return (
    <div className="flex gap-1 overflow-x-auto lg:overflow-x-visible">
      {sections.map(section => (
        <button
          key={section.id}
          onClick={() => setActiveSection(section.id)}
          className={`flex items-center gap-1 lg:gap-3 px-3 lg:px-4 py-2 lg:py-3 rounded-xl transition-all duration-200 text-xs lg:text-sm w-full lg:w-full justify-start relative cursor-pointer whitespace-nowrap ${
            activeSection === section.id
              ? 'bg-background/20 text-foreground border-l-2 lg:border-l-4 border-blue-500/80'
              : 'text-secondary hover:bg-white/10 hover:text-foreground hover:border-l-2 lg:hover:border-l-4 hover:border-foreground/40'
          }`}
        >
          <div className="flex-shrink-0">
            {section.icon}
          </div>
          <span className="font-medium">{section.label}</span>
        </button>
      ))}
    </div>
  )
}

export default SectionButtons