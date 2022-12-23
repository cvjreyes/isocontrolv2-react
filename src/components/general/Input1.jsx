/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Input1({ id, name, value, type, onChange, className }) {
  return (
    <input
      css={InputStyle}
      id={id}
      name={name}
      value={value}
      type={type}
      onChange={onChange}
      className={className}
    />
  );
}

const InputStyle = {
  height: "40px",
  border: "1px solid lightgray",
  borderRadius: "6px",
  padding: "5px",
};
