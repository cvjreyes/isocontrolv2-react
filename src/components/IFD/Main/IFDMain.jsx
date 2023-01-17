import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import WithModal from "../../../modals/YesNo";
import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import {
  buildLineRef,
  buildTag,
  checkForAlreadyExists,
  checkForEmptyCells,
  divideLineReference,
  getTypeFromDiameter,
} from "../../FEED/feedPipesHelpers";
import IFDTableWrapper from "./IFDTableWrapper";
import CopyContext from "../../../context/CopyContext";
import Loading from "../../general/Loading";
import AddPipe from "../../FEED/AddPipe/AddPipe";
import { columnsData } from "../ColumnsData";

function IFDMainComp({ setMessage, setModalContent }) {
  const gridSize =
    "1fr 4fr 7fr 1.5fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr";
  const gridSizeAdd = "1fr 4fr 7fr 1.5fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr";
  const id = "ifd";
  const page = "main";

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [feedPipes, setFeedPipes] = useState([]);
  const [areas, setAreas] = useState(null);
  const [diameters, setDiameters] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [owners, setOwners] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const [changed, setChanged] = useState([]);
  const [deleting, setDeleting] = useState(false);

  // const getRoles = async () => {
  //   const { body } = await api("get", "/users/get_user_roles", false);
  //   setRoles(body.roles);
  // };

  const getIFDPipes = async () => {
    const { body: pipes } = await api("get", "/ifd/get_ifd_pipes");
    const rows = pipes.map((row) => ({
      ...row,
      tag: buildTag(row),
    }));
    setData(rows);
  };

  const getFeedPipes = async () => {
    const { body: rows } = await api("get", "/feed/get_feed_pipes");
    rows.map((row) => (row.tag = buildTag(row)));
    setFeedPipes(rows);
  };

  useEffect(() => {
    const getThings = async () => {
      await Promise.all([
        api("get", "/api/areas", true),
        api("get", "/api/diameters", true),
        api("get", "/lines/get_lines"),
        api("get", "/users/get_owners"),
        api("get", "/ifd/get_ifd_pipes"),
      ]).then((values) => {
        setAreas(values[0].map((item) => item.name));
        setDiameters(values[1].diameters.map((item) => item.diameter));
        setLineRefs(values[2].body);
        setOwners(values[3].body);
        const rows = values[4].body.map((row) => ({
          ...row,
          tag: buildTag(row),
        }));
        setData(rows);
        setDisplayData(rows);
      });
    };
    getFeedPipes();
    getThings();
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

  const deleteLine = async (id) => {
    const idx = data.findIndex((x) => x.id === id);
    await api("delete", `/ifd/delete_pipe/${id}`);
    const tempData = [...data];
    tempData.splice(idx, 1);
    setData(tempData);
    filter(tempData);
  };

  const undoChanges = () => {
    setChanged([]);
    getIFDPipes();
    setFilterInfo({});
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

  const submitChanges = async () => {
    // abstract this into verifyRows or sth
    if (changed.length < 1)
      return setMessage({ txt: "No changes to save", type: "success" });
    const dataToSend = data.filter((x) => changed.includes(x.id));
    const stop = checkForAlreadyExists(dataToSend);
    if (stop) return setMessage({ txt: "Repeated pipe!", type: "warn" });
    const stop2 = checkForEmptyCells(dataToSend);
    if (stop2) return setMessage({ txt: "Some cells are empty", type: "warn" });
    const { ok } = await api("post", "/ifd/submit_ifd_pipes", 0, {
      data: dataToSend,
    });
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

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <CopyContext data={displayData} id={id}>
              <IFDTableWrapper
                title="IFD"
                id={id}
                page={page}
                lineRefs={lineRefs}
                areas={areas}
                diameters={diameters}
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
                // handlePaste={handlePaste}
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
              data={[...data, ...feedPipes]}
              columns={columnsData(
                lineRefs.map((x) => x.line_ref),
                areas,
                diameters,
                owners.map((x) => x.name)
              ).slice(0, -1)}
              id={id}
              page={page}
              gridSize={gridSizeAdd}
            />
          }
        />
      </Routes>
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
