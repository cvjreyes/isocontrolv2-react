/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../helpers/api";
import AddTable from "../../table/AddTable";
import FeedPipesExcelTableHeader from "../main/FeedPipesExcelTableHeader";
import {
  checkForAlreadyExists,
  divideLineReference,
  divideTag,
  buildLineRef,
  buildTagIfFilled,
  buildTag,
} from "../feedPipesHelpers";
import AddPipeHead from "./AddPipeHead";
import { removeEmpties } from "./AddPipeHelpers";
import { row, emptyRows } from "./EmptyRows";
import Loading from "../../general/Loading";

export default function AddPipe({
  lineRefs,
  setMessage,
  data,
  columns,
  id,
  page,
  gridSize,
  buildRow,
}) {
  const navigate = useNavigate();

  const [rows, setRows] = useState(emptyRows);
  const [rowsToAdd, setRowsToAdd] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (loading) setLoading(false);
  }, [rows]);

  const handleChange = ({ target }, i) => {
    const { name, value } = { ...target };
    const tempRows = [...rows];
    let changedRow = { ...tempRows[i] };
    changedRow[name] = value;
    if (name === "line_reference") {
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

  const changeRowsToAdd = ({ value }) => {
    setRowsToAdd(value);
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
    const { ok, body } = await api("post", `/${id}/add_pipes`, { data });
    if (ok) {
      setMessage({ txt: "Changes saved!", type: "success" });
      setTimeout(() => {
        navigate(`/${id}/${page}`);
      }, 3000);
    } else
      return setMessage({ txt: body || "Something went wrong", type: "error" });
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
      pastedData[0] = ind > -1 ? pastedData[0].slice(0, ind) : pastedData[0];
      return pasteCell(name, i, pastedData[0]);
    } else if (pastedData.length === 3) {
      return pasteRow(e, i);
    } else if (pastedData.length > 3) {
      return pasteMultipleRows(e, i);
    }
  };

  const pasteCell = (name, i, pastedData) => {
    const tempData = [...rows];
    let changedRow = { ...tempData[i] };
    changedRow[name] = pastedData.trim();
    if (name === "line_reference") {
      const values = divideLineReference(pastedData, lineRefs);
      changedRow = { ...changedRow, ...values };
    } else if (name === "tag") {
      // divide tag
      const dividedTag = divideTag(pastedData);
      // update rest
      changedRow = { ...changedRow, ...dividedTag };
    } else if (name === "train") {
      if (!pastedData.includes("0")) pastedData.padStart(2, "0");
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
        let builtRow = buildRow(row, i + 1);
        builtRow.train = builtRow.train.replace(/(\r\n|\n|\r)/gm, "");
        if (!builtRow.train.includes("0")) {
          builtRow.train = "0" + builtRow.train;
        }
        const values = divideLineReference(builtRow.line_reference, lineRefs);
        builtRow = { ...builtRow, ...values, status: "ESTIMATED" };
        const tag = buildTag(builtRow);
        builtRow.tag = tag;
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
    setLoading(true);
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...rows];
      // get rows as strings
      let lines = text.split("\n");
      lines.pop();
      // loop each row
      lines.forEach((line, x) => {
        const idx = i + x;
        // get row in form of array
        let row = line.split("\t");
        // build row as object
        let builtRow = buildRow(row, idx);
        // Ponemos el 0 en el train si no esta
        if (!builtRow.train.includes("0")) {
          builtRow.train = "0" + builtRow.train;
        }
        const values = divideLineReference(builtRow.line_reference, lineRefs);
        builtRow = { ...builtRow, ...values, status: "ESTIMATED" };
        const tag = buildTag(builtRow);
        builtRow.tag = tag;
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
        {loading ? (
          <Loading size="small" />
        ) : (
          <AddTable
            rows={rows}
            columns={columns}
            gridSize={gridSize}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handlePaste={handlePaste}
          />
        )}
      </div>
    </div>
  );
}

const AddPipeStyle = {
  textAlign: "center",
  width: "100%",
  height: "70vh",
  h3: {
    fontSize: "20px",
  },
};
