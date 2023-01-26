/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Button1 from "../../general/Button1";

export default function AddPipeHead({
  rows,
  changeRowsToAdd,
  addRows,
  handleSubmit,
  clear,
}) {
  const navigate = useNavigate();

  return (
    <div css={headStyle}>
      <div className="leftSide flexCenter">
        <div
          onClick={() => navigate(-1)}
          className="flexCenter backWrapper pointer"
        >
          <img src="https://img.icons8.com/ios-filled/50/null/chevron-left.png" />
        </div>
        <Button1
          border="1px solid black"
          text="Clear"
          onClick={clear}
          width="100px"
          margin="0 10px 0 0"
        />
        <Button1
          border="1px solid black"
          text="Save"
          onClick={handleSubmit}
          width="100px"
          margin="0 10px 0 0"
        />
      </div>
      <h3 className="flexCenter">Add Pipe</h3>
      <div className="rightSide">
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
        <p>{rows.length} items</p>
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "4fr 1fr 4fr",
  marginBottom: "10px",
  height: "50px",
  backgroundColor: "#338DF1",
  ".leftSide": {
    justifyContent: "flex-start",
  },
  ".backWrapper": {
    width: "20px",
    margin: "0 5% 0 0",
  },
  ".rightSide": {
    display: "flex",
    paddingRight: "1.5rem",
    alignItems: "center",
    justifySelf: "flex-end",
    p: {
      width: "150px",
    },
  },
};
