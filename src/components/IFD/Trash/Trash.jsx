/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect, useContext } from "react";

import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import TrayTable from "../TrayTable/TrayTable";

function TrashComp({ setMessage }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [dataToClaim, setDataToClaim] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});

  useEffect(() => {
    const getTrashedIFDPipes = async () => {
      const { body: pipes } = await api("get", "/ifd/get_ifd_pipes/1");
      const rows = pipes.map((row) => ({
        ...row,
        tag: buildTag(row),
        updated_at: buildDate(row),
      }));
      setData(rows);
      setDisplayData(rows);
    };
    getTrashedIFDPipes();
  }, []);

  useEffect(() => {
    // cuando escrbimos en el filtro => actualizar displayData
    filter();
  }, [filterInfo]);

  const updatePipesDisplay = () => {
    const tempData = data.filter((x) => !dataToClaim.includes(x.id));
    setData(tempData);
    filter(tempData);
  };

  const handleTrash = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to restore", type: "warn" });
    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));
    const { ok } = await api("post", "/ifd/restore_ifd_pipes", 0, {
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
    const rows = data.filter((x) => !x.owner);
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

  return (
    <TrayTable
      title="Trash"
      data={displayData}
      handleClaim={handleTrash}
      addToDataClaim={addToDataClaim}
      dataToClaim={dataToClaim}
      buttonText="Restore"
      selectAll={selectAll}
      filter={handleFilter}
      filterInfo={filterInfo}
    />
  );
}

// using this components to use modals
export default function Trash() {
  return (
    <WithToast>
      <TrashComp />
    </WithToast>
  );
}
