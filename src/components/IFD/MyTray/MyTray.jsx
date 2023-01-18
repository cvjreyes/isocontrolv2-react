/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import Button1 from "../../general/Button1";
import { api } from "../../../helpers/api";

// TODOS:
// - get data
// - show data
// - calculate next step and return
// - functionality unclaim
// - functionality next step
// - functionality return

export default function MyTray() {
  const [pipes, setPipes] = useState(null);

  useEffect(() => {
    const getMyPipes = async () => {
      const { body: tempPipes } = await api("get", "/ifd/get_my_pipes");
      console.log(tempPipes);
      setPipes(tempPipes);
    };
    getMyPipes();
  }, []);

  const unclaim = async () => {};

  const nextStep = async () => {};

  const returnPipe = async () => {};

  return (
    <div css={myTrayStyle}>
      <div className="head">
        <div></div>
        <div className="flexCenter">
          <h2>My Tray</h2>
        </div>
        <div className="flexCenter">
          <Button1
            text="Unclaim"
            onClick={unclaim}
            width="150px"
            border="1px solid black"
          />
          <Button1
            text="Next Step"
            onClick={nextStep}
            width="150px"
            border="1px solid black"
          />
          <Button1
            text="Return"
            onClick={returnPipe}
            width="150px"
            border="1px solid black"
          />
        </div>
      </div>
      <div className="table">
        <div>header</div>
        <div>table</div>
      </div>
    </div>
  );
}

const myTrayStyle = {
  ".head": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    marginBottom: "10px",
    h2: {
      fontSize: "20px",
    },
  },
  ".table": {
    height: "70vh",
    overflowY: "scroll",
  },
};
