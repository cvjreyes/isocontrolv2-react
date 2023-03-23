/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect, useContext } from "react";

import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import { AuthContext } from "../../../context/AuthContext";
import TrayTable from "../TrayTable/TrayTable";
import { userHasRoles } from "../../../helpers/user";

function IssuerComp({ setMessage }) {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});

  useEffect(() => {
    getIssuerIFCPipes();
  }, []);

  useEffect(() => {
    // cuando escrbimos en el filtro => actualizar displayData
    filter();
  }, [filterInfo]);

  const getIssuerIFCPipes = async () => {
    const { body: pipes } = await api("get", "/ifc/get_pipes_from_tray/issuer");
    const rows = pipes.map((row) => ({
      ...row,
      tag: buildTag(row),
      updated_at: buildDate(row),
    }));
    setData(rows);
    setDisplayData(rows);
  };

  const updatePipesDisplay = (claim) => {
    const tempData = [...data];
    tempData.map((x) => {
      if (dataToClaim.includes(x.id)) {
        x.owner = claim ? user.name : null;
      }
    });
    setData(tempData);
    filter(tempData);
    setDataToClaim([]);
    return setMessage({ txt: "Changes saved!", type: "success" });
  };

  const handleClaim = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to claim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifc/claim_pipes", {
      data: dataToSend,
    });
    if (ok) {
      return updatePipesDisplay(true);
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const handleUnclaim = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to claim", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifc/unclaim_pipes", {
      data: dataToSend,
    });
    if (ok) {
      return updatePipesDisplay(false);
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

  const filter = () => {
    if (Object.values(filterInfo).every((x) => !x)) return setDisplayData(data);
    let tempData = [...data];
    let resultData = [];
    tempData.forEach((item) => {
      let exists = [];
      // loop through filters keys
      for (let key in filterInfo) {
        if (
          item[key] &&
          item[key]
            .toString()
            .toLowerCase()
            .includes(filterInfo[key].toLowerCase())
        ) {
          exists.push(key);
        }
      }
      if (exists.length === Object.keys(filterInfo).length) {
        resultData.push(item);
      }
    });
    setDisplayData(resultData);
  };

  const selectAll = () => {
    const rows = userHasRoles(user, ["Speciality Lead"])
      ? [...data]
      : data.filter((x) => !x.owner);
    if (dataToClaim.length === rows.length) return setDataToClaim([]);
    setDataToClaim(rows.map((x) => x.id));
  };

  const handleFilter = (keyName, val) => {
    if (!val) {
      let tempFilterInfo = { ...filterInfo };
      // tempFilterInfo[keyName] = keyName;
      delete tempFilterInfo[keyName];
      setFilterInfo(tempFilterInfo);
    }
    setFilterInfo({ ...filterInfo, [keyName]: val });
  };

  const orderBy = (e) => {
    let tempData = [...data];
    if (e.value === "old") {
      tempData.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    } else if (e.value === "new") {
      tempData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    } else if (e.value === "asc") {
      tempData.sort((a, b) => (a.tag > b.tag ? 1 : b.tag > a.tag ? -1 : 0));
    } else if (e.value === "desc") {
      tempData.sort((a, b) => (b.tag > a.tag ? 1 : a.tag > b.tag ? -1 : 0));
    }
    setData(tempData);
    filter(tempData);
  };

  return (
    <TrayTable
      title="Issuer"
      data={displayData}
      handleUnclaim={handleUnclaim}
      handleClaim={handleClaim}
      addToDataClaim={addToDataClaim}
      dataToClaim={dataToClaim}
      selectAll={selectAll}
      filter={handleFilter}
      filterInfo={filterInfo}
      orderBy={orderBy}
      getData={getDesignIFCPipes}
      setMessage={setMessage}
    />
  );
}

// using this components to use modals
export default function Issuer() {
  return (
    <WithToast>
      <IssuerComp />
    </WithToast>
  );
}
