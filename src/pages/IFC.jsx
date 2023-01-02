/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../layouts/Main";

export default function IFC() {
  return (
    <Main logo="IsoTracker" circles={false}>
      <div css={IFCStyle}>IFC</div>
    </Main>
  );
}

const IFCStyle = {};
