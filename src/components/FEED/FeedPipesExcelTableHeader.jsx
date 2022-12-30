/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

export default function FeedPipesExcelTableHeader({
  filter,
  gridSize,
  columns,
  filterInfo,
  copyMulti,
  setCopyMulti,
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

  const copyWrapper = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderTop: "1px solid black",
    borderLeft: "1px solid black",
    backgroundColor: copyMulti && "lightgray",
    img: {
      width: "50%",
    },
  };

  return (
    <div css={rowStyle}>
      {columns.map((x) => {
        if (x.key === "empty") {
          return (
            <div
              key={x.key}
              css={copyWrapper}
              className="pointer"
              onClick={() => setCopyMulti((prev) => !prev)}
            >
              <img src="https://img.icons8.com/external-becris-lineal-becris/64/null/external-copy-mintab-for-ios-becris-lineal-becris.png" />
            </div>
          );
        }
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
