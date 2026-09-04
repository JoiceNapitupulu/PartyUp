"use client";

import React from "react";

export default function PixelButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  disabled = false,
}) {
  const baseStyles =
    "font-pixel text-[10px] md:text-[11px] px-4 py-2.5 border-4 font-bold select-none cursor-pointer pixel-shadow pixel-btn-active inline-flex items-center justify-center text-center gap-2 focus:outline-none transition-all duration-100 uppercase tracking-wider relative overflow-hidden rounded-sm";

  // Varian Warna & Efek Pendaran Neon Retro
  const themeStyles = {
    primary:
      "bg-retro-black text-pixel-green border-retro-black hover:bg-neutral-900 hover:border-pixel-green shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_12px_rgba(0,255,0,0.5)]",
    secondary:
      "bg-retro-light-gray text-retro-black border-retro-black hover:bg-white hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    navy:
      "bg-navy-blue text-white border-retro-black hover:bg-navy-light shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_12px_rgba(56,189,248,0.5)]",
    green:
      "bg-pixel-green text-retro-black border-retro-black hover:bg-pixel-green-dark shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_14px_rgba(34,197,94,0.6)]",
    gold:
      "bg-yellow-400 text-retro-black border-retro-black hover:bg-yellow-300 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[0_0_14px_rgba(250,204,21,0.6)]",
    danger:
      "bg-red-600 text-white border-retro-black hover:bg-red-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    disabled:
      "bg-retro-gray text-retro-dark-gray border-retro-dark-gray cursor-not-allowed shadow-none active:translate-y-0 active:translate-x-0 opacity-50",
  };

  const selectedTheme = disabled
    ? themeStyles.disabled
    : themeStyles[variant] || themeStyles.primary;

  return (
    <button
      type={type}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedTheme} ${className}`}
      suppressHydrationWarning
    >
      {children}
    </button>
  );
}