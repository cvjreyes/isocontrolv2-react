import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import ReactSelect from "react-select";

import Button2 from "../../../general/Button2";
import addImg from "../../../../assets/images/add.svg";
import saveImg from "../../../../assets/images/save.svg";

export default function EditForecastHead({
  clear,
  submitChanges,
  addRows,
  changeRowsToAdd,
}) {
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const options = [
    { value: 1, label: 1 },
    { value: 10, label: 10 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
  ];

  return (
    <div className="head">
      <div className="left">
        <div
          onClick={() => navigate(-1)}
          className="flexCenter backWrapper pointer"
        >
          <img
            alt="back"
            src="https://img.icons8.com/ios-filled/50/null/chevron-left.png"
          />
        </div>
        <div className="selectWrapper">
          <label
            className="pointer"
            htmlFor="mode"
            onClick={() => selectRef.current.focus()}
          >
            Rows to add:
          </label>
          <ReactSelect
            options={options}
            openMenuOnFocus={true}
            ref={selectRef}
            onChange={changeRowsToAdd}
            styles={{
              control: (baseStyles) => ({
                ...baseStyles,
                border: "none",
              }),
            }}
            defaultValue={options[0]}
          />
        </div>
        <Button2
          text="Add"
          onClick={addRows}
          width="100px"
          margin="0 0 0 10px"
          border="none"
          bgColor="transparent"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 5px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="add"
          src={addImg}
          imgFilter="invert(100%) brightness(200%)"
        />
      </div>
      <div className="right">
        <Button2
          width="100px"
          text="Clear"
          onClick={clear}
          border="none"
          bgColor="transparent"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 6px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="add"
          src={"https://img.icons8.com/ios-filled/50/null/left2.png"}
          imgFilter="invert(100%) brightness(200%)"
        />
        <Button2
          text="Save"
          onClick={submitChanges}
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
    </div>
  );
}
