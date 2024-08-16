import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Link } from "@inertiajs/react";

interface NavItem {
  name: string;
  link: string;
  icon?: JSX.Element;
}

interface FloatingNavProps {
  navItems: NavItem[];
  className?: string;
  children?: React.ReactNode;
}

export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className, children }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);
  const [shouldHide, setShouldHide] = useState(false);

  const SCROLL_THRESHOLD = 0.01;
  const MIN_SCROLL_POSITION = 100; // pixels

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (shouldHide) {
      timeoutId = setTimeout(() => setVisible(true), 300); // 300ms delay
    } else {
      setVisible(false);
    }
    return () => clearTimeout(timeoutId);
  }, [shouldHide]);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let scrollPosition = window.scrollY;
      let direction = current - scrollYProgress.getPrevious()!;

      if (scrollPosition > MIN_SCROLL_POSITION && Math.abs(direction) > SCROLL_THRESHOLD) {
        setShouldHide(direction > 0);
      } else if (scrollPosition <= MIN_SCROLL_POSITION) {
        setShouldHide(true);
      }
    }
  });

  // const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   event.preventDefault();
  //   const targetId = event.currentTarget.getAttribute("href");
  //   if (targetId) {
  //     const targetElement = document.querySelector(targetId);
  //     if (targetElement) {
  //       targetElement.scrollIntoView({ behavior: "smooth" });
  //     }
  //   }
  // };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{ duration: 0.5 }}
        className={`flex max-w-fit fixed top-8 inset-x-0 z-50 mx-auto border border-gray-200 dark:border-gray-600 rounded-2xl dark:bg-slate-800 backdrop-blur-md bg-white shadow-md px-9 py-5 items-center justify-center space-x-8 ${className}`}
        style={{ background: 'var(--floatingnav-bg)', color: 'var(--floatingnav-text)' }}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            className="relative flex items-center space-x-1 text-gray-800 font-semibold dark:text-gray-300 hover:text-gray-500"
            style={{ color: 'var(--floatingnav-text)' }}
          >
            {navItem.name}
          </Link>
        ))}
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
