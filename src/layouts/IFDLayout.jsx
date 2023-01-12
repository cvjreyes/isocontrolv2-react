/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Analysis from "../components/IFD/Analysis";

export default function IFDLayout({ children }) {
  return (
    <div css={layoutStyle}>
      <div className="top">
        <div />
        <h3>Piping IFD</h3>
        <Analysis />
      </div>
      {children}
    </div>
  );
}

const layoutStyle = {
  minHeight: "calc(100vh - 50px)",
  textAlign: "center",
  paddingTop: "4rem",
  ".top": {
    // height: "20vh",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    marginBottom: "2rem",
  },
  h3: {
    fontSize: "20px",
  },
};
