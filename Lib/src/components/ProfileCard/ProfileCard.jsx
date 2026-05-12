import React, { useState } from "react";

export const ProfileCard = ({
  name = "John Doe",
  role = "Software Engineer",
  bio = "Specializing in building scalable web applications with modern technologies.",
  avatar = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=600&q=80",
  accent = "#6366f1",
  bg = "#0f172a",
  socialLinks = ["#", "#", "#"],
  onSocialClick = () => {}
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
        padding: "24px",
        width: "280px",
        border: "1px solid " + (hovered ? alpha(accent, 0.3) : "rgba(255,255,255,0.07)"),
        fontFamily: "system-ui,sans-serif",
        transition: "transform 0.25s, box-shadow 0.25s",
        transform: hovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: hovered ? "0 16px 40px rgba(0,0,0,0.5)" : "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <div style={{ position: "relative", width: "100%", height: "80px", marginBottom: "12px" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "80px", background: "linear-gradient(90deg, " + accent + ", " + alpha(accent, 0.3) + ")", borderRadius: "12px" }} />
        <img src={avatar} alt={name} style={{ position: "absolute", top: "16px", left: "50%", transform: "translateX(-50%)", width: "96px", height: "96px", borderRadius: "50%", border: "4px solid " + bg, objectFit: "cover" }} />
      </div>
      <div style={{ textAlign: "center", marginTop: "48px" }}>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 4px" }}>{name}</h3>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", margin: "0 0 12px" }}>{role}</p>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)", lineHeight: 1.65, margin: "0 0 18px" }}>{bio}</p>
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "12px" }}>
        {socialLinks.map((link, i) => (
          <button
            key={i}
            onClick={() => onSocialClick(link)}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: alpha(accent, 0.15),
              border: "1px solid " + alpha(accent, 0.3),
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer"
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
              <circle cx="4" cy="4" r="2"></circle>
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
};