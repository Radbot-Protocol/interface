import React from "react";
import Image from "next/image";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

const Logo = ({ className, width = 35, height = 35 }: LogoProps) => {
  return (
    <Image
      src="/logo.png"
      alt="logo"
      width={width}
      height={height}
      className={`${className} rounded-full dark:invert`}
    />
  );
};

export default Logo;
