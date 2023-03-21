/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

import Button from "../../general/Button2";
import addImg from "../../../assets/images/add.svg";
import saveImg from "../../../assets/images/save.svg";

export default function Header({
  title,
  submitChanges,
  setCopyMulti,
  setDeleting,
  copyAll,
  undoChanges,
  data,
  id,
  page,
  setMessage,
  progress,
  setIsViewMode,
}) {
  const selectRef = useRef(null);
  const navigate = useNavigate();

  const options = [
    { value: "view", label: "View" },
    { value: "edit", label: "Edit" },
    { value: "copy", label: "Copy" },
    { value: "delete", label: "Delete" },
  ];

  const handleSelectChange = (e) => {
    if (e.value === "view") setIsViewMode(true);
    else setIsViewMode(false);
    if (e.value === "copy") setCopyMulti(true);
    else setCopyMulti(false);
    if (e.value === "delete") setDeleting(true);
    else setDeleting(false);
  };

  const handleCopy = () => {
    copyAll();
    setMessage({
      txt: "All rows copied!",
      type: "success",
    });
  };

  return (
    <div css={headStyle}>
      <div className="btns_wrapper">
        <Button
          text="Undo"
          width="100px"
          bgColor="transparent"
          onClick={undoChanges}
          border="none"
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
        <Button
          width="110px"
          text="Copy All"
          bgColor="transparent"
          border="none"
          onClick={handleCopy}
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 7px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="add"
          src={
            "https://img.icons8.com/external-becris-lineal-becris/64/null/external-copy-mintab-for-ios-becris-lineal-becris.png"
          }
          imgFilter="invert(100%) brightness(200%)"
          imgWidth="18px"
        />
        <Button
          width="100px"
          text="Save"
          onClick={submitChanges}
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

      {/* <div /> */}
      <div className="flexCenter">
        <h3 className="bold">
          {title} ({progress}%)
        </h3>
      </div>
      <div css={rightStyle}>
        <div className="selectWrapper">
          <label className="pointer" onClick={() => selectRef.current.focus()}>
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
        <span className="itemsLength default">{data?.length} items</span>
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "3fr 1fr 3fr",
  height: "50px",
  backgroundColor: "#338DF1",
  borderRadius: "0 20px 0 0",
  ".btns_wrapper": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  h3: { color: "white", fontSize: "1.2rem", whiteSpace: "nowrap" },
};

const rightStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  width: "100%",
  ".selectWrapper": {
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
      color: "white",
    },
  },
  ".itemsLength": {
    whiteSpace: "nowrap",
    marginRight: "1.5rem",
    minWidth: "150px",
    color: "white",
  },
};
