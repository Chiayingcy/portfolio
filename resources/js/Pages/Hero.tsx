import { Spotlight } from '@/Components/ui/Spotlight';
import { TextAnimate } from '@/Components/ui/TextAnimate';
import Layout from '@/Layouts/Layout';
import { motion } from 'framer-motion';
import React from 'react'

const Hero = () => {
  return (
    <div className="h-[40rem] w-full rounded-md relative overflow-hidden" id='home'>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center" />
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20" fill="#ffffff" />
      <div className="p-4 max-w-7xl mx-auto relative z-0 w-full pt-10 md:pt-4 top-40 space-y-4">
        <TextAnimate
          text="Hey there I'm Chia Ying "
          type="popIn"
          className="tracking-wider text-3xl md:text-5xl font-bold text-center" />
        <motion.div
          className="h-20 w-1 bg-gray-400"
          variants={{
            hidden: { scale: 0 },
            visible: {
              scale: 1,
              transition: { staggerChildren: 0.05, delayChildren: 0.2 },
            },
          }}
          initial="hidden"
          animate="visible"
        />
        <TextAnimate
          text="A Junior Full Stack Developer with a passion for Front-End Development"
          type="popIn"
          className="tracking-wider text-xl font-bold text-left hidden md:block" />
        <TextAnimate
          text="and strong interest in Economics and Trading"
          type="popIn"
          className="tracking-wider text-xl font-bold text-left hidden md:block" />
      </div>
    </div >
  );
}

export default Hero;
