/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../layouts/Main";

export default function IFD() {
  return (
    <Main logo="IsoTracker" circles={false}>
      <div css={IFDStyle}>IFD</div>
    </Main>
  );
}

const IFDStyle = {};
