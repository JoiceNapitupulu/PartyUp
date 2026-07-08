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
    "font-pixel text-[11px] px-4 py-2 border-4 font-bold select-none cursor-pointer pixel-shadow pixel-btn-active inline-flex items-center justify-center text-center gap-2 focus:outline-none transition-all duration-75";

  const themeStyles = {
    primary: "bg-retro-black text-pixel-green border-retro-black hover:bg-neutral-900",
    secondary: "bg-retro-light-gray text-retro-black border-retro-black hover:bg-retro-gray",
    navy: "bg-navy-blue text-white border-retro-black hover:bg-navy-light",
    green: "bg-pixel-green text-retro-black border-retro-black hover:bg-pixel-green-dark",
    disabled: "bg-retro-gray text-retro-dark-gray border-retro-dark-gray cursor-not-allowed shadow-none active:translate-y-0 active:translate-x-0 active:shadow-none",
  };

  const selectedTheme = disabled ? themeStyles.disabled : themeStyles[variant] || themeStyles.primary;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${selectedTheme} ${className}`}
    >
      {children}
    </button>
  );
}
