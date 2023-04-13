/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JSZip from "jszip";

import Loading from "../../general/Loading";
import { api } from "../../../helpers/api";
import { buildTag } from "../../FEED/feedPipesHelpers";
import { AuthContext } from "../../../context/AuthContext";

import Top from "./Top";
import File from "./File";
import Button2 from "../../general/Button2";

export default function SinglePipe() {
  const { pipe_id } = useParams();
  const { user } = useContext(AuthContext);

  const [pipe, setPipe] = useState(null);
  const [files, setFiles] = useState(null);
  const [master, setMaster] = useState(null);
  const [clean, setClean] = useState(null);
  const [isOwner, setIsOwner] = useState(null);

  const getPipeInfo = async () => {
    const { body } = await api("get", `/ifc/get_pipe_info/${pipe_id}`);
    const row = { ...body, tag: buildTag(body) };
    setPipe(row);
    setIsOwner(user.id == row.owner_id);
  };

  const getFiles = async () => {
    const { body } = await api("get", `/ifc/get_files/${pipe_id}`);
    const tempFiles = [];
    let tempMaster = null;
    let tempClean = null;
    for (let i = 0; i < body.length; i++) {
      body[i].title === "Master"
        ? (tempMaster = body[i])
        : body[i].title === "Clean"
        ? (tempClean = body[i])
        : tempFiles.push(body[i]);
    }
    setMaster(tempMaster);
    setClean(tempClean);
    setFiles(tempFiles);
  };

  useEffect(() => {
    getPipeInfo();
    getFiles();
  }, []);

  const saveZip = () => {
    const allFiles = [master, clean, ...files];
    const urls = allFiles.map(
      (f) =>
        `http://${import.meta.env.VITE_SERVER}:${
          import.meta.env.VITE_NODE_PORT
        }/files/${f.filename}`
    );

    const zip = new JSZip();
    const folder = zip.folder("files"); // folder name where all files will be placed in

    urls.forEach((url) => {
      const blobPromise = fetch(url).then((r) => {
        if (r.status === 200) return r.blob();
        return Promise.reject(new Error(r.statusText));
      });
      const name = url.substring(url.lastIndexOf("/") + 1);
      folder.file(name, blobPromise);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => saveAs(blob, pipe.tag));
  };

  if (!pipe) return <Loading />;
  return (
    <div css={singlePipeStyle}>
      <div className="head">
        <Button2
          text="Download all"
          src="https://img.icons8.com/material-outlined/24/null/downloads.png"
          width="fit-content"
          color="white"
          border="none"
          bgColor="transparent"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          imgFilter="invert(100%)"
          textMargin="0 0 0 6px"
          onClick={saveZip}
        />
      </div>
      <div className="body">
        <Top
          getPipeInfo={getPipeInfo}
          isOwner={isOwner}
          pipe={pipe}
          user={user}
        />
        <div className="content">
          {!master && !clean && files?.length === 0 && !isOwner && (
            <div className="noResults">
              <img src="https://img.icons8.com/ios/50/null/signing-a-document.png" />
              <p>No documents uploaded yet</p>
            </div>
          )}
          <File
            title="Master"
            file={master}
            tag={pipe.tag}
            getFiles={getFiles}
            isOwner={isOwner}
          />
          <File
            title="Clean"
            file={clean}
            tag={pipe.tag + "-CL"}
            getFiles={getFiles}
            isOwner={isOwner}
          />
          {files?.map((f, i) => {
            return (
              <File
                key={f.id}
                file={f}
                title={
                  f.title.toLowerCase().includes("attachment")
                    ? `Attachment #${i + 1}`
                    : f.title
                }
                tag={pipe.tag}
                getFiles={getFiles}
                isOwner={isOwner}
              />
            );
          })}
          {isOwner && (
            <File
              title={`Attachment #${files?.length + 1}`}
              tag={pipe.tag}
              getFiles={getFiles}
              isOwner={isOwner}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const singlePipeStyle = {
  ".head": {
    display: "grid",
    alignItems: "center",
    height: "50px",
    backgroundColor: "#338DF1",
    borderRadius: "0 20px 0 0",
  },
  ".body": {
    padding: "10px 1% 0",
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    height: "calc(74vh - 50px)",
    ".content": {
      padding: "0 30px 30px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 220px))",
      height: "589px",
      overflowY: "auto",
      ".noResults": {
        marginTop: "50px",
        width: "200%",
        height: "fit-content",
        display: "flex",
        alignItems: "center",
        img: {
          width: "40px",
          height: "40px",
          marginRight: "15px",
        },
      },
    },
  },
};
