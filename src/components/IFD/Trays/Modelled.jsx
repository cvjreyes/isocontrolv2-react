/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect, useContext } from "react";

import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import { AuthContext } from "../../../context/AuthContext";
import TrayTable from "../TrayTable/TrayTable";

function ModelledComp({ setMessage }) {
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});

  useEffect(() => {
    const getModelledIFDPipes = async () => {
      const { body: pipes } = await api(
        "get",
        "/ifd/get_ifd_pipes_from_tray/modelled"
      );
      const rows = pipes.map((row) => ({
        ...row,
        tag: buildTag(row),
        updated_at: buildDate(row),
      }));
      setData(rows);
      setDisplayData(rows);
    };
    getModelledIFDPipes();
  }, []);

  useEffect(() => {
    // cuando escrbimos en el filtro => actualizar displayData
    filter();
  }, [filterInfo]);

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
    let tempData = passedData || [...data];
    console.log(tempData);
    if (Object.values(filterInfo).every((x) => !x))
      return setDisplayData(tempData);
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
      } // filters key get added to exists array, then it checks with filterInfo. if same length means MATCH
      if (exists.length === Object.keys(filterInfo).length) {
        resultData.push(item);
      }
    });
    setDisplayData(resultData);
  };

  const selectAll = () => {
    const rows = data.filter((x) => !x.owner);
    if (dataToClaim.length === rows.length) return setDataToClaim([]);
    setDataToClaim(rows.map((x) => x.id));
  };

  const handleFilter = (keyName, val) => {
    // if no value in filter input => remove key from filterInfo
    if (!val) {
      let tempFilterInfo = { ...filterInfo };
      // tempFilterInfo[keyName] = keyName;
      delete tempFilterInfo[keyName];
      return setFilterInfo(tempFilterInfo);
    } // else add it
    setFilterInfo({ ...filterInfo, [keyName]: val });
  };

  const orderBy = (e) => {
    let tempData = [...data];
    if (e.value === "old") {
      tempData.sort((a, b) => new Date(a.updated_at) - new Date(b.updated_at));
    } else if (e.value === "new") {
      tempData.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    }
    setData(tempData);
    filter(tempData);
  };

  return (
    <TrayTable
      title="Modelled"
      data={displayData}
      handleClaim={handleClaim}
      addToDataClaim={addToDataClaim}
      dataToClaim={dataToClaim}
      selectAll={selectAll}
      filter={handleFilter}
      filterInfo={filterInfo}
      orderBy={orderBy}
    />
  );
}

// using this components to use modals
export default function Modelled() {
  return (
    <WithToast>
      <ModelledComp />
    </WithToast>
  );
}
