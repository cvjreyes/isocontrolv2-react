/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function SidePanel({
  data,
  subcategories,
  section,
  handleChange,
}) {
  return (
    <div css={sidePanelStyle}>
      <div className="category">
        <label className="bold pointer">
          <input
            type="checkbox"
            checked={
              !!data[0] &&
              subcategories.every((x) => data[0].hasOwnProperty(x.key))
            }
            onChange={() => handleChange(section)}
          />
          {section}
        </label>
      </div>
      <div className="subcategories">
        {subcategories.map((x, i) => {
          //   console.log(x);
          return (
            <div className="subcategory" key={i}>
              <label className="pointer">
                <input
                  type="checkbox"
                  checked={!!data[0] && x.key in data[0]}
                  onChange={() => handleChange(x.key)}
                />
                {x.label}
                <br />
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const sidePanelStyle = {
  justifySelf: "center",
  margin: "0 0 2rem",
  input: {
    marginRight: ".5rem",
  },
  height: "fit-content",
  padding: "2rem",
  borderRadius: "16px",
  background: "linear-gradient(225deg, #e6e6e6, #ffffff)",
  boxShadow: "-8px 8px 16px #dedede, 8px -8px 16px #ffffff",
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
  },
  ".subcategories": {
    marginLeft: "5%",
    ".subcategory": {
      marginLeft: "5%",
      display: "flex",
      lineHeight: "2rem",
    },
  },
};
