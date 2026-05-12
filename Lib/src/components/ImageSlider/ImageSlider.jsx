import React, { useState, useEffect } from "react";

export const ImageSlider = ({
  images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=600&q=80",
    "https://images.unsplash.com/photo-1505778276668-26b3ff6af735?w=600&q=80",
    "https://images.unsplash.com/photo-1534274867514-d5b47ef89edb?w=600&q=80",
    "https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80"
  ],
  interval = 3000,
  transitionDuration = 500
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  return (
    <div style={{ width: "600px", height: "400px", borderRadius: "20px", overflow: "hidden", position: "relative" }}>
      {images.map((img, i) => (
        <div
          key={i}
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            backgroundImage: "url(" + img + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: currentIndex === i ? 1 : 0,
            transition: "opacity " + transitionDuration + "ms ease-in-out"
          }}
        />
      ))}
      <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px" }}>
        {images.map((_, i) => (
          <div
            key={i}
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: currentIndex === i ? "#6366f1" : "rgba(255,255,255,0.3)",
              cursor: "pointer",
              transition: "background 0.2s"
            }}
            onClick={() => setCurrentIndex(i)}
          />
        ))}
      </div>
    </div>
  );
};