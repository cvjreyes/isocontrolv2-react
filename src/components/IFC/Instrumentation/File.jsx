import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

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
  const navigate = useNavigate();

  const { pipe_id } = useParams();

  const [fileToSend, setFile] = useState(null);

  const saveFile = async (bool) => {
    if (!fileToSend)
      return setMessage({ txt: "There's no file uploaded :(", type: "warn" });
    const formData = new FormData();
    formData.append("file", fileToSend);
    const name = title.includes("Attachment") ? "Attachment" : title;
    const { ok } = await api(
      "post",
      `/ifc/${file ? "update_file" : "upload_file"}/${pipe_id}/${name}/${bool}`,
      formData
    );
    if (!ok) return setMessage({ txt: "Something went south", type: "error" });
    setMessage({ txt: "File saved successfully!", type: "success" });
    setFile(null);
    navigate(-1);
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

  const icons = {
    pdf: "https://img.icons8.com/color/48/null/pdf.png",
    txt: "https://img.icons8.com/ios/50/null/edit-text-file.png",
  };

  const idx = fileToSend
    ? fileToSend?.path.lastIndexOf(".")
    : file?.filename.lastIndexOf(".");

  const ext = fileToSend
    ? fileToSend?.path.slice(idx + 1)
    : file?.filename.slice(idx + 1);

  if (file && !fileToSend) {
    return (
      <FileComponent
        setModalContent={setModalContent}
        downloadFile={downloadFile}
        setMessage={setMessage}
        deleteFile={deleteFile}
        setFile={setFile}
        isOwner={isOwner}
        title={title}
        icons={icons}
        file={file}
        tag={tag}
        ext={ext}
      />
    );
  } else if (isOwner) {
    return (
      <UploadFileComp
        setFile={(f) => setFile(f)}
        fileToSend={fileToSend}
        setMessage={setMessage}
        saveFile={saveFile}
        isOwner={isOwner}
        title={title}
        icons={icons}
        tag={tag}
        ext={ext}
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
