/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import Square from "./Square";
import ProgressBar from "./ProgressBar";
import { api } from "../../helpers/api";

export default function Squares() {
  const [feedProgress, setFeedProgress] = useState(0);
  const [IFDProgress, setIFDProgress] = useState(0);
  const [IFCProgress, setIFCProgress] = useState(0);

  useEffect(() => {
    const getProgresses = async () => {
      await Promise.all([
        api("get", "/feed/get_progress"),
        api("get", "/ifd/get_progress"),
      ]).then((values) => {
        setFeedProgress(values[0].body);
        setIFDProgress(values[1].body);
      });
    };
    getProgresses();
  }, []);

  return (
    <div>
      <div css={squaresStyle}>
        <Square
          text="FEED"
          subtext="(Front End Engineering Design)"
          num={feedProgress}
          to="/feed"
        />
        <Square
          text="IFD"
          subtext="(Issue For Design)"
          num={IFDProgress}
          to="/ifd"
          className={!import.meta.env.VITE_IFD && "not-allowed"}
        />
        <Square
          text="IFC"
          subtext="(Issue For Construction)"
          num={IFCProgress}
          to="/ifc"
          className={!import.meta.env.VITE_IFC && "not-allowed"}
        />
      </div>
      <ProgressBar
        feedProgress={feedProgress}
        IFDProgress={IFDProgress}
        IFCProgress={IFCProgress}
      />
    </div>
  );
}

const squaresStyle = {
  display: "flex",
  "*": {
    color: "white",
  },
};
