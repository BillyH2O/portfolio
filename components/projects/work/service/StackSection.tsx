import { Loader } from '@/components/ui/Loader'
import { useStack } from '@/hooks/projects/useStack'
import { StackTechnique } from '@/types/StackTechnique'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'


const StackSection = () => {
  const { getStackTechniques } = useStack()
  const [stackTechniques, setStackTechniques] = useState<StackTechnique[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStackTechniques = async () => {
      try {
        setLoading(true)
        const data = await getStackTechniques()
        setStackTechniques(data)
      } catch (error) {
        console.error('Error fetching stack techniques:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStackTechniques()
  }, [getStackTechniques])

  if (loading) {
    return (
      <Loader/>
    )
  }

  return (
    <div className="text-center py-20">
      <div className="flex flex-wrap gap-4 md:gap-8 lg:gap-20 items-center justify-center justify-items-start p-6">
        {stackTechniques.map((stackTechnique: StackTechnique) => (
          <div key={stackTechnique.id} className="flex items-center gap-4">
          <div className="bg-blue-300/5 border-foreground/20 hover:border-foreground/30 hover:bg-blue-300/10 backdrop-blur-sm border rounded-full transition-all duration-300 group relative w-12 h-12 flex items-center justify-center">
            <Image src={stackTechnique.icon || ''} alt={stackTechnique.name} width={40} height={40} className='object-contain w-full h-full p-2' />
          </div>
          <h2 className="text-foreground text-lg">{stackTechnique.name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}

export default StackSection
