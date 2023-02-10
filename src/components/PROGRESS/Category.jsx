/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import AnimateHeight from "react-animate-height";

export default function OptionsBox({
  displayData,
  subcategories,
  handleChange,
  heightDropdown,
  setHeightDropdown,
  categoryName,
}) {
  return (
    <div css={categoryWrapper}>
      <div className="category">
        <label className="bold pointer">
          <input
            type="checkbox"
            checked={
              !!displayData[0] &&
              subcategories.every((x) => displayData[0].hasOwnProperty(x.key))
            }
            onChange={() => handleChange(categoryName)}
          />
          {categoryName}
        </label>
        <img
          aria-controls="image_dropdown"
          className="pointer"
          src={
            !heightDropdown
              ? "https://img.icons8.com/material-outlined/24/null/filled-plus-2-math.png"
              : "https://img.icons8.com/material-outlined/24/null/indeterminate-checkbox.png"
          }
          onClick={() => setHeightDropdown(heightDropdown === 0 ? "auto" : 0)}
        />
      </div>
      <div className="subCategory">
        <AnimateHeight
          id="image_dropdown"
          duration={500}
          height={heightDropdown}
        >
          {subcategories.map((x, i) => {
            return (
              <label className="labelSub pointer" key={i}>
                <input
                  type="checkbox"
                  checked={!!displayData[0] && x.key in displayData[0]}
                  onChange={() => handleChange(x.key)}
                />
                {x.label}
                <br />
              </label>
            );
          })}
        </AnimateHeight>
      </div>
    </div>
  );
}

const categoryWrapper = {
  margin: "0 0 2rem",
  input: {
    marginRight: ".5rem",
  },
  ".category": {
    margin: "0 0 0.5rem",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: "50%",
    label: {
      display: "flex",
      flexWrap: "nowrap",
      width: "100%",
    },
    img: {
      width: "20px",
      height: "20px",
      marginLeft: "1rem",
    },
  },
  ".subCategory": {
    marginLeft: "5%",
    display: "flex",
    lineHeight: "2rem",
  },
};
