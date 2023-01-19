/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import WithToast from "../../../modals/Toast";
import Button1 from "../../general/Button1";
import MyTrayTable from "./MyTrayTable";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import { api } from "../../../helpers/api";
import { calculateNextStep } from "../IFDPipeHelpers";

function MyTrayComp({ setMessage }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);
  const [changed, setChanged] = useState([]);

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

  useEffect(() => {
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
      return setMessage({ txt: "No pipes selected", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    if (dataToSend.some((x) => x.status === "S-Design"))
      return setMessage({ txt: "Some pipe is complete", type: "warn" });
    if (
      dataToSend.some(
        (x) =>
          calculateNextStep(x.status, x.type) === "sdesign" &&
          !x.valve &&
          !x.instrument &&
          !x.NA
      )
    ) {
      return setMessage({
        txt: "Action needs to be marked before marking as complete",
        type: "warn",
      });
    }
    const { ok } = await api("post", "/ifd/next_step", 0, {
      data: dataToSend,
    });
    if (ok) {
      const tempData = data.filter((x) => !dataToClaim.includes(x.id));
      setData(tempData);
      filter(tempData);
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const returnPipe = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to return", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    if (dataToSend.some((x) => x.status.toLowerCase().includes("modelled")))
      return setMessage({ txt: "Some pipe can't be returned", type: "warn" });
    const { ok } = await api("post", "/ifd/return", 0, {
      data: dataToSend,
    });
    if (ok) {
      const tempData = data.filter((x) => !dataToClaim.includes(x.id));
      setData(tempData);
      filter(tempData);
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const filter = (passedData) => {
    setDisplayData(passedData);
  };

  const handleClick = ({ target }, id) => {
    const { name } = target;
    const tempData = [...data];
    const idx = data.findIndex((x) => x.id === id);
    const tempRow = { ...tempData[idx] };
    // if name NA
    if (name === "NA") {
      // unselect V and I
      tempRow.valve = 0;
      tempRow.instrument = 0;
      // select NA
      tempRow.NA = tempRow.NA ? 0 : 1;
    } else {
      // else unselect NA
      tempRow.NA = 0;
      // select V or I
      tempRow[name] = tempRow[name] ? 0 : 1;
    }
    tempData[idx] = tempRow;
    addToChanged(id);
    setData(tempData);
    filter(tempData);
  };

  const addToChanged = (id) => {
    const tempChanged = [...changed];
    if (tempChanged.includes(id)) return;
    tempChanged.push(id);
    setChanged(tempChanged);
  };

  const undo = () => {
    getMyPipes();
    setChanged([]);
  };

  const submitChanges = async () => {
    if (changed.length < 1)
      return setMessage({ txt: "No changes to save", type: "warn" });
    const dataToSend = data.filter((x) => changed.includes(x.id));
    const { ok } = await api("post", "/ifd/change_actions", 0, {
      data: dataToSend,
    });
    if (ok) {
      setChanged([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  return (
    <div css={myTrayStyle}>
      <div className="head">
        <div className="flexCenter">
          <Button1
            text="Undo"
            onClick={undo}
            width="130px"
            border="1px solid black"
            margin="0 10px 0 0"
          />
          <Button1
            text="Save"
            onClick={submitChanges}
            width="130px"
            border="1px solid black"
            margin="0 10px 0 0"
          />
        </div>
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
        handleClick={handleClick}
        changed={changed}
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
