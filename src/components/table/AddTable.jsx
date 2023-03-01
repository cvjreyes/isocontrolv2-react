/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import AddRow from "../FEED/AddPipe/AddRow";

export default function AddTable({
  rows,
  columns,
  gridSize,
  handleChange,
  handleSubmit,
  handlePaste,
}) {
  return (
    <div css={tableStyle}>
      {rows.map((row, i) => {
        return (
          <AddRow
            row={row}
            columns={columns}
            key={i}
            i={i}
            gridSize={gridSize}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handlePaste={handlePaste}
          />
        );
      })}
    </div>
  );
}

const tableStyle = {
  paddingBottom: "200px",
  // scroll behaviour
  height: "calc(70vh - 113px)",
  overflowY: "scroll",
  msOverflowStyle: "none" /* Internet Explorer 10+ */,
  scrollbarWidth: "none" /* Firefox */,
  "::-webkit-scrollbar": {
    display: "none" /* Safari and Chrome */,
  },
  // remove top border from first row
  "> form:first-of-type": {
    "input, div": { borderTop: 0 },
  },
  // for bottom border
  "> form:last-child": {
    borderBottom: "1px solid black",
  },
  "*": {
    fontSize: "13px !important",
  },
};
