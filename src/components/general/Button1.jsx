/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Button1({
  name,
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
  display,
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
    display: display,
  };

  return (
    <button
      type={type}
      className={`${className} pointer`}
      css={buttonStyle}
      onClick={onClick}
      name={name}
    >
      {text}
    </button>
  );
}
