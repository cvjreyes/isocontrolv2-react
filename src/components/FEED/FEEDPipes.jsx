import React, { useState, useEffect, Suspense } from "react";
import Loading from "react-loading";

import {
  buildTag,
  divideLineReference,
  buildRow,
  buildLineRef,
  divideTag,
  checkForAlreadyExists,
  checkForEmptyCells,
  getTypeFromDiameter,
} from "./feedPipesHelpers";
import FeedPipesExcelTableWrapper from "./FeedPipesExcelTableWrapper";
import CopyContext from "../../context/CopyContext";
import WithModal from "../../modals/YesNo";
import WithToast from "../../modals/Toast";
import { api } from "../../helpers/api";

function FeedPipesExcelComp({ setMessage, setModalContent }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [diameters, setDiameters] = useState(null);
  const [areas, setAreas] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const [changed, setChanged] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const getFeedPipes = async () => {
    const { body: rows } = await api("get", "/feed/get_feed_pipes");
    rows.map((row) => (row.tag = buildTag(row)));
    setData(rows);
    setDisplayData(rows);
  };

  // ! promise all?
  useEffect(() => {
    const getAllAreas = async () => {
      const res = await api("get", "/api/areas", true);
      const areas_options = res.map((item) => item.name);
      setAreas(areas_options);
    };
    const getDiameters = async () => {
      const { diameters: resDia } = await api("get", "/api/diameters", true);
      const tempDiameters = resDia.map((item) => item.diameter);
      setDiameters(tempDiameters);
    };
    const getLineRefs = async () => {
      const { body: tempLineRefs } = await api("get", "/lines/get_lines");
      setLineRefs(tempLineRefs);
    };
    getAllAreas();
    getDiameters();
    getLineRefs();
    getFeedPipes();
  }, []);

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
    const { ok } = await api(
      "post",
      "/feed/submit_feed_pipes",
      0,
      { data: dataToSend },
      setMessage
    );
    if (ok) {
      setChanged([]);
      // ! update rows or not, thant's the question
      // pros: if error in DB always be detected in UI
      // cons: errors should not be located like that + time & server consuming
      // rows.map((row) => (row.tag = buildTag(row)));
      // setData(rows);
      // filter();
      // getFeedPipes();
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const deleteLine = async (id) => {
    const idx = data.findIndex((x) => x.id === id);
    await api("delete", `/feed/delete_pipe/${id}`);
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
    if (name === "diameter") {
      changedRow.type = getTypeFromDiameter(value, changedRow.calc_notes);
    } else if (name === "line_reference") {
      const values = divideLineReference(value, lineRefs);
      changedRow = { ...changedRow, ...values };
      // cualquier cosa que haya cambiado => hacer el rebuild del tag
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
    if (name === "diameter") {
      changedRow.type = getTypeFromDiameter(pastedData, changedRow.calc_notes);
    } else if (name === "line_reference") {
      // divide line ref ( get u, fl, seq )
      const values = divideLineReference(changedRow[name], lineRefs);
      // update fields
      changedRow = { ...changedRow, ...values };
      // update tag
      changedRow.tag = buildTag(changedRow);
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
        const builtRow = buildRow(row, id);
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
        const builtRow = buildRow(row, tempData[y].id);
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

  const handleDelete = (e, id) => {
    if (!deleting) return;
    e.stopPropagation();
    e.preventDefault();
    setModalContent({
      openModal: true,
      text: `Are you sure you want to delete row with ID: ${id}?`,
      onClick1: () => deleteLine(id),
    });
  };

  const undoChanges = () => {
    setChanged([]);
    getFeedPipes();
    setFilterInfo({});
  };

  const goToAddPage = () => {
    console.log("go to add page");
  };

  return (
    <Suspense fallback={<Loading />}>
      <CopyContext data={displayData} id={"feed"}>
        <FeedPipesExcelTableWrapper
          title="Line Control"
          displayData={displayData}
          lineRefs={lineRefs}
          areas={areas}
          diameters={diameters}
          handleChange={handleChange}
          filter={handleFilter}
          handlePaste={handlePaste}
          filterInfo={filterInfo}
          id={"feed"}
          changed={changed}
          submitChanges={submitChanges}
          deleting={deleting}
          setDeleting={setDeleting}
          handleDelete={handleDelete}
          undoChanges={undoChanges}
          goToAddPage={goToAddPage}
        />
      </CopyContext>
    </Suspense>
  );
}

// using this components to use modals
export default function FeedPipesExcel({ setMessage }) {
  return (
    <WithToast>
      <WithModal>
        <FeedPipesExcelComp />
      </WithModal>
    </WithToast>
  );
}
