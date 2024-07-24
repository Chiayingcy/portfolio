import { InfiniteMovingCards } from '@/Components/ui/InfiniteMovingCards'
import { Button } from '@/Components/ui/MovingBorder'
import { TextAnimate } from '@/Components/ui/TextAnimate'
import Layout from '@/Layouts/Layout'
import { skills } from '@/lib/utils'
import React from 'react'

const About = () => {
    return (
        <div id='about' className='p-4 max-w-7xl mx-auto relative z-0 w-full pt-10 md:pt-4 bottom-10 space-y-4 h-[40rem] rounded-md overflow-hidden'>
            <TextAnimate
                text="About "
                type="popIn"
                className="tracking-widest text-3xl md:text-5xl font-bold text-center" />
            <p className='text-justify text-balance leading-relaxed pb-4'>
                Hello! I graduated at 2023 from INTI International College Penang with a <span className='text-indigo-200'>Bachelor's Degree in Computer Science</span> in collaboration with Coventry University.
                During work hours, I am <span className='text-indigo-200'>deeply focused on coding and my tasks</span>. After work, I enjoy trading currencies and commodities during my favorite hours, ensuring a healthy work-life balance!
            </p>

            <div className='flex items-center'>
                <Button
                    borderRadius="1.75rem"
                    className=''>

                    <TextAnimate
                        text="Skills "
                        type="popIn"
                        className="tracking-widest text-2xl md:text-xl font-bold text-center" />
                    <img src='/build/assets/Images/programming.png' className='w-8 h-8' />
                </Button>

            </div>

            <div className="rounded-md flex flex-col bg-[#bac9e971] items-center justify-center relative overflow-hidden">
                <InfiniteMovingCards
                    items={skills}
                    direction="right"
                    speed="slow" />
            </div>
        </div>
    )
}

export default About