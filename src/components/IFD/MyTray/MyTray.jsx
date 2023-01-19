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
// - next step update data
// - return functionality
// - return update data

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
        in_isotracker: row.status.includes("S-Design") ? "Yes" : "No",
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

  const updatePipesUnclaim = () => {
    let results = [];
    data.forEach((x) => {
      if (!dataToClaim.includes(x.id)) {
        results.push(x);
      }
    });
    setData(results);
    filter(results);
  };

  const updatePipesNextStep = () => {
    console.log("yes");
  };

  const unclaim = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to unclaim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifd/unclaim_ifd_pipes", 0, {
      data: dataToSend,
    });
    if (ok) {
      updatePipesUnclaim();
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const nextStep = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to unclaim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    if (dataToSend.some((x) => x.status === "S-Design"))
      return setMessage({ txt: "Some pipe is complete", type: "warn" });
    const { ok } = await api("post", "/ifd/next_step", 0, {
      data: dataToSend,
    });
    if (ok) {
      updatePipesNextStep();
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const returnPipe = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to unclaim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifd/return", 0, {
      data: dataToSend,
    });
    if (ok) {
      updatePipesNextStep();
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

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
            width="130px"
            border="1px solid black"
            margin="0 10px 0 0"
          />
          <Button1
            text="Next Step"
            onClick={nextStep}
            width="130px"
            border="1px solid black"
            margin="0 10px 0 0"
          />
          <Button1
            text="Return"
            onClick={returnPipe}
            width="130px"
            border="1px solid black"
            margin="0 10px 0 0"
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
