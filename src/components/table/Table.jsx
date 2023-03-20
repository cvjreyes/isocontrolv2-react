/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React from "react";

import Loading from "../general/Loading";

import NoResults from "../general/NoResults";
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
    isViewMode,
  }) => {
    return (
      <div css={tableStyle}>
        {data ? (
          data.length > 0 ? (
            data.map((x, i) => {
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
                  isViewMode={isViewMode}
                />
              );
            })
          ) : (
            <NoResults />
          )
        ) : (
          <Loading />
        )}
      </div>
    );
  }
);

const tableStyle = {
  height: "calc(70vh - 113px)",
  paddingBottom: "200px",
  overflowY: "scroll",
  msOverflowStyle: "none" /* Internet Explorer 10+ */,
  scrollbarWidth: "none" /* Firefox */,
  "::-webkit-scrollbar": {
    display: "none" /* Safari and Chrome */,
  },
  "*": {
    fontSize: "13px !important",
  },
  // border right to table
  "> form": {
    borderRight: "1px solid black",
  },
  // to remove top border from first row in table to avoid double border
  "> form:first-of-type": {
    "div, input": { borderWidth: "0 0 0 1px" },
  },
  // adding last border bottom
  "> form:last-child": {
    "> div, input": { borderBottom: "1px solid black" },
  },
};

export default Table;
