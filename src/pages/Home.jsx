/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../layouts/Main";
import Squares from "../components/home/Squares";

export default function Home() {
  return (
    <Main circles={true}>
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
