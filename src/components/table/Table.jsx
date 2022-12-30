/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Row from "./Row";

export default function Table({
  columns,
  data,
  handleChange,
  handlePaste,
  gridSize,
  copyToClipBoard,
  id,
  copyMulti,
  copied,
  changed,
}) {
  return (
    <div css={tableStyle}>
      {data.map((x, i) => {
        return (
          <Row
            key={x.id}
            i={i}
            item={x}
            columns={columns}
            handleChange={handleChange}
            gridSize={gridSize}
            handlePaste={handlePaste}
            copyToClipBoard={copyToClipBoard}
            id={id}
            copyMulti={copyMulti}
            copied={copied}
            changed={changed}
          />
        );
      })}
    </div>
  );
}

const tableStyle = {
  border: "solid black",
  borderWidth: "0 1px 1px 0",
  "*": {
    fontSize: "13px !important",
  },
};
