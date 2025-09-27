import React from 'react'

interface ActionButtonProps {
  onClick: () => void
  children: React.ReactNode
  icon: React.ReactNode
  iconPosition?: 'left' | 'right'
  variant?: 'default' | 'light'
  colorMode?: 'white' | 'blue' | 'green'
  className?: string
}

const ActionButton = ({ 
  onClick, 
  children, 
  icon, 
  iconPosition = 'left',
  variant = 'default',
  colorMode = 'white',
  className = '' 
}: ActionButtonProps) => {
  const baseClasses = "flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium cursor-pointer flex-shrink-0"
  
  const variantClasses = {
    default: colorMode === 'white' 
      ? "bg-white/10 border border-foreground/20 text-foreground hover:text-gray-200 hover:bg-white/20"
      : colorMode === 'blue'
      ? "bg-blue-600/20 border border-blue-500/30 text-blue-500 hover:text-blue-700 hover:bg-blue-600/30"
      : "bg-green-600/20 border border-green-500/30 text-green-500 hover:text-green-300 hover:bg-green-600/30",
    light: "bg-white/10 border border-foreground/20 text-foreground hover:text-gray-200 hover:bg-white/20"
  }

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`

  return (
    <button onClick={onClick} className={buttonClasses}>
      {iconPosition === 'left' && icon}
      <span>{children}</span>
      {iconPosition === 'right' && icon}
    </button>
  )
}

export default ActionButton