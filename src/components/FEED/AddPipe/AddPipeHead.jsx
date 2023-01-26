/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Button1 from "../../general/Button2";
import saveImg from "../../../assets/images/save.svg";
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
          width="100px"
          text="Clear"
          onClick={clear}
          border="none"
          bgColor="transparent"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 5px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="add"
          src={"https://img.icons8.com/ios-filled/50/null/left2.png"}
          imgFilter="invert(100%) brightness(200%)"
        />
        <Button1
          text="Save"
          onClick={handleSubmit}
          width="100px"
          border="none"
          bgColor="transparent"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 5px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="add"
          src={saveImg}
          imgWidth="30px"
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
  height: "50px",
  backgroundColor: "#338DF1",
  ".leftSide": {
    justifyContent: "flex-start",
  },
  ".backWrapper": {
    width: "40px",
    height: "40px",
    margin: "0 5% 0 0",
    // backgroundColor: "red",
    borderRadius: "100px",
    ":hover": {
      boxShadow: "inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff",
    },
    img: { width: "20px", filter: "invert(100%)" },
  },
  h3: { color: "white" },
  ".rightSide": {
    display: "flex",
    paddingRight: "1.5rem",
    alignItems: "center",
    justifySelf: "flex-end",
    p: {
      width: "150px",
    },
    "p, label": {
      color: "white",
    },
  },
};
