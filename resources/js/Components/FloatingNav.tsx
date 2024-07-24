// import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence, useAnimation } from "framer-motion";
// import { Link } from "@inertiajs/react";

// interface NavItem {
//   name: string;
//   link: string;
//   icon?: JSX.Element;
// }

// interface FloatingNavProps {
//   navItems: NavItem[];
//   className?: string;
//   children?: React.ReactNode;
// }

// export const FloatingNav: React.FC<FloatingNavProps> = ({ navItems, className, children }) => {
//   const controls = useAnimation();
//   const [visible, setVisible] = useState(true);


//   useEffect(() => {
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;
//       setVisible(currentScroll < 0.05); // Adjust the scroll threshold as needed
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
//     event.preventDefault(); // Prevent default navigation behavior

//     const targetId = event.currentTarget.getAttribute("href");
//     if (targetId) {
//       const targetElement = document.querySelector(targetId);
//       if (targetElement) {
//         targetElement.scrollIntoView({ behavior: "smooth" });
//       }
//     }
//   };

//   return (
//     <AnimatePresence  mode="wait">
//       {visible && (
//         <motion.div
//           initial={{ opacity: 0, y: -100 }}
//           animate={{ opacity: 1, y: 0 }}
//           exit={{ opacity: 0, y: -100 }}
//           transition={{ duration: 0.2 }}
//           className={`flex max-w-fit fixed top-8 inset-x-0 mx-auto border border-gray-200 dark:border-gray-600 rounded-2xl dark:bg-slate-800 backdrop-blur-md bg-white shadow-md z-50 px-9 py-5 items-center justify-center space-x-8 ${className}`}
//           style={{ background: 'var(--floatingnav-bg)', color: 'var(--floatingnav-text)' }}
//         >
//           {navItems.map((navItem, idx) => (
//             <Link
//               key={`link-${idx}`}
//               href={navItem.link}
//               onClick={handleClick}
//               className="relative flex items-center space-x-1 text-gray-800 font-semibold dark:text-gray-300 hover:text-gray-500"
//               style={{ color: 'var(--floatingnav-text)' }}
//             >
//               <span className="block sm:hidden">{navItem.icon}</span>
//               <span className="hidden sm:block text-md">{navItem.name}</span>
//             </Link>
//           ))}
//           {children}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };







import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation, useScroll, useMotionValueEvent } from "framer-motion";
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
  const controls = useAnimation();
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Check if current is not undefined and is a number
    if (typeof current === "number") {
      let direction = current! - scrollYProgress.getPrevious()!;

      console.log(direction)
      if (direction < 0) {
        setVisible(true);
        console.log('set true');
      } else {
        setVisible(false);
        console.log('set false');
      }

      // if (scrollYProgress.get() < 0.05) {
      //   setVisible(false);
      //   console.log('set false');
      // } else {
      //   if (direction < 0) {
      //     setVisible(true);
      //     console.log('set true');
      //   } else {
      //     setVisible(false);
      //     console.log('set false');
      //   }
      // }
    }
  });


  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    event.preventDefault(); // Prevent default navigation behavior

    const targetId = event.currentTarget.getAttribute("href");
    if (targetId) {
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // return (
  //   <div className="text-white h-10 bg-red-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptates iste amet.</div>
  // );


  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        // animate={{ opacity: 1, y: 0 }}
        // exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className={`flex max-w-fit absolute top-8 inset-x-0 z-50 mx-auto border border-gray-200 dark:border-gray-600 rounded-2xl dark:bg-slate-800 backdrop-blur-md bg-white shadow-md px-9 py-5 items-center justify-center space-x-8 ${className}`}
        style={{ background: 'var(--floatingnav-bg)', color: 'var(--floatingnav-text)' }}
      >
        {navItems.map((navItem, idx) => (
          <Link
            key={`link-${idx}`}
            href={navItem.link}
            onClick={handleClick}
            className="relative flex items-center space-x-1 text-gray-800 font-semibold dark:text-gray-300 hover:text-gray-500"
            style={{ color: 'var(--floatingnav-text)' }}
          >
            {navItem.name}
            {/* <span className="block sm:hidden">{navItem.icon}</span>
            <span className="hidden sm:block text-md">{navItem.name}</span> */}
          </Link>
        ))}
        {children}
      </motion.div>
    </AnimatePresence>
  );

};



