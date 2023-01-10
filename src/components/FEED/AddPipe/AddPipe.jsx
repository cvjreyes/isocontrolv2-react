/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../../helpers/api";

import AddTable from "../../table/AddTable";
import { columnsData } from "../ColumnsData";
import FeedPipesExcelTableHeader from "../FeedPipesExcelTableHeader";
import {
  buildTag,
  checkForAlreadyExists,
  checkForEmptyCellsAdding,
  divideLineReference,
  getTypeFromDiameter,
} from "../feedPipesHelpers";
import AddPipeHead from "./AddPipeHead";
import { removeEmpties } from "./AddPipeHelpers";
import { row, emptyRows } from "./EmptyRows";

export default function AddPipe({
  lineRefs,
  areas,
  diameters,
  setMessage,
  data,
}) {
  const gridSize = ".75fr 4fr 7fr 1.5fr 1fr 2fr 1fr 1fr 1.3fr 1fr 1fr .9fr 3fr";
  const navigate = useNavigate();

  const [rows, setRows] = useState(emptyRows);
  const [rowsToAdd, setRowsToAdd] = useState(1);

  const handleChange = ({ target }, i) => {
    const { name, value } = { ...target };
    const tempRows = [...rows];
    let changedRow = { ...tempRows[i] };
    changedRow[name] = value;
    if (name === "diameter") {
      changedRow.type = getTypeFromDiameter(value, "unset");
    } else if (name === "line_reference") {
      const values = divideLineReference(value, lineRefs);
      changedRow = { ...changedRow, ...values };
    }
    const someEmtpy = checkForEmptyCellsAdding(changedRow);
    if (!someEmtpy) {
      changedRow.tag = buildTag(changedRow);
      !changedRow.status && (changedRow.status = "ESTIMATED");
    }
    if (
      changedRow.tag &&
      [...rows, ...data].some((x) => x.tag === changedRow.tag)
    )
      changedRow.tag = "Already exists";
    tempRows[i] = { ...changedRow };
    setRows(tempRows);
  };

  const changeRowsToAdd = ({ target }) => {
    setRowsToAdd(target.value);
  };

  const addRows = () => {
    const tempRows = [...rows];
    for (let i = 0; i < rowsToAdd; i++) tempRows.push(row);
    setRows(tempRows);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    const data = removeEmpties(rows);
    if (data.length < 1)
      return setMessage({ txt: "No pipes to save", type: "warn" });
    const stop = checkForAlreadyExists(data);
    if (stop) return setMessage({ txt: "Repeated pipe!", type: "warn" });
    const { ok } = await api("post", "/feed/add_pipes", false, { data });
    if (ok) {
      setMessage({ txt: "Changes saved!", type: "success" });
      setTimeout(() => {
        navigate("/feed/line_progress");
      }, 3000);
    }
  };

  const clear = () => {
    setRows(emptyRows);
  };

  return (
    <div css={AddPipeStyle}>
      <AddPipeHead
        rows={rows}
        changeRowsToAdd={changeRowsToAdd}
        addRows={addRows}
        handleSubmit={handleSubmit}
        clear={clear}
      />
      <div className="wrapper">
        <FeedPipesExcelTableHeader
          gridSize={gridSize}
          columns={columnsData(lineRefs, areas, diameters)}
        />
        <AddTable
          rows={rows}
          columns={columnsData(
            lineRefs.map((x) => x.line_ref),
            areas,
            diameters
          )}
          gridSize={gridSize}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

const AddPipeStyle = {
  textAlign: "center",
  width: "100%",
  minHeight: "calc(100vh - 50px)",
  paddingTop: "10%",
  h3: {
    fontSize: "20px",
  },
  ".wrapper": {
    height: "70vh",
    overflowY: "scroll",
  },
};
