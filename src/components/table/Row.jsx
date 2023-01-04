/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import Select from "react-select";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export default function Row({
  item,
  i,
  columns,
  handleChange,
  gridSize,
  handlePaste,
  copyToClipBoard,
  id,
  copyMulti,
  copied,
  changed,
  deleting,
  handleDelete,
}) {
  const rowId = `${id}${i}`;

  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    ":hover": {
      backgroundColor: deleting && "red !important",
    },
    "input, select": {
      backgroundColor: changed.includes(item.id) && "rgb(0, 188, 6)",
      cursor: deleting && "pointer !important",
      width: "100%",
      lineHeight: "50px",
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      textAlign: "center",
    },
    // ".Dropdown-root": {
    //   backgroundColor: "red",
    //   width: "100%",
    //   display: "flex",
    //   // justifyContent: "center",
    //   alignItems: "center",
    //   // display: "grid",
    //   // gridTemplateColumns: "1fr 1fr",
    // },
  };

  const idWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: copied.includes(rowId) && "lightgray",
    cursor: deleting && "pointer !important",
    width: "100%",
    lineHeight: "50px",
    border: "solid black",
    borderWidth: "1px 0 0 1px",
    textAlign: "center",
    span: {
      display: copyMulti ? "none" : "block",
    },
    img: {
      display: copyMulti ? "block" : "none",
      width: "50%",
    },
    ":hover": {
      img: {
        display: "block",
      },
      span: {
        display: "none",
      },
    },
  };

  return (
    <form
      css={rowStyle}
      onPaste={(e) => handlePaste(e, i, item.id)}
      id={rowId}
      onClick={() => deleting && handleDelete(item.id)}
    >
      {columns.map((x, y) => {
        if (x.key === "empty")
          return (
            <div
              onClick={() => copyToClipBoard(rowId)}
              key={`${i}${y}`}
              className="pointer"
              css={idWrapper}
            >
              <span>{item.id}</span>
              <img src="https://img.icons8.com/external-becris-lineal-becris/64/null/external-copy-mintab-for-ios-becris-lineal-becris.png" />
            </div>
          );
        if (x.readOnly) {
          return (
            <input
              key={`${i}${y}`}
              className="default"
              value={item[x.key]}
              readOnly
            />
          );
        }
        return (
          // <Dropdown
          //   key={`${i}${y}`}
          //   options={x.source}
          //   onChange={(e) =>
          //     handleChange({ target: { name: x.key, value: e.label } }, item.id)
          //   }
          //   value={item[x.key]}
          // />
          <div css={selectWrapper} key={`${i}${y}`}>
            <input
              list={x.key}
              name={x.key}
              value={item[x.key]}
              onChange={(e) => handleChange(e, item.id)}
            />
            <datalist id={x.key}>
              {x.source?.map((opt, x) => (
                <option key={`${opt}${y}${i}${x}`} value={opt}>
                  {opt}
                </option>
              ))}
            </datalist>
          </div>
          // <div key={`${i}${y}`} className="selectWrapper">
          //   <Select
          //     value={x.source?.find((opt) => {
          //       return opt.key === item[x.key];
          //     })}
          //     defaultValue={x.source?.find((opt) => opt.key === item[x.key])}
          //     onChange={(e) =>
          //       handleChange(
          //         { target: { name: x.key, value: e.label } },
          //         item.id
          //       )
          //     }
          //     name={x.key}
          //     options={x.source?.map((opt) => ({ label: opt, key: opt }))}
          //     openMenuOnFocus={true}
          //   />
          // </div>

          // <select
          //   key={`${i}${y}`}
          //   value={item[x.key]}
          //   onChange={(e) => handleChange(e, item.id)}
          //   name={x.key}
          // >
          //   {x.source?.map((opt, x) => (
          //     <option key={`${opt}${y}${i}${x}`} value={opt}>
          //       {opt}
          //     </option>
          //   ))}
          // </select>
          // <input
          //   key={`${i}${y}`}
          //   name={x.key}
          //   value={item[x.key]}
          //   onChange={(e) => handleChange(e, item.id)}
          //   readOnly={x.readOnly}
          // />
        );
      })}
    </form>
  );
}

const selectWrapper = {
  height: "50px",
  lineHeight: "16px",
};
