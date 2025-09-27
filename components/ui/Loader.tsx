import React from 'react'

type Props = {
  message? : string
}

export const Loader = ({message} : Props) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        <p className="text-foreground">{message || 'Chargement ...'}</p>
    </div>
  )
}