/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Table from "../table/Table";
import { columnsData } from "./ColumnsData";
import FeedPipesExcelTableHeader from "./FeedPipesExcelTableHeader";
import FEEDPipesHead from "./FeedPipesHead";

export default function FeedPipesExcelTableWrapper({
  title,
  displayData,
  lineRefs,
  areas,
  diameters,
  handleChange,
  filter,
  handlePaste,
  filterInfo,
  id,
  page,
  copyMulti,
  setCopyMulti,
  copyToClipBoard,
  copied,
  changed,
  submitChanges,
  deleting,
  setDeleting,
  handleDelete,
  copyAll,
  undoChanges,
}) {
  // ! (añadir paginación && opción quitar paginación || intersection observer) && lazy loading
  const gridSize = "1fr 4fr 7fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr";

  return (
    <div css={tableWrapperStyle}>
      <FEEDPipesHead
        title={title}
        submitChanges={submitChanges}
        setCopyMulti={setCopyMulti}
        deleting={deleting}
        setDeleting={setDeleting}
        copyAll={copyAll}
        undoChanges={undoChanges}
        data={displayData}
        id={id}
        page={page}
      />
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
          columns={columnsData(
            lineRefs.map((x) => x.line_ref),
            areas,
            diameters
          )}
          data={displayData}
          handleChange={handleChange}
          handlePaste={handlePaste}
          gridSize={gridSize}
          copyToClipBoard={copyToClipBoard}
          id={id}
          copyMulti={copyMulti}
          copied={copied}
          changed={changed}
          deleting={deleting}
          handleDelete={handleDelete}
        />
      </div>
    </div>
  );
}

const tableWrapperStyle = {
  textAlign: "center",
  marginLeft: "2rem",
  ".wrapper": {
    height: "70vh",
    overflowY: "scroll",
  },
};