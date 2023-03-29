/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Loading from "../../general/Loading";
import { api } from "../../../helpers/api";
import { buildTag } from "../../FEED/feedPipesHelpers";

import Top from "./Top";
import File from "./File";

export default function SinglePipe({ setMessage }) {
  const { pipe_id } = useParams();

  const [pipe, setPipe] = useState(null);
  const [files, setFiles] = useState(null);
  const [master, setMaster] = useState(null);
  const [clean, setClean] = useState(null);

  const getPipeInfo = async () => {
    const { body } = await api("get", `/ifc/get_pipe_info/${pipe_id}`);
    const row = { ...body, tag: buildTag(body) };
    setPipe(row);
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

  const updatePipe = async (key, val, id) => {
    const { ok } = await api("post", "/ifc/update_pipe", {
      key,
      val: val ? 0 : 1,
      id,
    });
    if (!ok) return setMessage({ txt: "Something went wrong", type: "error" });
    setMessage({ txt: "Changes saved!", type: "success" });
    getPipeInfo();
  };

  if (!pipe) return <Loading />;
  return (
    <div css={singlePipeStyle}>
      <div className="head"></div>
      <div className="body">
        <Top pipe={pipe} updatePipe={updatePipe} />
        <div className="content">
          <File
            title="Master"
            file={master}
            tag={pipe.tag}
            getFiles={getFiles}
          />
          <File
            title="Clean"
            file={clean}
            tag={pipe.tag + "-CL"}
            getFiles={getFiles}
          />
          {files?.map((f, i) => {
            return (
              <File
                key={f.id}
                file={f}
                title={`Attachment #${i + 1}`}
                tag={pipe.tag}
                getFiles={getFiles}
              />
            );
          })}
          <File
            title={`Attachment #${files?.length + 1}`}
            tag={pipe.tag}
            getFiles={getFiles}
          />
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
    },
  },
};
