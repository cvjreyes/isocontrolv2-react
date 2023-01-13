import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router";

import WithModal from "../../../modals/YesNo";
import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";
import {
  buildLineRef,
  buildTag,
  divideLineReference,
  getTypeFromDiameter,
} from "../../FEED/feedPipesHelpers";
import IFDTableWrapper from "./IFDTableWrapper";
import CopyContext from "../../../context/CopyContext";
import Loading from "../../general/Loading";

function IFDMainComp({ setMessage, setModalContent }) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
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

  // paste

  // copyall

  // submit changes

  // add rows

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route
          path="/"
          element={
            <CopyContext data={displayData} id={"ifd"}>
              <IFDTableWrapper
                title="IFD"
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
                // ! MISSSING
                copied={[]}
                // submitChanges={submitChanges}
                // copyAll={copyAll}
                // handlePaste={handlePaste}
              />
            </CopyContext>
          }
        />
        <Route
          path="/add"
          element={
            <div></div>
            // <AddPipe
            //   lineRefs={lineRefs}
            //   areas={areas}
            //   diameters={diameters}
            //   setMessage={setMessage}
            //   data={data}
            // />
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
