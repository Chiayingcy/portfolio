import MagicButton from "@/Components/ui/MagicButton";
import Layout from "@/Layouts/Layout";
import React from "react";

const Footer = () => {
  return (
    <div id='contact' className='p-4 max-w-7xl mx-auto relative z-0 w-full pt-10 md:pt-4 bottom-0 space-y-4 h-[40rem] rounded-md overflow-hidden'>
      <div
        className="absolute pointer-events-none inset-0 flex items-center justify-center
        [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"
      />
      <div className="flex flex-col items-center w-full max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-bold text-wrap text-center">Ready to talk and take it to the next level?</h1>
        <p className="mt-12 text-gray-300 text-lg">
          Reach out to me today and let's discuss on how I can help to achieve
          your goals.
        </p>
        <MagicButton
          title="Contact Me"
          position="left" />
      </div>
    </div>
  );
};

export default Footer;
