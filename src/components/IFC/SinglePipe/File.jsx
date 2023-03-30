import React, { useState } from "react";
import { useParams } from "react-router-dom";

import FileComponent from "./FileComponent";
import UploadFileComp from "./UploadFileComp";

import WithToast from "../../../modals/Toast";
import WithModal from "../../../modals/YesNo";
import { api } from "../../../helpers/api";

function FileComp({
  setModalContent,
  setMessage,
  getFiles,
  isOwner,
  title,
  file,
  tag,
}) {
  const { pipe_id } = useParams();

  const [fileToSend, setFile] = useState(null);

  const saveFile = async () => {
    if (!fileToSend)
      return setMessage({ txt: "There's no file uploaded :(", type: "warn" });
    const formData = new FormData();
    formData.append("file", fileToSend);
    const name = title.includes("Attachment") ? "Attachment" : title;
    const { ok } = await api(
      "post",
      `/ifc/${file ? "update_file" : "upload_file"}/${pipe_id}/${name}`,
      formData
    );
    if (!ok) return setMessage({ txt: "Something went south", type: "error" });
    setMessage({ txt: "File saved successfully!", type: "success" });
    getFiles();
    setFile(null);
  };

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
        alink.download = tag;
        alink.click();
      });
    });
  };

  if (file && !fileToSend) {
    return (
      <FileComponent
        title={title}
        file={file}
        setModalContent={setModalContent}
        tag={tag}
        deleteFile={deleteFile}
        downloadFile={downloadFile}
        setFile={setFile}
        setMessage={setMessage}
        isOwner={isOwner}
      />
    );
  } else if (isOwner) {
    return (
      <UploadFileComp
        title={title}
        setFile={(f) => setFile(f)}
        fileToSend={fileToSend}
        tag={tag}
        saveFile={saveFile}
        setMessage={setMessage}
        isOwner={isOwner}
      />
    );
  } else return null;
}

// using this components to use modals
export default function File(props) {
  return (
    <WithToast>
      <WithModal>
        <FileComp {...props} />
      </WithModal>
    </WithToast>
  );
}
