/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext } from "react";
import Loading from "react-loading";
import JSZip from "jszip";

import { AuthContext } from "../../../context/AuthContext";
import { api } from "../../../helpers/api";
import { userHasRoles } from "../../../helpers/user";

import NoResults from "../../general/NoResults";
import TrayHead from "./TrayHead";
import RowTray from "./TrayTableRow";

export default function TrayTable({
  addToDataClaim,
  handleUnclaim,
  dataToClaim,
  handleClaim,
  filterInfo,
  buttonText,
  setMessage,
  selectAll,
  orderBy,
  filter,
  title,
  data,
}) {
  const { user } = useContext(AuthContext);

  const titles = [
    { text: "Claim", key: "claim" },
    { text: "Tag", key: "tag" },
    { text: "Revision", key: "revision" },
    { text: "Type", key: "type" },
    { text: "Date", key: "updated_at" },
    { text: "User", key: "owner" },
    { text: "%", key: "progress" },
    { text: "Actions", key: "actions" },
  ];

  const gridSize = ".25fr 1.2fr .3fr 0.3fr 0.5fr 1.2fr 0.25fr 0.75fr";

  const trayStyle = {
    h3: {
      fontSize: "1.2rem",
      whiteSpace: "nowrap",
      color: "white",
    },
    ".wrapper": {
      padding: "10px 1% 0",
      border: "solid #D2D2D2",
      borderWidth: "0 1px 1px 1px",
      height: "calc(74vh - 50px)",
      "> .grid": { borderTop: "1px solid black" },
    },
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      height: "50px",
      borderLeft: "1px solid black",
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
        input: {
          width: "100%",
          lineHeight: "50px",
          border: "none",
          textAlign: "center",
        },
      },
    },
    ".itemsLength": {
      whiteSpace: "nowrap",
      marginRight: "1.5rem",
      minWidth: "150px",
      color: "white",
      textAlign: "center",
    },
    ".table": {
      paddingBottom: "200px",
      maxHeight: "calc(74vh - 111px)",
      overflowY: "auto",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": { display: "none" },
      ".cell": { padding: "0 5%" },
      "*": { fontSize: "13px", textAlign: "center" },
      ".actions": { display: "flex", alignItems: "center" },
    },
  };

  const downloadAll = async () => {
    if (dataToClaim.length < 1)
      return setMessage({ txt: "No pipes to download", type: "warn" });
    const files = [];
    for (let i = 0; i < dataToClaim.length; i++) {
      const { body } = await api("get", `/ifc/get_files/${dataToClaim[i]}`);
      const urls = body.map(
        (f) =>
          `http://${import.meta.env.VITE_SERVER}:${
            import.meta.env.VITE_NODE_PORT
          }/files/${f.filename}`
      );
      files.push(urls);
    }

    const dataToSend = data.filter((x) => dataToClaim.includes(x.id));

    const zip = new JSZip();
    for (let i = 0; i < files.length; i++) {
      const folder = zip.folder(dataToSend[i].tag); // folder name where all files will be placed in
      files[i].forEach((url) => {
        const blobPromise = fetch(url).then((r) => {
          if (r.status === 200) return r.blob();
          return Promise.reject(new Error(r.statusText));
        });
        const name = url.substring(url.lastIndexOf("/") + 1);
        folder.file(name, blobPromise);
      });
    }
    zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, "files"));
  };

  const handleRevision = async () => {
    console.log("revision clicked");
  };

  return (
    <div css={trayStyle}>
      <TrayHead
        handleRevision={handleRevision}
        handleUnclaim={handleUnclaim}
        handleClaim={handleClaim}
        downloadAll={downloadAll}
        buttonText={buttonText}
        orderBy={orderBy}
        title={title}
        data={data}
      />
      <div className="wrapper">
        <div className="grid">
          {titles.map((title) => {
            if (title.text === "Claim") {
              return (
                <div
                  key={title.text}
                  className="flexCenter cell pointer"
                  onClick={selectAll}
                >
                  <input
                    className="pointer"
                    type="checkbox"
                    checked={
                      userHasRoles(user, ["Speciality Lead"])
                        ? data.length === dataToClaim.length && data.length > 0
                        : data.filter((x) => !x.owner).length ===
                            dataToClaim.length && dataToClaim.length > 0
                    }
                    readOnly
                  />
                </div>
              );
            }
            return (
              <div key={title.text} className="flexCenter cell">
                <input
                  className="bold"
                  defaultValue={title.text}
                  onFocus={(e) => {
                    filter(title.key, "");
                    e.target.value = "";
                  }}
                  onBlur={(e) => {
                    if (!filterInfo[title.key]) {
                      e.target.value = e.target.defaultValue;
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") {
                      e.target.value = e.target.defaultValue;
                      e.target.blur();
                      filter(title.key, "");
                    }
                  }}
                  onChange={(e) => filter(title.key, e.target.value)}
                />
              </div>
            );
          })}
        </div>
        <div className="table">
          {data ? (
            data.length > 0 ? (
              data.map((row) => (
                <RowTray
                  addToDataClaim={addToDataClaim}
                  dataToClaim={dataToClaim}
                  titles={titles}
                  key={row.id}
                  row={row}
                />
              ))
            ) : (
              <NoResults />
            )
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
