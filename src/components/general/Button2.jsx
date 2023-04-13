/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Button2({
  name,
  text,
  onClick,
  bgColor,
  color,
  border,
  borderRadius,
  width,
  display,
  height,
  margin,
  className,
  fontWeight,
  fontSize,
  type,
  padding,
  bgHover,
  textMargin,
  hoverShadow,
  src,
  alt,
  imgFilter,
  imgWidth,
  imgTransform,
}) {
  const buttonStyle = {
    display,
    width: width || "100%",
    height,
    padding: padding || "10px 20px",
    background: bgColor,
    border,
    borderRadius: borderRadius || "6px",
    margin,
    fontWeight,
    ":hover": {
      background: bgHover,
      boxShadow: hoverShadow,
    },
    span: { whiteSpace: "nowrap", color, fontSize, margin: textMargin },
    img: {
      width: imgWidth || "20px",
      filter: imgFilter,
      transform: imgTransform,
    },
  };

  return (
    <button
      type={type}
      className={`${className || ""} pointer flexCenter`}
      css={buttonStyle}
      onClick={onClick}
      name={name}
    >
      {src && <img src={src} alt={alt} />}
      <span>{text}</span>
    </button>
  );
}
