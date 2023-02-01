/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import ReactSelect from "react-select";

import Button2 from "../../general/Button2";

export default function TrayHead({
  handleClaim,
  buttonText,
  title,
  data,
  orderBy,
}) {
  const selectRef = useRef(null);

  const options = [
    { value: "new", label: "New First" },
    { value: "old", label: "Old First" },
  ];

  return (
    <div css={headStyle}>
      <div className="flexCenter">
        <div className="selectWrapper">
          <label
            className="pointer"
            htmlFor="mode"
            onClick={() => selectRef.current.focus()}
          >
            Order By:
          </label>
          <ReactSelect
            options={options}
            openMenuOnFocus={true}
            ref={selectRef}
            onChange={orderBy}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: "none",
              }),
            }}
            defaultValue={options[0]}
          />
        </div>
      </div>
      <div className="flexCenter">
        <h3 className="bold">{title}</h3>
      </div>
      <div className="flexCenter">
        <Button2
          onClick={handleClaim}
          text={buttonText || "Claim"}
          width="100px"
          bgColor="transparent"
          border="none"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 6px"
          margin="0 0 0 3%"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="claim"
          src={"https://img.icons8.com/material-outlined/24/null/move-up.png"}
          imgFilter="invert(100%) brightness(200%)"
        />
        <div className="itemsLength">{data.length} items</div>
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr) ",
  height: "50px",
  width: "100%",
  backgroundColor: "#338DF1",
  ".selectWrapper": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    ".css-1nmdiq5-menu, .css-1nmdiq3-menu": {
      cursor: "pointer",
    },
    div: {
      cursor: "pointer",
    },
    label: {
      marginRight: ".5rem",
      color: "white",
    },
  },
};
