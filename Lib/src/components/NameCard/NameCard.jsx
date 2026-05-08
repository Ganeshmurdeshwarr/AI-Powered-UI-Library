import React, { useState } from "react";

export const NameCard = ({
  name = "John Doe",
  title = "Software Engineer",
  avatar = "https://i.pravatar.cc/150?img=3",
  accent = "#6366f1",
  bg = "#0f172a",
  onContactClick = () => {}
}) => {
  const [hovered, setHovered] = useState(false);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: bg,
        borderRadius: "20px",
        padding: "20px",
        width: "280px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "16px" }}>
        <img src={avatar} alt={name} style={{ width: "60px", height: "60px", borderRadius: "50%", border: "2px solid " + alpha(accent, 0.3) }} />
        <div>
          <div style={{ fontSize: "16px", fontWeight: "700", color: "#fff", marginBottom: "4px" }}>{name}</div>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{title}</div>
        </div>
      </div>
      <button
        onClick={onContactClick}
        style={{ width: "100%", padding: "11px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}
      >Contact</button>
    </div>
  );
};