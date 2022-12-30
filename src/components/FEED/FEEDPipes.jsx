import React, { useState, useEffect, Suspense, useRef } from "react";
import Loading from "react-loading";

import { buildTag, divideLineReference, buildRow } from "./feedPipesHelpers";
import FeedPipesExcelTableWrapper from "./FeedPipesExcelTableWrapper";
import { URLold } from "../../helpers/config";
import CopyContext from "../../context/CopyContext";
import WithModal from "../../modals/YesNo";
import { columnsData } from "./ColumnsData";

function FeedPipesExcelComp({ alert, setModalContent }) {
  const original = useRef(null);
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [diameters, setDiameters] = useState(null);
  const [areas, setAreas] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});
  const [changed, setChanged] = useState([]);
  const [deleting, setDeleting] = useState(false);

  const getOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const getFeedPipes = async () => {
    try {
      const url = `${URLold}/feedPipes`;
      const res = await fetch(url, getOptions);
      const { rows } = await res.json();
      rows.map((row) => (row.tag = buildTag(row)));
      setData(rows);
      setDisplayData(rows);
      original.current = [...rows];
    } catch (err) {
      console.error(err);
    }
  };

  // ! promise all?
  useEffect(() => {
    const getAllAreas = async () => {
      try {
        const url = `${URLold}/api/areas`;
        const res = await fetch(url, getOptions);
        const resJson = await res.json();
        const areas_options = resJson.map((item) => item.name);
        setAreas(areas_options);
      } catch (err) {
        console.error(err);
      }
    };
    const getDiameters = async () => {
      try {
        const url = `${URLold}/api/diameters`;
        const res = await fetch(url, getOptions);
        const { diameters: resDiameters } = await res.json();
        const tempDiameters = resDiameters.map((item) => item.diameter);
        setDiameters(tempDiameters);
      } catch (err) {
        console.error(err);
      }
    };
    const getLineRefs = async () => {
      try {
        const url = `${URLold}/api/lineRefs`;
        const res = await fetch(url, getOptions);
        const { line_refs: resLineRefs } = await res.json();
        const tempLineRefs = resLineRefs.map((item) => item.line_ref);
        setLineRefs(tempLineRefs);
      } catch (err) {
        console.error(err);
      }
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

  const checkForAlreadyExists = () => {
    return data.some((item) => item.Tag === "Already exists");
  };

  const checkForEmptyCells = () => {
    let haveToBeFilled = [
      "area",
      "diameter",
      "fluid",
      "insulation",
      "line_reference",
      "tag",
      "unit",
      "seq",
      "spec",
      "train",
    ];

    let empty = false;
    for (let i = 0; i < data.length; i++) {
      for (let key in data[i]) {
        if (
          data[i].line_reference !== "deleted" &&
          haveToBeFilled.includes(key) &&
          !data[i][key]
        ) {
          empty = true;
          break;
        }
      }
    }
    return empty;
  };

  // ! testear submit

  const submitChanges = async () => {
    return console.log("submitted");
    // chequear que no haya ningún tag que ponga already exists
    const stop = checkForAlreadyExists();
    if (stop) return alert("Repeated pipe!", "error");
    // mover el chequeo de empty cells a otra función
    const stop2 = checkForEmptyCells();
    if (stop2) return alert("All cells must be filled", "warning");

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rows: data }),
    };
    const url = `${URLold}/submitFeedPipes`;
    const res = await fetch(url, options);
    const resJson = await res.json();
    if (resJson.success) {
      alert("Changes saved!", "success");
      // await this.props.updateData();
    } else alert("Something went wrong", "warning");
  };

  const handleDeleteLine = (idx) => {
    let tempData = [...data];
    let tempRow = { ...tempData[idx] };
    tempRow.line_reference = "deleted";
    tempData[idx] = tempRow;
    setData(tempData);
  };

  const addToChanged = (rowId, key, val, id) => {
    // let real = original.current;
    const tempChanged = [...changed];
    // locate if id exists in changed
    const idx = tempChanged.findIndex((x) => x.rowId === rowId);
    // if not, add it with key
    if (idx < 0) {
      tempChanged.push({ rowId: rowId, keys: [key] });
    } else {
      // find idx in data
      // const idx2 = real.findIndex((x) => x.id === id);
      // if current value === old value
      // ! THIS IS WHATS FAILING WHYYY
      // if (val === real[idx2][key]) {
      //   console.log(val, key);
      //   console.log(real[idx2]);
      //   if key to remove is only one
      // if (tempChanged[idx].keys.length === 1) {
      //      delete row
      //   tempChanged.splice(idx, 1);
      // } else {
      //   else remove key
      // let row = tempChanged[idx];
      // let keys = row.keys;
      // keys.splice(keys.indexOf(key), 1);
      // row.keys = [...keys];
      // tempChanged[idx] = row;
      // }
      // else add it
      // } else {
      let row = tempChanged[idx];
      let keys = row.keys;
      keys.push(key);
      row.keys = [...keys];
      tempChanged[idx] = row;
      // }
    }
    setChanged(tempChanged);
  };

  const handleChange = ({ target }, rowId, id) => {
    const { name, value } = target;
    const tempData = [...data];
    const idx = tempData.findIndex((x) => x.id === id);
    const changedRow = tempData[idx];
    changedRow[name] = value;
    // cualquier cosa que haya cambiado => hacer el rebuild del tag
    const newTag = buildTag(changedRow);
    if (changedRow.tag !== newTag) changedRow.tag = newTag;
    // una vez con el tag cambiado => chequear que no existan 2 tags iguales
    if (data.some((x) => x.tag === newTag && x.id !== id))
      changedRow.tag = "Already exists";
    // si existe un tag igual ponerlo como 'already exists'
    tempData[idx] = changedRow;
    addToChanged(rowId, name, value, id);
    setData(tempData);
    filter(tempData);
  };

  const handlePaste = (e, i, rowId) => {
    e.preventDefault();
    e.stopPropagation();
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...data];
      let lines = text.split("\n");
      lines.forEach((line, x) => {
        if (line.length < 1) return;
        const y = tempData.findIndex(
          (item) => item.id === displayData[i + x].id
        );
        let row = line.split("\t");
        const cellIdx = columnsData().findIndex(
          (col) => col.key === e.target.name
        );
        console.log(cellIdx);
        const builtRow = buildRow(row, tempData[y]);
        // const newTag = buildTag(changedRow);
        // if (builtRow.tag !== newTag) builtRow.tag = newTag;
        // // una vez con el tag cambiado => chequear que no existan 2 tags iguales
        // if (data.some((x) => x.tag === newTag)) builtRow.tag = "Already exists";
        tempData[y] = {
          ...builtRow,
        };
      });
      addToChanged(rowId, "all");
      filter(tempData);
      setData(tempData);
    });
  };

  const handleDelete = (rowId) => {
    setModalContent({
      openModal: true,
      text: `Are you sure you want to delete row with ID: ${rowId}?`,
      onClick1: console.log("yes"),
    });
  };

  useEffect(() => {
    console.log(deleting);
  }, [deleting]);

  return (
    <Suspense fallback={<Loading />}>
      <CopyContext>
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
        />
      </CopyContext>
    </Suspense>
  );
}

// using this components to use modals
export default function FeedPipesExcel() {
  return (
    <WithModal>
      <FeedPipesExcelComp />
    </WithModal>
  );
}
