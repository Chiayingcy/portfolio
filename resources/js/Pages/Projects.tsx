import { HeroScrollDemo } from '@/Components/ui/HeroScrollDemo'
import { MacbookScrollDemo } from '@/Components/ui/MacbookScrollDemo'
import { Spotlight } from '@/Components/ui/Spotlight'
import { TextAnimate } from '@/Components/ui/TextAnimate'
import Layout from '@/Layouts/Layout'
import React from 'react'

const Projects = () => {
    return (
        <div id='projects' className='p-4 max-w-7xl mx-auto relative z-0 w-full pt-10 md:pt-4 bottom-0 space-y-4 h-[80rem] rounded-md overflow-hidden'>
            <TextAnimate
                text="Projects "
                type="popIn"
                className="tracking-widest text-3xl md:text-5xl font-bold text-center" />
            <Spotlight
                className="-top-10 left-0 md:left-[800px] md:top-80" fill="#fff" />
            <HeroScrollDemo />
        </div>
    )
}

export default Projects