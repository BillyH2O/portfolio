'use client'
import Link from 'next/link'
import { Equal, X } from 'lucide-react'
import { ThemeToggle } from '@/components/ui/ThemeToggle'
import { ContactButton } from '@/components/ui/ContactButton'
import React from 'react'
import { cn } from '@/lib/utils' 
import Image from 'next/image'
import { useScrollTo } from '@/hooks/useScrollTo'

const menuItems = [
    { name: 'Compétences', action: 'scroll', target: 'competences' },
    { name: 'Projets', action: 'navigate', target: '/projects' },
    { name: 'Avis', action: 'scroll', target: 'avis' },
]

export const Header = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)
    const { scrollToSection, navigateToProjects } = useScrollTo()

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const handleMenuClick = (item: typeof menuItems[0]) => {
        if (item.action === 'scroll') {
            scrollToSection(item.target)
        } else if (item.action === 'navigate') {
            navigateToProjects()
        }
        setMenuState(false) // Fermer le menu mobile après clic
    }
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed left-0 w-full z-[9999] px-2">
                <div className={cn('bg-background/35 dark:bg-background/5 rounded-2xl border border-foreground/10 backdrop-blur-lg mx-auto mt-2 max-w-[80%] px-4 transition-all duration-300', isScrolled && 'dark:bg-white/10 lg:max-w-4xl max-w-[80%] rounded-2xl border border-foreground/20 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 lg:gap-0 py-2">
                        <div className="flex w-full justify-between lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex gap-2 items-center">
                                <Image src="/avatar.png" alt="logo" width={40} height={40} />
                             <p className='font-semibold text-xl tracking-tighter text-foreground'>Bilal</p>  
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Equal className="text-foreground in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="text-foreground in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handleMenuClick(item)}
                                            className="text-foreground hover:text-primary block duration-150 cursor-pointer">
                                            <span>{item.name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border-foreground/20 p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-foreground/20 lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <button
                                                onClick={() => handleMenuClick(item)}
                                                className="text-foreground/80 hover:text-blue-100 block duration-150 cursor-pointer">
                                                <span>{item.name}</span>
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col justify-center items-center space-y-3 sm:flex-row sm:gap-2 sm:space-y-0 md:w-fit">
                                <ThemeToggle />
                                <ContactButton rounded={false}>
                                    Contact
                                </ContactButton>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}