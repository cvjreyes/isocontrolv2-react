/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { URL } from "../../helpers/config";

import Square from "./Square";

export default function Squares() {
  const [feedProgress, setFeedProgress] = useState(0);
  const [IFDProgress, setIFDProgress] = useState(0);

  useEffect(() => {
    let URL1 = `${URL}/feed/get_progress`;
    let URL2 = `${URL}/ifd/get_progress`;
    // let URL3 = `${URL}/ifc/get_progress`;

    const promise1 = axios.get(URL1);
    const promise2 = axios.get(URL2);
    // const promise3 = axios.get(URL3);

    const getProgresses = async () => {
      const res = await Promise.all([promise1, promise2]);
      setFeedProgress(res[0].data.body);
      setIFDProgress(res[1].data.body);
      // setFeedProgress(res[2].data.body);
    };
    getProgresses();
  }, []);
  return (
    <div css={squaresStyle}>
      <Square text="FEED" num={feedProgress} />
      <Square text="IFD" num={IFDProgress} />
      <Square text="IFC" />
    </div>
  );
}

const squaresStyle = {};
