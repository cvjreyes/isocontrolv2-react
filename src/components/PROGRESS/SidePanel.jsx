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
        <p>- {section} -</p>
      </div>
      <div className="subcategories">
        {subcategories.map((x, i) => {
          return (
            <div
              className="subcategory pointer"
              key={i}
              onClick={() => handleChange(x.key)}
            >
              <Checkbox
                checked={!!data[0] && x.key in data[0]}
                color={colors[i]}
              />
              <p>{x.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

const sidePanelStyle = {
  height: "fit-content",
  padding: "2rem",
  borderRadius: "16px",
  marginLeft: "20%",
  background:
    "linear-gradient(100deg, rgba(250,250,250,1) 0%, rgba(255,250,242,1) 49%, rgba(244,239,231,1) 100%)",
  filter:
    'progid:DXImageTransform.Microsoft.gradient(startColorstr="#fffdfa",endColorstr="#f4efe7",GradientType=1);  webkitBoxShadow: "5px 4px 16px -10px rgba(0,0,0,0.75)"',
  mozBoxShadow: "5px 4px 16px -10px rgba(0,0,0,0.75)",
  boxShadow: "5px 4px 16px -10px rgba(0,0,0,0.75)",
  ".category": {
    display: "flex",
    alignItems: "center",
  },
  ".subcategories": {
    marginLeft: "6%",
    ".subcategory": {
      display: "flex",
      alignItems: "center",
    },
  },
  p: {
    marginLeft: ".5rem",
    lineHeight: "2.5rem",
  },
};
