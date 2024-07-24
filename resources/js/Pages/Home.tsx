import ToggleTheme from '@/Components/ToggleTheme'
import { NAVITEMS } from '@/lib/utils'
import React, { useEffect, useState } from 'react'
import Hero from './Hero'
import About from './About'
import Projects from './Projects'
import Footer from './Footer'
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"
import { Head } from '@inertiajs/react'
import Layout from '@/Layouts/Layout'
import { FloatingNav } from '@/Components/FloatingNav'
import { Testt } from '@/Components/ui/Testt'
import { IconHome, IconMessage, IconUser } from '@tabler/icons-react'


const Home = () => {

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: (
        <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />
      ),
    },
  ];


  const [currentSection, setCurrentSection] = useState('Home');

  useEffect(() => {
    const sectionIds = ['home', 'about', 'projects', 'contact'];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id.charAt(0).toUpperCase() + entry.target.id.slice(1));
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the section is visible
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);


  return (
    <Layout title={currentSection}>
      <main className="min-h-screen flex flex-col items-center">
        <div className="relative w-full md:block hidden">
        <FloatingNav navItems={NAVITEMS}>
          <ToggleTheme /> 
        </FloatingNav>
        </div>
        {/* <Testt navItems={navItems}>
          <ToggleTheme/>
        </Testt> */}

        <Hero />
        <About />
        <Projects />
        <Footer />
      </main>
    </Layout>

  )
}


export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}><Home /></NextThemesProvider>
}


export default ThemeProvider;