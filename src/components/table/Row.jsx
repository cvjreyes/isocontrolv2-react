/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function Row({
  item,
  i,
  columns,
  handleChange,
  gridSize,
  handlePaste,
  copyToClipBoard,
  id,
  copyMulti,
  copied,
  changed,
  deleting,
  handleDelete,
}) {
  const rowId = `${id}${i}`;

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    ":hover": {
      backgroundColor: deleting && "red !important",
    },
    "input, select": {
      backgroundColor: changed.includes(item.id) && "rgb(0, 188, 6)",
    },
    "input, div, select": {
      cursor: deleting && "pointer !important",
      width: "100%",
      lineHeight: "50px",
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      textAlign: "center",
    },
  };

  const idWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: copied.includes(rowId) && "lightgray",
    span: {
      display: copyMulti ? "none" : "block",
    },
    img: {
      display: copyMulti ? "block" : "none",
      width: "50%",
    },
    ":hover": {
      img: {
        display: "block",
      },
      span: {
        display: "none",
      },
    },
  };

  return (
    <form
      css={rowStyle}
      onPaste={(e) => handlePaste(e, i, item.id)}
      id={rowId}
      onClick={() => deleting && handleDelete(item.id)}
    >
      {columns.map((x, y) => {
        if (x.key === "empty")
          return (
            <div
              onClick={() => copyToClipBoard(rowId)}
              key={`${i}${y}`}
              className="pointer"
              css={idWrapper}
            >
              <span>{item.id}</span>
              <img src="https://img.icons8.com/external-becris-lineal-becris/64/null/external-copy-mintab-for-ios-becris-lineal-becris.png" />
            </div>
          );
        if (x.readOnly) {
          return (
            <input
              key={`${i}${y}`}
              className="default"
              value={item[x.key]}
              readOnly
            />
          );
        }
        return (
          <select
            key={`${i}${y}`}
            value={item[x.key]}
            onChange={(e) => handleChange(e, item.id)}
            name={x.key}
          >
            {x.source?.map((opt, x) => (
              <option key={`${opt}${y}${i}${x}`} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          // <input
          //   name={x.key}
          //   key={`${i}${y}`}
          //   value={item[x.key]}
          //   onChange={(e) => handleChange(e, item.id)}
          //   readOnly={x.readOnly}
          // />
        );
      })}
    </form>
  );
}
