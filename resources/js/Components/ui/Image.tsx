import React from 'react';

interface ImageProps {
  src: string;
  alt: string;
  height?: number;
  width?: number;
  fill?: boolean;
  className?: string;
  draggable: boolean
}

const Image: React.FC<ImageProps> = ({ src, alt, height, width, fill, className, draggable }) => {
  return (
    <img
      src={src}
      alt={alt}
      height={height}
      width={width}
      className={`${fill ? 'absolute inset-0 h-full w-full' : ''} ${className || ''}`}
      draggable= {draggable}
    />
  );
};

export default Image;