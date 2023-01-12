import React, { useEffect, useState } from "react";

import Table from "../../table/Table";
import { api } from "../../../helpers/api";
import { buildTag } from "../../FEED/feedPipesHelpers";
import IFDTableWrapper from "./IFDTableWrapper";

export default function IFDMain() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [areas, setAreas] = useState(null);
  const [diameters, setDiameters] = useState(null);
  const [lineRefs, setLineRefs] = useState([]);
  const [owners, setOwners] = useState([]);
  const [filterInfo, setFilterInfo] = useState({});

  // const getRoles = async () => {
  //   const { body } = await api("get", "/users/get_user_roles", false);
  //   setRoles(body.roles);
  // };

  useEffect(() => {
    const getThings = async () => {
      await Promise.all([
        api("get", "/api/areas", true),
        api("get", "/api/diameters", true),
        api("get", "/lines/get_lines"),
        api("get", "/users/get_owners"),
        api("get", "/modelledEstimatedPipes", true),
      ]).then((values) => {
        setAreas(values[0].map((item) => item.name));
        setDiameters(values[1].diameters.map((item) => item.diameter));
        setLineRefs(values[2].body);
        setOwners(values[3].body);
        const rows = values[4].rows.map((row) => ({
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

  // add rows

  // submit changes

  // handle change

  return (
    <IFDTableWrapper
      title="IFD"
      lineRefs={lineRefs}
      areas={areas}
      diameters={diameters}
      owners={owners}
      displayData={displayData}
      // ! MISSSING
      changed={[]}
      copied={[]}
      filter={handleFilter}
      filterInfo={filterInfo}
      // submitChanges={submitChanges}
      // deleting={deleting}
      // setDeleting={setDeleting}
      // copyAll={copyAll}
      // undoChanges={undoChanges}
      // copyMulti={copyMulti}
      // setCopyMulti={setCopyMulti}
      // handleChange={handleChange}
      // handlePaste={handlePaste}
      // copyToClipBoard={copyToClipBoard}
      // handleDelete={handleDelete}
    />
  );
}
