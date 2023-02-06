/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../layouts/Main";

export default function Progress() {
  return (
    <Main circles={true}>
      <div css={progresstyle}>
        Hola
      </div>
    </Main>
  );
}

const progresstyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh - 50px)",
};