import React, { useState } from "react";

export const Button = ({
  label = "Click Me",
  onClick = () => {},
  color = "#ffffff",
  backgroundColor = "#6c47ff",
  hoverBackgroundColor = "#5235cc",
  size = "medium",
  disabled = false,
  variant = "filled", // "filled" | "outline" | "ghost"
  rounded = false,
  fullWidth = false,
  leftIcon = null,
  rightIcon = null,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);

  const sizeMap = {
    small: { padding: "6px 14px", fontSize: "13px", gap: "5px" },
    medium: { padding: "10px 22px", fontSize: "15px", gap: "7px" },
    large: { padding: "14px 30px", fontSize: "17px", gap: "9px" },
  };

  const { padding, fontSize, gap } = sizeMap[size] || sizeMap.medium;

  const getVariantStyles = () => {
    if (variant === "outline") {
      return {
        backgroundColor: "transparent",
        border: `2px solid ${backgroundColor}`,
        color: isHovered ? color : backgroundColor,
        ...(isHovered && { backgroundColor }),
      };
    }
    if (variant === "ghost") {
      return {
        backgroundColor: isHovered ? `${backgroundColor}18` : "transparent",
        border: "2px solid transparent",
        color: backgroundColor,
      };
    }
    // filled (default)
    return {
      backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
      border: `2px solid ${isHovered ? hoverBackgroundColor : backgroundColor}`,
      color,
    };
  };

  const baseStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap,
    padding,
    fontSize,
    fontWeight: "600",
    fontFamily: "'Segoe UI', sans-serif",
    borderRadius: rounded ? "999px" : "8px",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    width: fullWidth ? "100%" : "auto",
    transition: "all 0.2s ease",
    transform: isPressed && !disabled ? "scale(0.97)" : "scale(1)",
    outline: "none",
    userSelect: "none",
    letterSpacing: "0.3px",
    ...getVariantStyles(),
  };

  return (
    <button
      style={baseStyle}
      onClick={!disabled ? onClick : undefined}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsPressed(false);
      }}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      disabled={disabled}
    >
      {leftIcon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {leftIcon}
        </span>
      )}
      {label}
      {rightIcon && (
        <span style={{ display: "flex", alignItems: "center" }}>
          {rightIcon}
        </span>
      )}
    </button>
  );
};

export default Button;
