/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Table from "../table/Table";
import { columnsData } from "./ColumnsData";
import FeedPipesExcelTableHeader from "./FeedPipesExcelTableHeader";

export default function FeedPipesExcelTableWrapper({
  title,
  displayData,
  lineRefs,
  areas,
  diameters,
  handleChange,
  handlePaste,
  filter,
  filterInfo,
  copyToClipBoard,
  id,
  copyMulti,
  setCopyMulti,
  copied,
  changed,
}) {
  // ! (añadir paginación && opción quitar paginación || intersection observer) && lazy loading
  const gridSize = "1fr 4fr 7fr 1fr 1.5fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr";

  return (
    <div css={tableWrapperStyle}>
      <h3 className="bold">{title}</h3>
      <div className="wrapper">
        <FeedPipesExcelTableHeader
          filter={filter}
          gridSize={gridSize}
          columns={columnsData(lineRefs, areas, diameters)}
          filterInfo={filterInfo}
          copyMulti={copyMulti}
          setCopyMulti={setCopyMulti}
        />
        <Table
          columns={columnsData(lineRefs, areas, diameters)}
          data={displayData}
          handleChange={handleChange}
          handlePaste={handlePaste}
          gridSize={gridSize}
          copyToClipBoard={copyToClipBoard}
          id={id}
          copyMulti={copyMulti}
          copied={copied}
          changed={changed}
        />
      </div>
    </div>
  );
}

const tableWrapperStyle = {
  textAlign: "center",
  marginLeft: "2rem",
  width: "100%",
  h3: {
    marginBottom: "1rem",
    fontSize: "1.2rem",
  },
  ".wrapper": {
    height: "70vh",
    overflowY: "scroll",
  },
};
