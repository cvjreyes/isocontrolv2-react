/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Button from "../general/Button1";

export default function Header({
  title,
  submitChanges,
  setCopyMulti,
  setDeleting,
  copyAll,
  undoChanges,
  data,
}) {
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const options = [
    { value: "default", label: "Default" },
    { value: "copy", label: "Copy" },
    { value: "delete", label: "Delete" },
  ];

  const handleSelectChange = (e) => {
    if (e.value === "copy") setCopyMulti(true);
    else setCopyMulti(false);
    if (e.value === "delete") setDeleting(true);
    else setDeleting(false);
  };

  return (
    <div css={headStyle}>
      <div css={selectWrapper}>
        <label
          className="pointer"
          htmlFor="mode"
          onClick={() => selectRef.current.focus()}
        >
          Mode:
        </label>
        <Select
          options={options}
          openMenuOnFocus={true}
          ref={selectRef}
          onChange={handleSelectChange}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
            }),
          }}
          defaultValue={options[0]}
        />
      </div>
      <div className="centerTitle">
        <h3 className="bold">{title}</h3>
      </div>
      <div css={rightStyle}>
        <div className="btns_wrapper">
          <Button
            width="100px"
            fontSize="14px"
            text="Add"
            bgColor="rgb(37, 208, 37)"
            border="1px solid black"
            margin="0 5px"
            onClick={() => navigate("/feed/line_control/add")}
            bgHover="rgb(82, 223, 82)"
          />
          <Button
            width="100px"
            fontSize="14px"
            text="Undo"
            bgColor="orange"
            border="1px solid black"
            margin="0 5px"
            onClick={undoChanges}
            bgHover="rgb(255, 182, 45)"
          />
          <Button
            width="100px"
            fontSize="14px"
            text="Copy All"
            bgColor="yellow"
            border="1px solid black"
            margin="0 5px"
            onClick={copyAll}
            bgHover="rgb(255, 255, 125)"
          />
          <Button
            width="100px"
            fontSize="14px"
            text="Save"
            bgColor="#0070ED"
            border="1px solid black"
            margin="0 5px"
            onClick={submitChanges}
            bgHover="#3988e2"
          />
        </div>
        <span className="itemsLength">{data.length} items</span>
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "3fr 1fr 5fr",
  marginBottom: "10px",
  ".centerTitle": {
    display: "flex",
    alignItems: "center",
  },
  h3: {
    fontSize: "1.2rem",
    whiteSpace: "nowrap",
  },
};

const selectWrapper = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  ".css-1nmdiq5-menu, .css-1nmdiq3-menu": {
    cursor: "pointer",
  },
  div: {
    cursor: "pointer",
  },
  label: {
    marginRight: ".5rem",
  },
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "100%",
  ".btns_wrapper": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  ".itemsLength": {
    whiteSpace: "nowrap",
    marginRight: "1.5rem",
  },
};
