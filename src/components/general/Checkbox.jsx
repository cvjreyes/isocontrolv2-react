/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Checkbox({ handleClick, checked, color }) {
  const checkboxStyle = {
    width: "20px",
    height: "20px",
    border: "2px solid black",
    borderRadius: "5px",
    ".box": {
      width: "10px",
      height: "10px",
      borderRadius: "2px",
      backgroundColor: color,
    },
  };

  return (
    <div
      css={checkboxStyle}
      className="pointer flexCenter"
      onClick={handleClick}
    >
      {checked && <div className="box"></div>}
    </div>
  );
}
