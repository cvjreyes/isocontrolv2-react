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
  handlePaste
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
  border: "solid black",
  borderWidth: "0 1px 1px 0",
  "*": {
    fontSize: "13px !important",
  },
};
