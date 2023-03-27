/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import WithToast from "../../../modals/Toast";
import WithModal from "../../../modals/YesNo";
import Loading from "../../general/Loading";
import { api } from "../../../helpers/api";
import { buildTag } from "../../FEED/feedPipesHelpers";

import Top from "./Top";
import FileComponent from "./FileComponent";
import UploadFileComp from "./UploadFileComp";

function SinglePipeComp({ setMessage, setModalContent }) {
  const { pipe_id } = useParams();

  const [pipe, setPipe] = useState(null);
  const [files, setFiles] = useState(null);
  const [file, setFile] = useState(null);

  const getPipeInfo = async () => {
    const { body } = await api("get", `/ifc/get_pipe_info/${pipe_id}`);
    const row = { ...body, tag: buildTag(body) };
    setPipe(row);
  };

  const getFiles = async () => {
    const { body } = await api("get", `/ifc/get_files/${pipe_id}`);
    setFiles(body);
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

  const saveFile = async () => {
    // if (files.length > 1 && !fileTitle)
    //   return setMessage({ txt: "File needs a title", type: "warn" });
    if (!file)
      return setMessage({ txt: "There's no file uploaded :(", type: "warn" });
    const formData = new FormData();
    formData.append("file", file);
    const { ok } = await api(
      "post",
      `/ifc/upload_file/${pipe_id}/${pipe.tag}`,
      formData
    );
    if (!ok) return setMessage({ txt: "Something went south", type: "error" });
    setMessage({ txt: "File saved successfully!", type: "success" });
    getFiles();
    setFile(null);
  };

  const onDrop = useCallback(
    (acceptedFiles) => acceptedFiles.forEach((f) => setFile(f)),
    []
  );

  const deleteFile = async (file_id) => {
    const { ok } = await api("delete", `/files/delete/${file_id}`);
    if (ok) {
      setMessage({ txt: "File removed successfully", type: "success" });
      getFiles();
    }
  };

  const downloadFile = async (filename) => {
    fetch(
      `http://${import.meta.env.VITE_SERVER}:${
        import.meta.env.VITE_NODE_PORT
      }/files/${filename}`
    ).then((response) => {
      response.blob().then((blob) => {
        // Creating new object of PDF file
        const fileURL = window.URL.createObjectURL(blob);
        // Setting various property values
        let alink = document.createElement("a");
        alink.href = fileURL;
        alink.download = filename;
        alink.click();
      });
    });
  };

  const { getRootProps } = useDropzone({ onDrop });

  if (!pipe) return <Loading />;
  return (
    <div css={singlePipeStyle}>
      <div className="head"></div>
      <div className="body">
        <Top pipe={pipe} updatePipe={updatePipe} />
        <div className="content">
          {files ? (
            files.map((f) => {
              return (
                <FileComponent
                  key={f.id}
                  f={f}
                  setModalContent={setModalContent}
                  downloadFile={downloadFile}
                  deleteFile={deleteFile}
                />
              );
            })
          ) : (
            <Loading />
          )}
          <UploadFileComp
            files={files}
            getRootProps={getRootProps}
            file={file}
            saveFile={saveFile}
            pipe={pipe}
          />
        </div>
      </div>
    </div>
  );
}

// using this components to use modals
export default function SinglePipe() {
  return (
    <WithToast>
      <WithModal>
        <SinglePipeComp />
      </WithModal>
    </WithToast>
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
      padding: "30px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 220px))",
    },
  },
};
