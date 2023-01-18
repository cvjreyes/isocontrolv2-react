/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import WithToast from "../../../modals/Toast";
import Button1 from "../../general/Button1";
import MyTrayTable from "./MyTrayTable";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import { api } from "../../../helpers/api";

// TODOS:
// - calculate next step and return
// - functionality unclaim
// - functionality next step
// - functionality return

function MyTrayComp({ setMessage }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);

  useEffect(() => {
    const getMyPipes = async () => {
      const { body: pipes } = await api("get", "/ifd/get_my_pipes");
      const rows = pipes.map((row) => ({
        ...row,
        tag: buildTag(row),
        updated_at: buildDate(row),
      }));
      setData(rows);
      setDisplayData(rows);
    };
    getMyPipes();
  }, []);

  const addToDataClaim = (id) => {
    const tempDataToClaim = [...dataToClaim];
    const index = tempDataToClaim.indexOf(id);
    if (index > -1) tempDataToClaim.splice(index, 1);
    else tempDataToClaim.push(id);
    setDataToClaim(tempDataToClaim);
  };

  const updatePipesDisplay = () => {
    let results = [];
    data.forEach((x) => {
      if (!dataToClaim.includes(x.id)) {
        results.push(x);
      }
    });
    setData(results);
    filter(results);
  };

  const unclaim = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to unclaim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifd/unclaim_ifd_pipes", 0, {
      data: dataToSend,
    });
    if (ok) {
      updatePipesDisplay();
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const nextStep = async () => {};

  const returnPipe = async () => {};

  const filter = (passedData) => {
    setDisplayData(passedData);
  };

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
      <MyTrayTable
        data={displayData}
        addToDataClaim={addToDataClaim}
        dataToClaim={dataToClaim}
      />
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

// using this components to use modals
export default function MyTray() {
  return (
    <WithToast>
      <MyTrayComp />
    </WithToast>
  );
}
