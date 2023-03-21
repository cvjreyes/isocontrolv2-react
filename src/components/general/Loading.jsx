/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import ReactLoading from "react-loading";

import loadingGif from "../../assets/gifs/loading.gif";

export default function Loading({ size }) {
  if ((size = "small"))
    return (
      <div css={smallStyle}>
        <img alt="loading" src={loadingGif} />
      </div>
    );
  return (
    <div css={mainStyle}>
      <ReactLoading
        type={"cylon"}
        color={"rgb(53, 126, 221)"}
        height={100}
        width={100}
      />
    </div>
  );
}

const smallStyle = {
  marginTop: "50px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  img: {
    width: "50px",
    height: "50px",
    mixBlendMode: "darken",
  },
};

const mainStyle = {
  width: "100%",
  minHeight: "calc(100vh - 50px)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
