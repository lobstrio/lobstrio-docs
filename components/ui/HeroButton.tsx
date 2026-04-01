"use client";

import Image from "next/image";

interface HeroButtonProps {
  label: string;
  href: string;
  outline?: boolean;
  external?: boolean;
  width?: string;
  height?: string;
  fontSize?: string;
}

export default function HeroButton({
  label,
  href,
  outline = false,
  external = false,
  width = "w-fit",
  height = "h-[50px]",
  fontSize = "text-[18px]",
}: HeroButtonProps) {
  const baseClass = `inline-flex items-center justify-center gap-4 rounded-lg font-semibold whitespace-nowrap transition-colors ${fontSize} ${width} ${height} pl-[26px] pr-[23px]`;

  const variantClass = outline
    ? "bg-transparent text-[#FF0000] border border-[#FF0000] hover:bg-[#FF0000] hover:text-white"
    : "bg-[#FF0000] text-white hover:bg-[#CC0000]";

  return (
    <a
      href={href}
      className={`${baseClass} ${variantClass}`}
{...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{label}</span>
      <Image
        src="/images/vector-arrow-btn.svg"
        alt=""
        width={8}
        height={9}
        className={outline ? "[filter:invert(27%)_sepia(100%)_saturate(7000%)_hue-rotate(0deg)_brightness(90%)]" : ""}
        aria-hidden
      />
    </a>
  );
}
