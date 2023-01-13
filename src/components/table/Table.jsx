/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";
import Row from "./Row";

const Table = React.memo(
  ({
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
    deleting,
    handleDelete,
  }) => {
    return (
      <div css={tableStyle}>
        {data.map((x, i) => {
          return (
            <Row
              key={x.id}
              id={id}
              i={i}
              item={x}
              columns={columns}
              handleChange={handleChange}
              gridSize={gridSize}
              handlePaste={handlePaste}
              copyToClipBoard={copyToClipBoard}
              copyMulti={copyMulti}
              copied={copied}
              changed={changed}
              deleting={deleting}
              handleDelete={handleDelete}
            />
          );
        })}
      </div>
    );
  }
);

const tableStyle = {
  border: "solid black",
  borderWidth: "0 1px 1px 0",
  "*": {
    fontSize: "13px !important",
  },
};

export default Table;
