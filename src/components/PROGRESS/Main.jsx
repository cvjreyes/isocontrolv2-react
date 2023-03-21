/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Graphic from "./Graphic";
import SidePanel from "./SidePanel";

export default function Main({ data, subcategories, section, handleChange }) {
  const colors = ["brown", "red", "blue", "salmon"];

  return (
    <div css={mainStyle}>
      <SidePanel
        data={data}
        subcategories={subcategories}
        section={section}
        handleChange={handleChange}
        colors={colors}
      />
      <Graphic data={data} colors={colors} subcategories={subcategories} />
    </div>
  );
}

const mainStyle = {
  display: "grid",
  gridTemplateColumns: "minmax(350px, 1fr) 4fr",
  marginTop: "40px",
  minHeight: "74vh",
};
