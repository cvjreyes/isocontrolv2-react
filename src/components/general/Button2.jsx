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
  textMargin,
  hoverShadow,
  src,
  alt,
  imgFilter,
  imgWidth,
}) {
  const buttonStyle = {
    width: width || "100%",
    padding: padding || "10px 20px",
    backgroundColor: bgColor,
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
    },
  };

  return (
    <button
      type={type}
      className={`${className} pointer flexCenter`}
      css={buttonStyle}
      onClick={onClick}
      name={name}
    >
      <img src={src} alt={alt} />
      <span>{text}</span>
    </button>
  );
}