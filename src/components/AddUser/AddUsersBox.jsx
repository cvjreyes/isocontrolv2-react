/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useRef } from "react";
import ReactSelect from "react-select";

import Button2 from "../general/Button2";

import addImg from "../../assets/images/add.svg";
import saveImg from "../../assets/images/save.svg";

export default function AddUsersBox({
  data,
  roles,
  handleSelectChange,
  handleChange,
  handlePaste,
  clear,
  addRows,
  changeRowsToAdd,
  handleSubmit,
}) {
  const selectRef = useRef(null);

  return (
    <form css={addUserBoxStyle} onSubmit={handleSubmit}>
      <div className="head">
        <div className="flexCenter">
          <Button2
            type="button"
            text="Add"
            onClick={addRows}
            width="100px"
            border="none"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 5px"
            bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            // img
            alt="add"
            src={addImg}
            imgFilter="invert(100%) brightness(200%)"
          />
          <div className="selectWrapper">
            <label
              className="pointer"
              htmlFor="mode"
              onClick={() => selectRef.current.focus()}
            >
              Rows to add:
            </label>
            <ReactSelect
              options={[1, 10, 20].map((num) => ({ value: num, label: num }))}
              openMenuOnFocus={true}
              ref={selectRef}
              onChange={changeRowsToAdd}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: "none",
                }),
              }}
              defaultValue={{ value: 1, label: 1 }}
            />
          </div>
        </div>
        <div className="right flexCenter">
          <Button2
            type="button"
            width="100px"
            text="Clear"
            onClick={clear}
            border="none"
            bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 6px"
            margin="0 10px 0 0"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            // img
            alt="clear"
            src={"https://img.icons8.com/ios-filled/50/null/left2.png"}
            imgFilter="invert(100%) brightness(200%)"
          />
          <div>{data?.length} items</div>
        </div>
      </div>
      <div className="table">
        <div>
          {data.map((item, i) => {
            return (
              <div key={i} className="row" onPaste={(e) => handlePaste(e, i)}>
                <input
                  placeholder="your@email.com"
                  onChange={(e) => handleChange(e, i)}
                  value={item.email}
                  type="email"
                />
                <ReactSelect
                  options={[
                    { value: "All", label: "All" },
                    ...roles.map((x) => ({ label: x.name, value: x.name })),
                  ]}
                  defaultValue={
                    [...roles.map((x) => ({ label: x.name, value: x.name }))][0]
                  }
                  value={item.roles}
                  onChange={(e) => handleSelectChange(e, i)}
                  isMulti
                />
              </div>
            );
          })}
        </div>
      </div>
      <Button2
        width="100px"
        text="Save"
        onClick={handleSubmit}
        border="none"
        bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
        color="white"
        fontWeight="600"
        fontSize="14px"
        textMargin="0 0 0 6px"
        margin="10px auto 0"
        hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
        // img
        alt="add"
        src={saveImg}
      />
    </form>
  );
}

const addUserBoxStyle = {
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  width: "95%",
  margin: "0 auto",
  ".head": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: "70px",
    backgroundColor: "lightgray",
    borderRadius: "6px",
    padding: "0 3%",
    marginBottom: "10px",
    ".selectWrapper": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginLeft: "10px",
      label: {
        marginRight: ".5rem",
      },
      ".right": {
        "> div:last-of-type": {
          minWidth: "75px",
        },
      },
    },
  },
  ".table": {
    width: "100%",
    // backgroundColor: "#99C6F8",
    background:
      "linear-gradient(90deg, rgba(147,197,251,1) 0%, rgba(153,198,248,1) 49%, rgba(177,214,255,1) 100%)",
    borderRadius: "6px",
    padding: "20px",
    "> div": {
      width: "100%",
      overflowY: "auto",
      height: "60vh",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".row": {
      marginBottom: "20px",
      borderRadius: "6px",
      padding: "15px",
      // backgroundColor: "#ffffffc5",
      background:
        "linear-gradient(90deg, rgba(241,254,255,.6) 0%, rgba(255,255,255,.6) 49%, rgba(245,249,250,.6) 100%)",
      width: "100%",
      textAlign: "left",
      input: {
        margin: "0 2rem 10px 0",
        width: "100%",
        lineHeight: "40px",
        height: "fit-content",
        padding: "0 10px",
        borderRadius: "6px",
        borderWidth: "0",
      },
    },
  },
};
