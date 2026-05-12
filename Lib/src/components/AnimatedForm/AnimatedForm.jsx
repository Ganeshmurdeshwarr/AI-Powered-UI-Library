import React, { useState } from "react";

export const AnimatedForm = ({
  title = "Sign In",
  submitText = "Continue",
  accent = "#6366f1",
  bg = "#0f172a",
  onSubmit = () => {},
  fields = [
    { label: "Email", type: "email", placeholder: "Enter your email" },
    { label: "Password", type: "password", placeholder: "Enter your password" }
  ]
}) => {
  const [values, setValues] = useState({});
  const [focused, setFocused] = useState(null);
  const alpha = (hex, op) => {
    const r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
    return "rgba(" + r + "," + g + "," + b + "," + op + ")";
  };
  const handleChange = (e, field) => {
    setValues(prev => ({ ...prev, [field]: e.target.value }));
  };
  return (
    <div style={{ background: bg, borderRadius: "20px", padding: "32px 28px", width: "360px", fontFamily: "system-ui,sans-serif", boxShadow: "0 10px 40px rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.08)" }}>
      <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#fff", margin: "0 0 24px", textAlign: "center" }}>{title}</h2>
      {fields.map((field, i) => (
        <div key={i} style={{ marginBottom: "20px", position: "relative" }}>
          <label style={{ position: "absolute", top: focused === field.label ? "0" : "50%", left: "12px", transform: focused === field.label ? "translateY(0)" : "translateY(-50%)", fontSize: focused === field.label ? "12px" : "14px", color: focused === field.label ? accent : "rgba(255,255,255,0.45)", transition: "all 0.2s ease", pointerEvents: "none" }}>{field.label}</label>
          <input
            type={field.type}
            value={values[field.label] || ""}
            onChange={(e) => handleChange(e, field.label)}
            onFocus={() => setFocused(field.label)}
            onBlur={() => setFocused(null)}
            style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid " + (focused === field.label ? accent : "rgba(255,255,255,0.12)"), background: "transparent", color: "#fff", fontSize: "14px", outline: "none", transition: "border-color 0.2s ease" }}
            placeholder={focused !== field.label ? field.placeholder : ""}
          />
        </div>
      ))}
      <button onClick={onSubmit} style={{ width: "100%", padding: "13px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, " + accent + ", " + alpha(accent, 0.7) + ")" , color: "#fff", fontSize: "14px", fontWeight: "700", cursor: "pointer", fontFamily: "inherit" }}>{submitText}</button>
    </div>
  );
};