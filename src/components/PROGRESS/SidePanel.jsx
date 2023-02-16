/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Checkbox from "../general/Checkbox";

export default function SidePanel({
  data,
  subcategories,
  section,
  handleChange,
  colors,
}) {
  return (
    <div css={sidePanelStyle}>
      <div className="category bold">
        <Checkbox
          handleChange={() => handleChange(section)}
          checked={
            !!data[0] &&
            subcategories.every((x) => data[0].hasOwnProperty(x.key))
          }
          color={"purple"}
        />
        {section}
      </div>
      <div className="subcategories">
        {subcategories
          .map((x, i) => {
            // console.log("data: ", x);
            // console.log("i: ", i);
            return (
              <div className="subcategory" key={i}>
                <Checkbox
                  handleChange={() => handleChange(x.key)}
                  checked={!!data[0] && x.key in data[0]}
                  color={colors[i]}
                />
                {x.label}
              </div>
            );
          })}
      </div>
    </div>
  );
}

const sidePanelStyle = {
  justifySelf: "center",
  height: "fit-content",
  padding: "2rem",
  borderRadius: "16px",
  marginLeft: "20%",
  background: "linear-gradient(225deg, #e6e6e6, #ffffff)",
  boxShadow: "-8px 8px 16px #dedede, 8px -8px 16px #ffffff",
  ".category": {
    margin: "0 0 0.5rem",
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    width: "100%",
    paddingRight: "65%",
  },
  ".subcategories": {
    marginLeft: "5%",
    width: "22vh",
    ".subcategory": {
      display: "flex",
      marginLeft: "5%",
      lineHeight: "2rem",
      // color: "blue"
    },
  },
};
