/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Input1({
  id,
  name,
  value,
  type,
  onChange,
  className,
  placeholder,
  width,
  margin,
}) {
  const InputStyle = {
    height: "40px",
    border: "1px solid #D2D2D2",
    borderRadius: "6px",
    padding: "5px",
    width: width || "auto",
    margin,
  };

  return (
    <input
      css={InputStyle}
      id={id}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      className={className}
      placeholder={placeholder}
    />
  );
}
