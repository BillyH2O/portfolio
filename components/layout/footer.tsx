'use client'

import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { useScrollTo } from '@/hooks/useScrollTo'


export const Footer = () => {
  const { scrollToSection} = useScrollTo()

  const handleServiceClick = (service: string) => {
    switch(service) {
      case 'Intelligence Artificielle':
      case 'Programmation':
      case 'Design':
      case 'Autres':
        scrollToSection('competences')
        break
      default:
        break
    }
  }
  return (
    <div className='w-full flex flex-col md:flex-row items-center justify-center text-foreground border-y border-foreground/20'>
        <div className='w-full p-16 flex flex-col gap-4 items-center '>
            <Image src="/avatar.png" alt="logo" width={100} height={100} />
            <p className='text-sm text-center'>© 2025 Billy. Tous droits réservés.</p>
            <Link 
              href="/admin" 
              className='text-xs text-foreground/50 hover:text-foreground/80 transition-colors duration-300 mt-2'
            >
              Administration
            </Link>
        </div>
        <div className='w-full p-16 flex flex-col gap-4 border-y md:border-y-0 md:border-x border-foreground/20 items-center sm:items-start'>
            <h2 className='text-2xl font-semibold mb-4'>Mes services</h2>
            <button 
              onClick={() => handleServiceClick('Intelligence Artificielle')}
              className='text-sm hover:text-primary transition-colors duration-150 cursor-pointer text-left'
            >
              Intelligence Artificielle
            </button>
            <button 
              onClick={() => handleServiceClick('Programmation')}
              className='text-sm hover:text-primary transition-colors duration-150 cursor-pointer text-left'
            >
              Programmation
            </button>
            <button 
              onClick={() => handleServiceClick('Design')}
              className='text-sm hover:text-primary transition-colors duration-150 cursor-pointer text-left'
            >
              Design
            </button>
            <button 
              onClick={() => handleServiceClick('Autres')}
              className='text-sm hover:text-primary transition-colors duration-150 cursor-pointer text-left'
            >
              Autres
            </button>
        </div>
        <div className='w-full p-16 flex flex-col gap-4 items-center sm:items-start'>
            <h2 className='text-2xl font-semibold mb-4'>Contact</h2>
            <Link 
              href="/contact"
              className='text-sm hover:text-primary transition-colors duration-150 cursor-pointer'
            >
              Formulaire de contact
            </Link>
            <p className='text-sm'>Email</p>
            <p className='text-sm'>Phone</p>
            <p className='text-sm'>Address</p>
        </div>
    </div>
  )
}