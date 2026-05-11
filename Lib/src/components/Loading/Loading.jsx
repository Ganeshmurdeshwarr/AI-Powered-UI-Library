import React from "react";

export const Loading = ({ size = 40, color = "#6366f1", thickness = 4 }) => {
  return (
    <div style={{ width: size, height: size, position: "relative" }}>
      <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: thickness + "px solid " + color + "50", position: "absolute", top: 0, left: 0 }} />
      <div style={{ width: "100%", height: "100%", borderRadius: "50%", border: thickness + "px solid transparent", borderTopColor: color, position: "absolute", top: 0, left: 0, animation: "spin 1s linear infinite" }} />
      <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); }}`}</style>
    </div>
  );
};