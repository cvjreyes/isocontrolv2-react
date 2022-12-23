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
}) {
  const buttonStyle = {
    width: width || "100%",
    padding: "10px 20px",
    backgroundColor: bgColor,
    color,
    border,
    borderRadius: borderRadius || "6px",
    margin,
    fontWeight,
  };

  return (
    <button className={className} css={buttonStyle} onClick={onClick}>
      {text}
    </button>
  );
}
