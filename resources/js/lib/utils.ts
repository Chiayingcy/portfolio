import { NavItems, Skills } from "@/types";
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const NAVITEMS: NavItems[] = [
  {
      name: "Home",
      link: "#home",
  },
  {
      name: "About",
      link: "#about",
  },
  {
      name: "Projects",
      link: "#projects",
  },
  {
      name: "Contact",
      link: "#contact",
  },
];

export const skills = [
  {
    quote: '',
    name: '',
    title: 'HTML',
    icon: '/build/assets/Images/html.png'
  },
  {
    quote: '',
    name: '',
    title: 'CSS',
    icon: '/build/assets/Images/css.png'
  },
  {
    quote: '',
    name: '',
    title: 'JavaScript',
    icon: '/build/assets/Images/js.png'
  },
  {
    quote: '',
    name: '',
    title: 'jQuery',
    icon: '/build/assets/Images/jquery.png'
  },
  {
    quote: '',
    name: '',
    title: 'React',
    icon: '/build/assets/Images/react.png'
  },
  {
    quote: '',
    name: '',
    title: 'Typescript',
    icon: '/build/assets/Images/typescript.png'
  },
  {
    quote: '',
    name: '',
    title: 'Laravel',
    icon: '/build/assets/Images/laravel.svg'
  },
];
