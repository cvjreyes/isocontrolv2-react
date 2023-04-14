import React, { useEffect, useState } from "react";

import MyTrayHead from "./MyTrayHead";
import MyTrayTable from "./MyTrayTable";

import WithToast from "../../../modals/Toast";
import ReturnToTray from "../../../modals/ReturnToTray";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import { api } from "../../../helpers/api";

function MyTrayComp({ setMessage }) {
  const [data, setData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);
  const [isModalOpen, setOpenModal] = useState(false);
  const [pipe, setPipe] = useState(null);

  const getMyPipes = async () => {
    const { body: pipes } = await api("get", "/ifc/get_my_pipes");
    const rows = pipes.map((row) => ({
      ...row,
      tag: buildTag(row),
      updated_at: buildDate(row),
    }));
    setData(rows);
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
  };

  const unclaim = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to unclaim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifc/unclaim_pipes", {
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
    if (dataToSend.some((x) => x.status === "Issued"))
      return setMessage({ txt: "Some pipe already completed", type: "warn" });
    const { ok, body } = await api("post", "/ifc/next_step", {
      data: dataToSend,
    });
    console.log({ ok, body });
    if (ok) {
      const tempData = data.filter((x) => !dataToClaim.includes(x.id));
      setData(tempData);
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: body, type: "error" });
  };

  const returnPipe = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to return", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    if (dataToSend.some((x) => x.status.toLowerCase().includes("design")))
      return setMessage({ txt: "Some pipe can't be returned", type: "warn" });
    const { ok } = await api("post", "/ifc/return", {
      data: dataToSend,
    });
    if (ok) {
      const tempData = data.filter((x) => !dataToClaim.includes(x.id));
      setData(tempData);
      setDataToClaim([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const selectAll = () => {
    if (dataToClaim.length === data.length) return setDataToClaim([]);
    setDataToClaim(data.map((x) => x.id));
  };

  const returnToTray = (i) => {
    setOpenModal(!isModalOpen);
    setPipe(data[i]);
  };

  return (
    <div>
      <MyTrayHead
        unclaim={unclaim}
        nextStep={nextStep}
        returnPipe={returnPipe}
      />
      <MyTrayTable
        data={data}
        addToDataClaim={addToDataClaim}
        dataToClaim={dataToClaim}
        selectAll={selectAll}
        getMyPipes={getMyPipes}
        returnToTray={returnToTray}
      />
      {isModalOpen && (
        <ReturnToTray
          closeModal={() => setOpenModal(false)}
          pipe={pipe}
          getMyPipes={getMyPipes}
        />
      )}
    </div>
  );
}

// using this components to use modals
export default function MyTray() {
  return (
    <WithToast>
      <MyTrayComp />
    </WithToast>
  );
}
