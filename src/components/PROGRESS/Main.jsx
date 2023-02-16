/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Graphic from "./Graphic";
import SidePanel from "./SidePanel";

export default function Main({ data, subcategories, section, handleChange }) {
  return (
    <div css={mainStyle}>
      <SidePanel
        data={data}
        subcategories={subcategories}
        section={section}
        handleChange={handleChange}
      />
      <Graphic data={data} />
    </div>
  );
}

const mainStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 4fr",
  marginTop: "3%",
  minHeight: "70vh",
};
