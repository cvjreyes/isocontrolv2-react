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
    "input, div": {
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
      onPaste={(e) => handlePaste(e, i, rowId)}
      id={rowId}
      onClick={() => deleting && handleDelete(rowId)}
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
        return (
          <input
            name={x.key}
            key={`${i}${y}`}
            value={item[x.key]}
            onChange={(e) => handleChange(e, rowId, item.id)}
            readOnly={x.readOnly}
            style={{
              backgroundColor:
                (changed[
                  changed.findIndex((x) => x.rowId === rowId)
                ]?.keys.includes(x.key) ||
                  changed[
                    changed.findIndex((x) => x.rowId === rowId)
                  ]?.keys.includes("all")) &&
                "rgb(0, 188, 6)",
            }}
          />
        );
      })}
    </form>
  );
}
