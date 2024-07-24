"use client";
import React from "react";
import Image from "./Image";
import { ContainerScroll } from "./ContainerScrollAnimation";

export function HeroScrollDemo() {
  return (
    <div className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <>
            <h1 className="text-4xl font-semibold">
              Previous Projects in <br />
              <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                GitHub
              </span>
            </h1>
          </>
        }
      >
        <Image
          src={`/build/assets/Images/mac.png`}
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-center"
          draggable={false}
        />
      </ContainerScroll>
    </div>
  );
}
