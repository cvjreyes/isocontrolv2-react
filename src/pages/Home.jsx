/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Main from "../components/layouts/Main";
import ProgressBar from "../components/home/ProgressBar";
import Squares from "../components/home/Squares";

export default function Home() {
  return (
    <Main logo="IsoTracker" circles={true}>
      <div css={homestyle}>
        <Squares />
        <ProgressBar />
      </div>
    </Main>
  );
}

const homestyle = {};
