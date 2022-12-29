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
}) {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    "input, div": {
      width: "100%",
      lineHeight: "50px",
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      textAlign: "center",
    },
  };

  return (
    <form
      css={rowStyle}
      onPaste={(e) => handlePaste(e, i, item.id)}
      id={`${id}${i}`}
    >
      {columns.map((x, y) => {
        if (x.key === "Empty")
          return (
            <div
              onClick={() => copyToClipBoard(`${id}${i}`)}
              key={`${i}${y}`}
              className="pointer"
            >
              {item.id}
            </div>
          );
        return (
          <input
            name={x.key}
            key={`${i}${y}`}
            value={item[x.key]}
            onChange={(e) => handleChange(e, i)}
          />
        );
      })}
    </form>
  );
}
