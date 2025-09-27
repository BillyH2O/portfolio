import { Button } from '@/components/ui/moving-border'
import Image from 'next/image'
import React from 'react'

type Props = {
    label: string
    image: string,
    image_shine: string,
    description: string
    color: string
    onClick: () => void
}

export const CategoryCard = ({ label, image, image_shine, description, color, onClick }: Props) => {
  return (
    <div className='flex flex-col items-center gap-10'>
      {/* Image Container */}
      <div className='relative w-[300px] md:w-[360px] xl:w-[400px] h-[300px] md:h-[360px] xl:h-[400px] overflow-visible'>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full saturate-200' style={{
          animation: 'spin 8s linear infinite'
        }}>
          <div className='w-full h-full' style={{
            animation: '3s ease-in infinite'
          }}>
            <Image src={image_shine} alt="Category 1" width={1000} height={1000} className='w-full h-full scale-200 saturate-200 overflow-visible object-contain
                pointer-events-none mix-blend-screen opacity-60 blur-3xl' />
          </div>
        </div>
        <Image src={image} alt="Category 1" width={500} height={500} className='absolute top-0 left-0 w-full h-full object-cover' />
        <div className='flex flex-col gap-2 lg:gap-4 items-center w-full absolute bottom-0 p-4'>
            <div className='text-white text-xl md:text-2xl lg:text-3xl font-semibold'>{label}</div>
            <div className={`text-white/85 text-sm md:text-lg lg:text-xl text-center`}>{description}</div>
        </div>
      </div>
      
      {/* Button Outside */}
      <Button
        borderRadius="1.75rem"
        className="bg-foreground/5 border border-foreground/10 text-foreground"
        gradientColor={`#${color}`}
        onClick={onClick}
      >
        Explorez
      </Button>
    </div>
  )
}
