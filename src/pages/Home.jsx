/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../components/layouts/Main";
import Squares from "../components/home/Squares";

export default function Home() {
  return (
    <Main logo="IsoTracker" circles={true}>
      <div css={homestyle}>
        <Squares />
      </div>
    </Main>
  );
}

const homestyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh - 50px)",
};
