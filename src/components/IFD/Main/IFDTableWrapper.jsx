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
  displayData,
  lineRefs,
  areas,
  diameters,
  owners,
  changed,
  copied,
  filter,
  filterInfo,
}) {
  const gridSize =
    "1fr 4fr 7fr 1.5fr 1.5fr 1fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr 3fr";

  return (
    <div css={tableWrapperStyle}>
      <FeedPipesHead
        title={title}
        // submitChanges={submitChanges}
        // setCopyMulti={setCopyMulti}
        // deleting={deleting}
        // setDeleting={setDeleting}
        // copyAll={copyAll}
        // undoChanges={undoChanges}
        data={displayData}
      />
      <div className="wrapper">
        <FeedPipesExcelTableHeader
          gridSize={gridSize}
          columns={columnsData(lineRefs, areas, diameters, owners)}
          filter={filter}
          filterInfo={filterInfo}
          // copyMulti={copyMulti}
          // setCopyMulti={setCopyMulti}
        />
        <Suspense fallback={<Loading />}>
          <Table
            columns={columnsData(
              lineRefs.map((x) => x.line_ref),
              areas,
              diameters,
              owners.map((x) => x.name)
            )}
            data={displayData}
            gridSize={gridSize}
            id={title}
            copied={copied}
            changed={changed}
            // handleChange={handleChange}
            // handlePaste={handlePaste}
            // copyToClipBoard={copyToClipBoard}
            // copyMulti={copyMulti}
            // deleting={deleting}
            // handleDelete={handleDelete}
          />
        </Suspense>
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
