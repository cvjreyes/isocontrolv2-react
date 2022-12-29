import React, { useState, useEffect } from "react";
import "handsontable/dist/handsontable.full.min.css";

import {
  buildTag,
  divideLineReference,
  prepareFeedPipesData,
  buildRow,
} from "./feedPipesHelpers";
import FeedPipesExcelTableWrapper from "./FeedPipesExcelTableWrapper";
import { URLold } from "../../helpers/config";
import { copyToClipboard } from "../../helpers/table";

export default function FeedPipesExcel(props) {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [diameters, setDiameters] = useState(null);
  const [areas, setAreas] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});

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
      const { rows: resRows } = await res.json();
      const { rows } = prepareFeedPipesData(resRows);
      setData(rows);
      setDisplayData(rows);
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
      "Area",
      "Diameter",
      "Fluid",
      "Insulation",
      "Line reference",
      "Tag",
      "Unit",
      "Seq",
      "Spec",
      "Train",
    ];

    let empty = false;
    for (let i = 0; i < data.length; i++) {
      for (let key in data[i]) {
        if (
          data[i]["Line reference"] !== "deleted" &&
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
    // chequear que no haya ningún tag que ponga already exists
    const stop = checkForAlreadyExists();
    if (stop) return props.alert("Repeated pipe!", "error");
    // mover el chequeo de empty cells a otra función
    const stop2 = checkForEmptyCells();
    if (stop2) return props.alert("All cells must be filled", "warning");

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
      props.alert("Changes saved!", "success");
      // await this.props.updateData();
    } else props.alert("Something went wrong", "warning");
  };

  const handleDeleteLine = (idx) => {
    let tempData = [...data];
    let tempRow = { ...tempData[idx] };
    tempRow["Line reference"] = "deleted";
    tempData[idx] = tempRow;
    setData(tempData);
  };

  const handleChange = ({ target }, i) => {
    const { name, value } = target;
    const tempData = [...data];
    tempData[i][name] = value;
    setData(tempData);
    filter(tempData);
  };

  const handlePaste = (e, i) => {
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
        const builtRow = buildRow(row, tempData[y]);
        tempData[y] = {
          ...builtRow,
        };
      });
      filter(tempData);
      setData(tempData);
    });
  };

  useEffect(() => {
    // cuando escrbimos en el filtro => actualizar displayData
    filter();
  }, [filterInfo]);

  return (
    <FeedPipesExcelTableWrapper
      title="Line Control"
      displayData={displayData}
      lineRefs={lineRefs}
      areas={areas}
      diameters={diameters}
      handleChange={handleChange}
      submitChanges={submitChanges}
      filter={handleFilter}
      handlePaste={handlePaste}
      filterInfo={filterInfo}
      copyToClipBoard={copyToClipboard}
      id={"feed"}
    />
  );
}
