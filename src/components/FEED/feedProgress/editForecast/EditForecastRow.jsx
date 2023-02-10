/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import crossImg from "../../../../assets/images/cross.svg";

export default function EditForecastRow({
  columns,
  item,
  i,
  changed,
  handleChange,
  handleDelete,
  length,
}) {
  const tableRowStyle = {
    input: {
      backgroundColor: changed.includes(item.week) ? "#2fc1383b" : "white",
    },
  };

  return (
    <div css={rowWrapperStyle}>
      <div css={tableRowStyle} className="tableGrid">
        {columns.map((col) => {
          return (
            <input
              key={`${item.id}-${col.key}`}
              className={`${col.readOnly && "default"} cell`}
              value={item[col.key]}
              readOnly={col.readOnly}
              onChange={(e) => handleChange(e, i)}
              name={col.key}
              type="number"
              min="1"
              max="100"
            />
          );
        })}
      </div>
      {item.week === length && (
        <div
          className="deleteWrapper pointer"
          onClick={() => handleDelete(item.week)}
        >
          <img alt="delete" src={crossImg} className="invert" />
        </div>
      )}
    </div>
  );
}

const rowWrapperStyle = {
  display: "flex",
  alignItems: "center",
  ":hover .deleteWrapper": {
    display: "block",
  },
  ".deleteWrapper": {
    display: "none",
    backgroundColor: "red",
    borderRadius: "100px",
    width: "30px",
    height: "30px",
    marginLeft: "10px",
    ":hover": {
      boxShadow: "inset 7px 7px 13px #d90000, inset -7px -7px 13px #ff0000",
    },
    img: {
      padding: "5px",
    },
  },
};
