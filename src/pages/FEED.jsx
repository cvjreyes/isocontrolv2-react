/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../components/layouts/Main";

export default function FEED() {
  return (
    <Main logo="IsoTracker" circles={false}>
      <div css={feedStyle}>FEED</div>
    </Main>
  );
}

const feedStyle = {};
