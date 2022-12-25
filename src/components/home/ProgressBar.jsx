/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";

export default function ProgressBar({
  feedProgress,
  IFDProgress,
  IFCProgress,
}) {
  const totalProgress = (
    feedProgress * 0.1 +
    IFDProgress * 0.4 +
    IFCProgress * 0.5
  ).toFixed(2);

  return (
    <div css={progressStyle}>
      <p>Total Progress: </p>
      <div className="progressbar-container">
        <div
          className="progressbar-complete"
          style={{
            width: `${totalProgress}%`,
          }}
        >
          <div className="progressbar-liquid"></div>
        </div>
        <span className="progress">{totalProgress}%</span>
      </div>
    </div>
  );
}

const gradient = keyframes`
0% {
  background-position: 0% 50%;
}

50% {
  background-position: 100% 50%;
}

100% {
  background-position: 0% 50%;
}
`;

const progressStyle = {
  margin: "40px auto 0",
  width: "50vw",
  ".progressbar-container": {
    marginTop: ".5rem",
    position: "relative",
    width: "100%",
    height: "50px",
    border: "1px solid #FFF",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    // background:
    //   "linear-gradient(90deg, rgb(238, 246, 253) 0%, rgb(219, 234, 255) 48%, rgb(237, 242, 245) 100%)",
    // backgroundSize: "400% 400%",
    // animation: `${gradient} 5s ease infinite`,
  },
  ".progressbar-complete": {
    position: "absolute",
    left: "0",
    top: "0px",
    height: "100%",
    backgroundColor: "#65ACFA",
    borderRadius: "10px",
    animation: "gradient 2500ms infinite ease-in-out",
    zIndex: 2,
  },
  ".progressbar-liquid": {
    zIndex: 1,
    width: "70px",
    height: "70px",
    animation:
      "g 2500ms infinite ease-in-out, r 3000ms infinite cubic-bezier(0.5, 0.5, 0.5, 0.5)",
    position: "absolute",
    right: "-5px",
    top: "-10px",
    backgroundColor: "#65ACFA",
    borderRadius: "40%",
  },
  ".progress": {
    zIndex: 2,
  },
};
