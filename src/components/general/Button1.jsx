/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Button1({
  text,
  onClick,
  bgColor,
  color,
  border,
  borderRadius,
  width,
  margin,
  className,
  fontWeight,
  fontSize,
  type,
  padding,
  bgHover,
}) {
  const buttonStyle = {
    width: width || "100%",
    padding: padding || "10px 20px",
    backgroundColor: bgColor,
    color,
    border,
    borderRadius: borderRadius || "6px",
    margin,
    fontWeight,
    fontSize,
    ":hover": {
      background: bgHover,
    },
  };

  return (
    <button
      type={type}
      className={`${className} pointer`}
      css={buttonStyle}
      onClick={onClick}
    >
      {text}
    </button>
  );
}
