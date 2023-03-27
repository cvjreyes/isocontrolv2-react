import React, { Suspense, useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router";

import WithModal from "../../../modals/YesNo";
import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import {
  buildLineRef,
  buildTag,
  checkForAlreadyExists,
  checkForEmptyCells,
  divideLineReference,
  divideTag,
} from "../../FEED/feedPipesHelpers";
import IFCTableWrapper from "./IFCTableWrapper";
import CopyContext from "../../../context/CopyContext";

import loadingGif from "../../../assets/gifs/loading.gif";

function IFDMainComp({ setMessage, setModalContent }) {
  const location = useLocation();
  const gridSize =
    "1fr 4fr 7fr 1.5fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr";
  const id = "ifc";
  const page = "main";
  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [areas, setAreas] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [owners, setOwners] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const [changed, setChanged] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);

  const getIFDPipes = async () => {
    const { body: pipes } = await api("get", "/ifc/get_some_pipes/0");
    const rows = pipes.map((row) => ({
      ...row,
      tag: buildTag(row),
    }));
    setData(rows);
    filter(rows);
  };

  const resetMode = () => {
    setDeleting(false);
    setIsViewMode(true);
  };

  useLayoutEffect(() => {
    const getThings = async () => {
      await Promise.all([
        api("get", "/areas/get_all"),
        api("get", "/lines/get_lines"),
        api("get", "/users/get_owners"),
        api("get", "/ifc/get_progress"),
        api("get", "/ifc/get_some_pipes/0"),
      ]).then((values) => {
        setAreas(values[0].body.map((item) => item.name));
        setLineRefs(values[1].body);
        setOwners(values[2].body);
        setProgress(values[3].body);
        const rows = values[4].body.map((row) => ({
          ...row,
          tag: buildTag(row),
        }));
        setData(rows);
        setDisplayData(rows);
      });
    };
    getThings();
    resetMode();
  }, [location]);

  useEffect(() => {
    // cuando escrbimos en el filtro => actualizar displayData
    filter();
  }, [filterInfo]);

  const handleFilter = (keyName, val) => {
    if (keyName in filterInfo && !val) {
      let tempFilterInfo = { ...filterInfo };
      tempFilterInfo[keyName] = keyName;
      setFilterInfo(tempFilterInfo);
    }
    setFilterInfo({ ...filterInfo, [keyName]: val });
  };

  const filter = async (passedData) => {
    if (Object.values(filterInfo).every((x) => !x) && !passedData)
      return setDisplayData(data);
    let tempData = passedData || [...data];
    let resultData = [];
    tempData.forEach((item) => {
      let exists = [];
      // loop through filters keys
      for (let key in filterInfo) {
        if (
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

  const handleChange = ({ target }, id) => {
    // get name of changed key and its value
    const { name, value } = target;
    // copy data from state
    const tempData = [...data];
    // find idx of passed id in data
    const idx = tempData.findIndex((x) => x.id === id);
    // get the changed row obj from data
    let changedRow = tempData[idx];
    // change the value of the key in the row
    changedRow[name] = value;
    if (name === "line_reference") {
      const values = divideLineReference(value, lineRefs);
      changedRow = { ...changedRow, ...values };
    } else {
      // cualquier cosa que haya cambiado => hacer el rebuild del lineRef
      changedRow.line_reference = buildLineRef(changedRow);
    }
    changedRow.tag = buildTag(changedRow);
    // una vez con el tag cambiado => chequear que no existan 2 tags iguales
    if (data.some((x) => x.tag === changedRow.tag && x.id !== id))
      // si existe un tag igual ponerlo como 'already exists'
      changedRow.tag = "Already exists";
    // update changed row in data copy
    tempData[idx] = changedRow;
    // add changed to changed array
    addToChanged(id);
    // update data
    setData(tempData);
    // call filter function to update displayData
    filter(tempData);
  };

  const addToChanged = (id) => {
    if (typeof id === "string" || typeof id === "number") {
      const tempChanged = [...changed];
      if (tempChanged.includes(id)) return;
      tempChanged.push(id);
      setChanged(tempChanged);
    } else if (typeof id === "object") {
      let toAdd = [];
      id.forEach((x) => !changed.includes(x) && toAdd.push(x));
      var tempChanged = changed.concat(
        toAdd.filter((item) => changed.indexOf(item) < 0)
      );
      setChanged(tempChanged);
    }
  };

  const handleDelete = (e, id, _, tag) => {
    if (!deleting) return;
    e.stopPropagation();
    e.preventDefault();
    setModalContent({
      openModal: true,
      text: `Are you sure you want to delete the following row: ${tag}`,
      onClick1: () => deleteLine(id),
    });
  };

  const deleteLine = async (id) => {
    const idx = data.findIndex((x) => x.id === id);
    const { ok } = await api("delete", `/ifd/delete_pipe/${id}`);
    if (!ok)
      return setMessage({
        txt: "Something went wrong please try again",
        type: "error",
      });
    setMessage({ txt: "Row deleted successfully", type: "success" });
    const tempData = [...data];
    tempData.splice(idx, 1);
    setData(tempData);
    filter(tempData);
  };

  const undoChanges = () => {
    setChanged([]);
    getIFDPipes();
    setFilterInfo({});
    setMessage({
      txt: changed.length < 1 ? "No changes to undo!" : "Changes undone!",
      type: changed.length < 1 ? "warn" : "success",
    });
  };

  const submitChanges = async () => {
    // abstract this into verifyRows or sth
    if (changed.length < 1)
      return setMessage({ txt: "No changes to save", type: "success" });
    const dataToSend = data.filter((x) => changed.includes(x.id));
    const stop = checkForAlreadyExists(dataToSend);
    if (stop) return setMessage({ txt: "Repeated pipe!", type: "warn" });
    const stop2 = checkForEmptyCells(dataToSend);
    if (stop2) return setMessage({ txt: "Some cells are empty", type: "warn" });
    const { ok } = await api("post", "/ifd/submit_pipes", {
      data: dataToSend,
    });
    if (ok) {
      setChanged([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  return (
    <Suspense fallback={<img alt="loading" src={loadingGif} />}>
      <CopyContext data={displayData} id={id}>
        <IFCTableWrapper
          title="IFD"
          id={id}
          page={page}
          lineRefs={lineRefs}
          areas={areas}
          owners={owners}
          displayData={displayData}
          changed={changed}
          filter={handleFilter}
          filterInfo={filterInfo}
          readOnly={true}
          handleChange={handleChange}
          deleting={deleting}
          setDeleting={setDeleting}
          handleDelete={handleDelete}
          undoChanges={undoChanges}
          submitChanges={submitChanges}
          gridSize={gridSize}
          setMessage={setMessage}
          progress={progress}
          setIsViewMode={setIsViewMode}
          isViewMode={isViewMode}
        />
      </CopyContext>
    </Suspense>
  );
}

// using this components to use modals
export default function IFDMain() {
  return (
    <WithToast>
      <WithModal>
        <IFDMainComp />
      </WithModal>
    </WithToast>
  );
}
