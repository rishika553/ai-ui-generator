import React from "react";

const fontMap = {
  Inter: "Inter, system-ui, -apple-system, sans-serif",
  Poppins: "Poppins, system-ui, -apple-system, sans-serif",
  Outfit: "Outfit, system-ui, -apple-system, sans-serif",
  "DM Sans": "'DM Sans', system-ui, -apple-system, sans-serif",
  "Playfair Display": "'Playfair Display', Georgia, serif",
};

export default function ThemeProvider({ theme, children }) {
  if (!theme) return children;

  const { font, palette, radius, buttonStyle, name } = theme;

  const styleVariables = {
    "--site-primary": palette.primary,
    "--site-secondary": palette.secondary,
    "--site-accent": palette.accent,
    "--site-background": palette.background,
    "--site-surface": palette.surface,
    "--site-text": palette.text,
    "--site-muted": palette.muted,
    "--site-radius": radius || "16px",
    "--site-font": fontMap[font] || fontMap.Inter,
    fontFamily: fontMap[font] || fontMap.Inter,
  };

  return (
    <div
      className={`site-theme-scope theme-${name} button-style-${buttonStyle} min-h-full transition-all duration-300`}
      style={styleVariables}
    >
      {children}
    </div>
  );
}
