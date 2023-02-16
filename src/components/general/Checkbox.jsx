/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Checkbox({ handleChange, checked, color }) {
  const checkboxStyle = {
    display: "flex",
    alignItems: "center",
    ".checkbox": {
      width: "20px",
      height: "20px",
      border: "2px solid black",
      borderRadius: "5px",
      marginRight: ".5rem",
      ".box": {
        width: "10px",
        height: "10px",
        borderRadius: "2px",
        backgroundColor: color,
      },
    },
  };

  return (
    <label css={checkboxStyle} className="pointer" onClick={handleChange}>
      <div className="checkbox flexCenter">
        {checked && <div className="box"></div>}
      </div>
    </label>
  );
}
