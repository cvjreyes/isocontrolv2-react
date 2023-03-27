import React, { useEffect, useState } from "react";

import FileComponent from "./FileComponent";
import UploadFileComp from "./UploadFileComp";

import WithToast from "../../../modals/Toast";
import WithModal from "../../../modals/YesNo";

function FileComp({ title, file, setModalContent, tag, setMessage }) {
  const [fileToSend, setFile] = useState(null);

  const saveFile = async () => {
    // if (files.length > 1 && !fileTitle)
    //   return setMessage({ txt: "File needs a title", type: "warn" });
    if (!fileToSend)
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
    setFileTitle("");
  };

  // useEffect(() => {
  //   console.log(fileToSend);
  // }, [fileToSend]);

  if (file) {
    return (
      <FileComponent
        title={title}
        file={file}
        setModalContent={setModalContent}
        name={tag}
      />
    );
  } else {
    return (
      <UploadFileComp
        title={title}
        setFile={(f) => setFile(f)}
        fileToSend={fileToSend}
        name={tag}
        saveFile={saveFile}
      />
    );
  }
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
