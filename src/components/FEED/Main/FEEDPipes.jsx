import React, { useState, useEffect, Suspense, useLayoutEffect } from "react";
import Loading from "react-loading";
import { Route, Routes, useLocation } from "react-router-dom";

import {
  buildTag,
  divideLineReference,
  buildFeedRow,
  buildLineRef,
  divideTag,
  checkForAlreadyExists,
  checkForEmptyCells,
} from "../feedPipesHelpers";
import FeedPipesExcelTableWrapper from "./FeedPipesExcelTableWrapper";
import CopyContext from "../../../context/CopyContext";
import WithModal from "../../../modals/YesNo";
import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import AddPipe from "../AddPipe/AddPipe";
import { columnsData } from "../ColumnsData";

function FeedPipesExcelComp({ setMessage, setModalContent }) {
  const location = useLocation();

  const gridSize = "1fr 4fr 7fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr";
  const id = "feed";
  const page = "line_control";

  const [progress, setProgress] = useState(0);
  const [data, setData] = useState(null);
  const [displayData, setDisplayData] = useState(null);
  const [areas, setAreas] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const [changed, setChanged] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [isViewMode, setIsViewMode] = useState(true);

  const getFeedPipes = async () => {
    const { body: rows } = await api("get", "/feed/get_all_pipes");
    const rows2 = rows.map((row) => ({
      ...row,
      tag: buildTag(row),
      ifd_modelled: row.ifd_status === "FEED_ESTIMATED",
    }));
    setData(rows2);
    setDisplayData(rows2);
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
        api("get", "/feed/get_progress"),
      ]).then((values) => {
        setAreas(values[0].body.map((item) => item.name));
        setLineRefs(values[1].body);
        setProgress(values[2].body);
      });
    };
    getThings();
    getFeedPipes();
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

  const submitChanges = async () => {
    // abstract this into verifyRows or sth
    if (changed.length < 1)
      return setMessage({ txt: "No changes to save", type: "success" });
    const dataToSend = data.filter((x) => changed.includes(x.id));
    const stop = checkForAlreadyExists(dataToSend);
    if (stop) return setMessage({ txt: "Repeated pipe!", type: "warn" });
    const stop2 = checkForEmptyCells(dataToSend);
    if (stop2) return setMessage({ txt: "Some cells are empty", type: "warn" });
    const { ok } = await api("post", "/feed/submit_pipes", {
      data: dataToSend,
    });
    if (ok) {
      setChanged([]);
      setTimeout(async () => {
        const { body } = await api("get", "/feed/get_progress");
        setProgress(body);
      }, 100);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const deleteLine = async (id) => {
    const idx = data.findIndex((x) => x.id === id);
    const { ok } = await api("delete", `/feed/delete_pipe/${id}`);
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
      changedRow.tag = buildTag(changedRow);
    } else {
      // cualquier cosa que haya cambiado => hacer el rebuild del lineRef
      changedRow.line_reference = buildLineRef(changedRow);
      changedRow.tag = buildTag(changedRow);
    }
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

  const handlePaste = (e, i, id) => {
    e.preventDefault();
    e.stopPropagation();
    const name = e.target.name ? e.target.name : e.target.id;
    const pastedData = e.clipboardData.getData("Text").split("\t");
    if (pastedData.length === 1) {
      let ind = pastedData.indexOf("\r");
      pastedData[0] = pastedData[0].slice(0, ind);
      return pasteCell(name, i, pastedData[0]);
    } else if (pastedData.length === 12) {
      return pasteRow(e, id);
    } else if (pastedData.length > 12) {
      return pasteMultipleRows(e, i);
    }
  };

  const pasteCell = (name, i, pastedData) => {
    const tempData = [...data];
    const idx = tempData.findIndex((item) => item.id === displayData[i].id);
    let changedRow = { ...tempData[idx] };
    changedRow[name] = pastedData;
    if (name === "line_reference") {
      const values = divideLineReference(pastedData, lineRefs);
      changedRow = { ...changedRow, ...values };
    } else if (name === "tag") {
      // divide tag
      const dividedTag = divideTag(pastedData);
      // update rest
      changedRow = { ...changedRow, ...dividedTag };
    } else {
      changedRow.tag = buildTag(changedRow);
      changedRow.line_reference = buildLineRef(changedRow);
    }
    if (data.some((x) => x.tag === changedRow.tag && x.id !== tempData[idx].id))
      changedRow.tag = "Already exists";
    tempData[idx] = changedRow;
    addToChanged(changedRow.id);
    filter(tempData);
    setData(tempData);
  };

  const pasteRow = (e, id) => {
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...data];
      let lines = text.split("\n");
      lines.forEach((line) => {
        if (line.length < 1) return;
        const y = tempData.findIndex((item) => item.id === id);
        let row = line.split("\t");
        const builtRow = buildFeedRow(row, id);
        if (data.some((x) => x.tag === builtRow.tag && x.id !== id))
          builtRow.tag = "Already exists";
        tempData[y] = { ...tempData[y], ...builtRow };
      });
      addToChanged(id);
      filter(tempData);
      setData(tempData);
    });
  };

  const pasteMultipleRows = (e, i) => {
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...data];
      // get rows as strings
      let lines = text.split("\n");
      lines.pop();
      let toAdd = [];
      // loop each row
      lines.forEach((line, x) => {
        // get idx of iterated element in data
        const y = tempData.findIndex(
          (item) => item.id === displayData[i + x].id
        );
        // get row in form of array
        let row = line.split("\t");
        // build row as object
        const builtRow = buildFeedRow(row, tempData[y].id);
        // check for repeated tag
        if (data.some((x) => x.tag === builtRow.tag && x.id !== tempData[y].id))
          builtRow.tag = "Already exists";
        // update tempData
        tempData[y] = { ...tempData[y], ...builtRow };
        toAdd.push(displayData[i + x].id);
      });
      addToChanged(toAdd);
      filter(tempData);
      setData(tempData);
    });
  };

  const handleDelete = (e, id, trashed, tag) => {
    if (!deleting || trashed) return;
    e.stopPropagation();
    e.preventDefault();
    setModalContent({
      openModal: true,
      text: `Are you sure you want to delete the following row: ${tag}`,
      onClick1: () => deleteLine(id),
    });
  };

  const undoChanges = () => {
    getFeedPipes();
    setChanged([]);
    setFilterInfo({});
    setMessage({
      txt: changed.length < 1 ? "No changes to undo!" : "Changes undone!",
      type: changed.length < 1 ? "warn" : "success",
    });
  };

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <CopyContext data={displayData} id={"feed"}>
              <FeedPipesExcelTableWrapper
                title="FEED"
                displayData={displayData}
                lineRefs={lineRefs}
                areas={areas}
                handleChange={handleChange}
                filter={handleFilter}
                handlePaste={handlePaste}
                filterInfo={filterInfo}
                id={id}
                page={page}
                changed={changed}
                submitChanges={submitChanges}
                deleting={deleting}
                setDeleting={setDeleting}
                handleDelete={handleDelete}
                undoChanges={undoChanges}
                gridSize={gridSize}
                setMessage={setMessage}
                progress={progress}
                setIsViewMode={setIsViewMode}
                isViewMode={isViewMode}
              />
            </CopyContext>
          }
        />
        <Route
          path="/add"
          element={
            <AddPipe
              lineRefs={lineRefs}
              setMessage={setMessage}
              data={data}
              columns={columnsData(
                lineRefs.map((x) => x.line_ref),
                areas
              )}
              id={id}
              page={page}
              gridSize={gridSize}
              buildRow={buildFeedRow}
            />
          }
        />
      </Routes>
    </Suspense>
  );
}

// using this components to use modals
export default function FeedPipesExcel() {
  return (
    <WithToast>
      <WithModal>
        <FeedPipesExcelComp />
      </WithModal>
    </WithToast>
  );
}
