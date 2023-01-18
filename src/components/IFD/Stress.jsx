/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect, useContext } from "react";

import WithToast from "../../modals/Toast";
import { api } from "../../helpers/api";
import { buildDate, buildTag } from "../FEED/feedPipesHelpers";
import { AuthContext } from "../../context/AuthContext";
import TrayTable from "./TrayTable";

function StressComp({ setMessage }) {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);

  useEffect(() => {
    getStressIFDPipes();
  }, []);

  const getStressIFDPipes = async () => {
    const { body: pipes } = await api("get", "/ifd/get_ifd_pipes_from_tray/stress");
    const rows = pipes.map((row) => ({
      ...row,
      tag: buildTag(row),
      updated_at: buildDate(row),
    }));
    setData(rows);
    setDisplayData(rows);
  };

  const updatePipesDisplay = () => {
    const tempData = [...data];
    tempData.map((x) => {
      if (dataToClaim.includes(x.id)) {
        x.owner = user.name;
      }
    });
    setData(tempData);
    filter(tempData);
  };

  const handleClaim = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to claim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifd/claim_ifd_pipes", 0, {
      data: dataToSend,
    });
    if (ok) {
      updatePipesDisplay();
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const addToDataClaim = (id) => {
    const tempDataToClaim = [...dataToClaim];
    const index = tempDataToClaim.indexOf(id);

    if (index > -1) {
      // only splice array when item is found
      tempDataToClaim.splice(index, 1); // 2nd parameter means remove one item only
    } else {
      tempDataToClaim.push(id);
    }

    setDataToClaim(tempDataToClaim);
  };

  const filter = (passedData) => {
    setDisplayData(passedData);
  };

  return (
    <TrayTable
      title="S-Stress"
      data={displayData}
      handleClaim={handleClaim}
      addToDataClaim={addToDataClaim}
      dataToClaim={dataToClaim}
    />
  );
}

// using this components to use modals
export default function Stress() {
  return (
    <WithToast>
      <StressComp />
    </WithToast>
  );
}
