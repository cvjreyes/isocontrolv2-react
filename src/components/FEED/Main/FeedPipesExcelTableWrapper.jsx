/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Table from "../../table/Table";
import { columnsData } from "../ColumnsData";
import FeedPipesExcelTableHeader from "./FeedPipesExcelTableHeader";
import FEEDPipesHead from "./FeedPipesHead";

export default function FeedPipesExcelTableWrapper({
  title,
  displayData,
  lineRefs,
  areas,
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
  gridSize,
  setMessage,
  progress,
  isViewMode,
  setIsViewMode,
}) {
  // ! (añadir paginación && opción quitar paginación || intersection observer) && lazy loading

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
        setMessage={setMessage}
        progress={progress}
        setIsViewMode={setIsViewMode}
      />
      <div className="wrapper">
        <FeedPipesExcelTableHeader
          filter={filter}
          gridSize={gridSize}
          columns={columnsData(lineRefs, areas)}
          filterInfo={filterInfo}
          copyMulti={copyMulti}
          setCopyMulti={setCopyMulti}
        />
        <Table
          columns={columnsData(
            lineRefs.map((x) => x.line_ref),
            areas
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
          isViewMode={isViewMode}
        />
      </div>
    </div>
  );
}

const tableWrapperStyle = {
  textAlign: "center",
};
