/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Table from "../../table/Table";
import Loading from "../../general/Loading";
import FeedPipesHead from "../../FEED/FeedPipesHead";
import FeedPipesExcelTableHeader from "../../FEED/FeedPipesExcelTableHeader";
import { columnsData } from "../ColumnsData";
import { Suspense } from "react";

export default function IFDTableWrapper({
  title,
  id,
  page,
  displayData,
  lineRefs,
  areas,
  owners,
  changed,
  copied,
  filter,
  filterInfo,
  handleChange,
  copyMulti,
  setCopyMulti,
  deleting,
  setDeleting,
  handleDelete,
  copyToClipBoard,
  undoChanges,
  copyAll,
  submitChanges,
  handlePaste,
  gridSize,
  setMessage,
  progress,
}) {
  return (
    <div css={tableWrapperStyle}>
      <FeedPipesHead
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
      />
      <div className="wrapper">
        <FeedPipesExcelTableHeader
          gridSize={gridSize}
          columns={columnsData(lineRefs, areas, owners)}
          filter={filter}
          filterInfo={filterInfo}
          copyMulti={copyMulti}
          setCopyMulti={setCopyMulti}
        />
        <Suspense fallback={<Loading />}>
          <Table
            columns={columnsData(
              lineRefs.map((x) => x.line_ref),
              areas,
              owners.map((x) => x.name)
            )}
            data={displayData}
            gridSize={gridSize}
            id={id}
            copied={copied}
            changed={changed}
            handleChange={handleChange}
            handlePaste={handlePaste}
            copyToClipBoard={copyToClipBoard}
            copyMulti={copyMulti}
            deleting={deleting}
            handleDelete={handleDelete}
          />
        </Suspense>
      </div>
    </div>
  );
}

const tableWrapperStyle = {
  textAlign: "center",
  ".wrapper": {
    padding: "10px 1% 0",
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
  },
};
