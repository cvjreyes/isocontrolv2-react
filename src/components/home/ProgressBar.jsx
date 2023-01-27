/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import Countup from "react-countup";

export default function ProgressBar({
  feedProgress,
  IFDProgress,
  IFCProgress,
}) {
  const [totalProgress, setTotalProgress] = useState(0);

  useEffect(() => {
    if (feedProgress && IFDProgress && IFCProgress)
      setTotalProgress(
        (feedProgress * 0.1 + IFDProgress * 0.4 + IFCProgress * 0.5).toFixed(2)
      );
  }, [feedProgress, IFDProgress, IFCProgress]);

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
        <div className="number">
          <Countup end={totalProgress} decimals={2} />
          <span>%</span>
        </div>
      </div>
    </div>
  );
}

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
    transition: "width 2s ease",
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
  ".number": { zIndex: 2 },
};
