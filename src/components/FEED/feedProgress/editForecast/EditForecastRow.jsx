/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function EditForecastRow({
  columns,
  item,
  i,
  changed,
  handleChange,
}) {
  const tableRowStyle = {
    input: {
      backgroundColor: changed.includes(i) ? "#2fc1383b" : "white",
    },
  };

  return (
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
          // <div key={`${item.id}-${col.key}`} className="cell">
          //   {item[col.key]}
          // </div>
        );
      })}
    </div>
  );
}
