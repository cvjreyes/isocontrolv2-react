/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function FeedPipesExcelTableHeader({
  filter,
  gridSize,
  columns,
  filterInfo,
}) {
  const rowStyle = {
    display: "grid",
    gridTemplateColumns: gridSize,
    borderRight: "1px solid black",
    input: {
      width: "100%",
      lineHeight: "50px",
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      textAlign: "center",
    },
  };

  return (
    <div css={rowStyle}>
      {columns.map((x) => {
        return (
          <div className="bold" style={{ width: x.width }} key={x.key}>
            <input
              defaultValue={x.title}
              onFocus={(e) => {
                filter(x.key, "");
                e.target.value = "";
              }}
              onChange={(e) => filter(x.key, e.target.value)}
              onBlur={(e) => {
                if (!filterInfo[x.key]) {
                  e.target.value = e.target.defaultValue;
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.target.value = e.target.defaultValue;
                  e.target.blur();
                  filter(x.key, "");
                }
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
