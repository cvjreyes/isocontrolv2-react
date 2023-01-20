/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../helpers/api";
import AddTable from "../../table/AddTable";
// import { columnsData } from "../ColumnsData";
import FeedPipesExcelTableHeader from "../FeedPipesExcelTableHeader";
import {
  checkForAlreadyExists,
  divideLineReference,
  getTypeFromDiameter,
  divideTag,
  buildLineRef,
  buildTagIfFilled,
  buildFeedRow,
} from "../feedPipesHelpers";
import AddPipeHead from "./AddPipeHead";
import { removeEmpties } from "./AddPipeHelpers";
import { row, emptyRows } from "./EmptyRows";

export default function AddPipe({
  lineRefs,
  setMessage,
  data,
  columns,
  id,
  page,
  gridSize,
}) {
  // const gridSize = ".75fr 4fr 7fr 1.5fr 1fr 2fr 1fr 1fr 1.3fr 1fr 1fr .9fr 3fr";
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
    changedRow = buildTagIfFilled(changedRow);
    if (
      changedRow.tag &&
      [...rows, ...data].some((x, y) => x.tag === changedRow.tag && i !== y)
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
    const { ok } = await api("post", `/${id}/add_pipes`, false, { data });
    if (ok) {
      setMessage({ txt: "Changes saved!", type: "success" });
      setTimeout(() => {
        navigate(`/${id}/${page}`);
      }, 3000);
    }
  };

  const clear = () => {
    setRows(emptyRows);
  };

  const handlePaste = (e, i) => {
    e.preventDefault();
    e.stopPropagation();
    const name = e.target.name ? e.target.name : e.target.id;
    const pastedData = e.clipboardData.getData("Text").split("\t");
    if (pastedData.length === 1) {
      let ind = pastedData.indexOf("\r");
      pastedData[0] = pastedData[0].slice(0, ind);
      return pasteCell(name, i, pastedData[0]);
    } else if (pastedData.length === 12) {
      return pasteRow(e, i);
    } else if (pastedData.length > 12) {
      return pasteMultipleRows(e, i);
    }
  };

  const pasteCell = (name, i, pastedData) => {
    const tempData = [...rows];
    let changedRow = { ...tempData[i] };
    changedRow[name] = pastedData.trim();
    if (name === "diameter") {
      changedRow.type = getTypeFromDiameter(pastedData, changedRow.calc_notes);
    } else if (name === "line_reference") {
      // divide line ref ( get u, fl, seq )
      const values = divideLineReference(changedRow[name], lineRefs);
      // update fields
      changedRow = { ...changedRow, ...values };
    } else if (name === "tag") {
      // divide tag
      const dividedTag = divideTag(pastedData);
      // update rest
      changedRow = { ...changedRow, ...dividedTag };
    } else if (name === "train") {
      if (!pastedData.includes("0")) pastedData = "0" + pastedData;
      changedRow[name] = pastedData;
    } else {
      changedRow.line_reference = buildLineRef(changedRow);
    }
    changedRow = buildTagIfFilled(changedRow);
    if (
      changedRow.tag &&
      [...rows, ...data].some((x, y) => x.tag === changedRow.tag && i !== y)
    )
      changedRow.tag = "Already exists";
    tempData[i] = changedRow;
    setRows(tempData);
  };

  const pasteRow = (e, i) => {
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...rows];
      let lines = text.split("\n");
      lines.forEach((line) => {
        if (line.length < 1) return;
        let row = line.split("\t");
        const builtRow = buildFeedRow(row, i + 1);
        if (!builtRow.train.includes("0")) {
          builtRow.train = "0" + builtRow.train;
        }
        if (
          builtRow.tag &&
          [...rows, ...data].some((x, y) => x.tag === builtRow.tag && i !== y)
        ) {
          builtRow.tag = "Already exists";
        }
        tempData[i] = { ...tempData[i], ...builtRow };
      });
      setRows(tempData);
    });
  };

  const pasteMultipleRows = (e, i) => {
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...rows];
      // get rows as strings
      let lines = text.split("\n");
      console.log("here");
      lines.pop();
      // loop each row
      lines.forEach((line, x) => {
        const idx = i + x;
        // get row in form of array
        let row = line.split("\t");
        // build row as object
        const builtRow = buildFeedRow(row, idx);
        // Ponemos el 0 en el train si no esta
        if (!builtRow.train.includes("0")) {
          builtRow.train = "0" + builtRow.train;
        }
        // check for repeated tag
        if (
          builtRow.tag &&
          [...rows, ...data].some((x, y) => x.tag === builtRow.tag && i !== y)
        ) {
          builtRow.tag = "Already exists";
        }
        // update tempData
        tempData[idx] = { ...tempData[idx], ...builtRow };
      });
      setRows(tempData);
    });
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
          columns={columns}
          readOnly={true}
          filter={() => {
            return;
          }}
          filterInfo={{}}
        />
        <AddTable
          rows={rows}
          columns={columns}
          gridSize={gridSize}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handlePaste={handlePaste}
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
