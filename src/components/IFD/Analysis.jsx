/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../helpers/api";

// ! CURRENTLY NOT BEING USED !!!

export default function Analysis() {
  const [progress, setProgress] = useState();
  const [modelledWeight, setModelledWeight] = useState("...");
  const [weight, setWeight] = useState();

  useEffect(() => {
    console.log("test");
    const getGeneralProgress = async () => {
      const {
        weight: tempWeight,
        progress: tempProgress,
        modelledWeight: tempModelledWeight,
      } = await api("get", "/estimatedPipingWeight", true);
      setWeight(tempWeight);
      setProgress(tempProgress);
      setModelledWeight(tempModelledWeight);
    };
    // getGeneralProgress();
  }, []);

  return (
    <div css={analysisStyle}>
      <div className="grid">
        <div>Estimated Weight</div>
        <div>Modelled Weight</div>
        <div>Total Progress</div>
      </div>
      <div className="grid">
        <div>{weight}</div>
        <div>{modelledWeight}</div>
        <div>{progress}%</div>
      </div>
    </div>
  );
}

const analysisStyle = {
  width: "500px",
  margin: "0 0 0 1rem",
  border: "solid black",
  borderWidth: "1px 0 0 1px",
  ".grid": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    div: {
      lineHeight: "30px",
      border: "solid black",
      borderWidth: "0 1px 1px 0",
    },
  },
};
