/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Button1 from "../../general/Button1";

export default function AddPipeHead({
  rows,
  changeRowsToAdd,
  addRows,
  handleSubmit,
}) {
  return (
    <div css={headStyle}>
      <div className="flexCenter">
        <label htmlFor="num_of_rows">Num of rows:</label>

        <select
          id="num_of_rows"
          onChange={changeRowsToAdd}
          defaultValue="default"
        >
          <option value="1">1</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <Button1
          border="1px solid black"
          text="Add"
          onClick={addRows}
          width="100px"
          margin="0 0 0 10px"
        />
      </div>
      <h3 className="flexCenter">Add Pipe</h3>
      <div className="gridRight">
        <Button1
          border="1px solid black"
          text="Save"
          onClick={handleSubmit}
          width="100px"
          margin="0 10px 0 0"
        />
        <span>{rows.length} items</span>
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "4fr 1fr 4fr",
  marginBottom: "10px",
  ".gridRight": {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    alignItems: "center",
    justifySelf: "flex-end",
  },
};
