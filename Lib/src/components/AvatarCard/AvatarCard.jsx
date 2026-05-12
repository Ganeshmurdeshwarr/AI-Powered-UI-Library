import React from "react";

export const AvatarCard = ({
  avatar = "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=400&q=80",
  name = "John Doe",
  role = "Frontend Developer",
  bio = "Building pixel-perfect UIs with React and Tailwind CSS.",
  accent = "#6366f1",
  bg = "#0f172a",
  onFollowClick = () => {},
  onMessageClick = () => {}
}) => {
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "24px", width: "280px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid " + alpha(accent, 0.15) }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", overflow: "hidden", marginBottom: "16px" }}>
          <img src={avatar} alt={name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
        <h3 style={{ fontSize: "18px", fontWeight: "700", color: "#fff", margin: "0 0 4px" }}>{name}</h3>
        <p style={{ fontSize: "13px", color: accent, margin: "0 0 16px" }}>{role}</p>
        <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.6)", textAlign: "center", lineHeight: 1.5, margin: "0 0 20px" }}>{bio}</p>
        <div style={{ display: "flex", gap: "12px", width: "100%" }}>
          <button onClick={onFollowClick} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Follow</button>
          <button onClick={onMessageClick} style={{ flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid " + alpha(accent, 0.3), background: "transparent", color: accent, fontSize: "13px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>Message</button>
        </div>
      </div>
    </div>
  );
};