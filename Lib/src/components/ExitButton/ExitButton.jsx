import React from "react";

export const ExitButton = ({ size = 24, color = "#ffffff", hoverColor = "#e11d48", onClick = () => {} }) => {
  return (
    <button
      onClick={onClick}
      style={{
        background: "transparent",
        border: "none",
        padding: "0",
        cursor: "pointer",
        width: size + "px",
        height: size + "px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        transition: "background 0.2s",
      }}
    >
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transition: "stroke 0.2s" }}>
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
};