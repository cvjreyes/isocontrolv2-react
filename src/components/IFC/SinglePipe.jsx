/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import WithToast from "../../modals/Toast";
import WithModal from "../../modals/YesNo";
import { api } from "../../helpers/api";
import { buildTag } from "../FEED/feedPipesHelpers";

import Button2 from "../general/Button2";
import Input from "../general/Input1";
import Loading from "../general/Loading";

import addImg from "../../assets/images/add.svg";
import saveImg from "../../assets/images/save.svg";
import crossImg from "../../assets/images/remove.webp";

function SinglePipeComp({ setMessage, setModalContent }) {
  const { pipe_id } = useParams();
  const navigate = useNavigate();

  const [pipe, setPipe] = useState(null);
  const [files, setFiles] = useState(null);
  const [fileTitle, setFileTitle] = useState("");
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
    setFileTitle("");
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
        <div className="top">
          <div onClick={() => navigate(-1)} className="backWrapper pointer">
            <img
              alt="back"
              src="https://img.icons8.com/ios-filled/50/null/chevron-left.png"
            />
          </div>
          <div>
            <b>Tag: </b>
            {pipe.tag}
          </div>
          <div className="btnWrapper">
            <Button2
              text="P"
              width="50px"
              border="1px solid black"
              margin="2px 10px 0"
              bgColor={pipe.process && "#28A745"}
              onClick={() => updatePipe("process", pipe.process, pipe.id)}
            />
            <Button2
              text="I"
              width="50px"
              border="1px solid black"
              margin="2px 10px 0"
              bgColor={pipe.instrumentation && "#28A745"}
              onClick={() =>
                updatePipe("instrumentation", pipe.instrumentation, pipe.id)
              }
            />
          </div>
        </div>
        <div className="content">
          {files ? (
            files.map((f) => {
              return (
                <div key={f.id} className="fileWrapper">
                  <p className="title">{f.title}</p>
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    className="dnd flexCenter pointer"
                    href={`http://${import.meta.env.VITE_SERVER}:${
                      import.meta.env.VITE_NODE_PORT
                    }/files/${f.filename}`}
                  >
                    {f.title !== "Master" && (
                      <img
                        alt="delete"
                        src={crossImg}
                        className="removeIcon pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          setModalContent({
                            openModal: true,
                            text: `Are you sure you want to delete the file?`,
                            onClick1: () => deleteFile(f.id),
                          });
                        }}
                      />
                    )}
                    <div className="fileIconWrapper">
                      <img
                        alt="pdf"
                        src="https://img.icons8.com/color/48/null/pdf.png"
                      />
                      <p>{f.filename}</p>
                    </div>
                  </a>
                  <div className="btnsWrapper">
                    <div
                      className="iconWrapper pointer"
                      onClick={() => downloadFile(f.filename)}
                    >
                      <img
                        alt="download"
                        src="https://img.icons8.com/fluency-systems-regular/48/null/downloading-updates.png"
                      />
                    </div>
                    <div
                      className="iconWrapper not-allowed"
                      // onClick={() => replaceFile(f.filename)}
                      // {...getRootProps()}
                    >
                      <img
                        alt="replace"
                        src="https://img.icons8.com/material-outlined/24/null/replace.png"
                      />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <Loading />
          )}
          <div className="newFile">
            {files?.length < 1 ? (
              <p className="master">Master</p>
            ) : (
              <Input
                placeholder="Name of file..."
                width="100%"
                margin="0 0 10px"
                value={fileTitle}
                onChange={(e) => setFileTitle(e.target.value)}
              />
            )}
            <div className="dnd flexCenter pointer" {...getRootProps()}>
              {file ? (
                <div className="fileIconWrapper">
                  <img
                    alt="pdf"
                    src="https://img.icons8.com/color/48/null/pdf.png"
                  />
                  <p>{pipe.tag}</p>
                </div>
              ) : (
                <div className="plusWrapper">
                  <img alt="add" src={addImg} />
                </div>
              )}
            </div>
            <Button2
              text="Save"
              src={saveImg}
              color="white"
              border="none"
              textMargin="0 5px"
              margin="10px 0 0"
              bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
              hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
              onClick={saveFile}
            />
          </div>
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
    ".top": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      alignItems: "center",
      ".backWrapper": {
        width: "40px",
        height: "40px",
        borderRadius: "100px",
        padding: "10px",
        background: "linear-gradient(145deg, #ffffff, #e6e1da)",
        boxShadow: "20px 20px 60px #d9d5ce, -20px -20px 60px #ffffff",
        transition: "all 50ms linear",
        ":hover": { padding: "9px" },
      },
      ".btnWrapper": {
        display: "flex",
        justifyContent: "center",
      },
    },
    ".content": {
      padding: "30px",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(100px, 220px))",
      ".fileWrapper": {
        ".title": {
          lineHeight: "40px",
          marginBottom: "10px",
        },
        ".dnd": {
          textDecoration: "none",
          position: "relative",
          padding: "0 10px",
          width: "200px",
          height: "200px",
          border: "1px dotted lightgray",
          borderRadius: "4px",
          transition: "all 200ms ease-in-out",
          ".removeIcon": {
            display: "none",
            position: "absolute",
            top: "5px",
            right: "5px",
            width: "20px",
            height: "20px",
            background: "#F44241",
            borderRadius: "100px",
            padding: "4px",
          },
          ":hover": { textDecoration: "underline" },
          ":hover .removeIcon": {
            display: "block",
          },
          ".fileIconWrapper": {
            textAlign: "center",
            img: {
              width: "40px",
              height: "40px",
            },
            p: { fontSize: "12px" },
          },
        },
        ".btnsWrapper": {
          marginTop: "10px",
          display: "flex",
          alignItems: "center",
          ".iconWrapper": {
            margin: "0 5px",
            width: "40px",
            height: "40px",
            borderRadius: "100px",
            padding: "10px",
            transition: "all 200ms linear",
            background: "linear-gradient(145deg, #ffffff, #e6e1da)",
            boxShadow: "5px 5px 8px #d9d5ce, -5px -5px 8px #ffffff",
            ":hover": {
              background: "linear-gradient(145deg, #d8dce6, #ffffff)",
              boxShadow: "5px 5px 8px #d1d4de, -5px -5px 8px #ffffff",
            },
          },
        },
      },
      ".newFile": {
        width: "200px",
        ".master": {
          fontSize: "18px",
          marginBottom: "10px",
        },
        ".dnd": {
          padding: "0 10px",
          height: "200px",
          border: "1px dotted lightgray",
          borderRadius: "4px",
          transition: "all 200ms ease-in-out",
          ":hover": {
            background: "#99c6f86b",
          },
          ".fileIconWrapper": {
            textAlign: "center",
            img: {
              width: "40px",
              height: "40px",
            },
            p: { fontSize: "12px" },
          },
          ".plusWrapper": {
            width: "40px",
            height: "40px",
            borderRadius: "100px",
            padding: "10px",
            background: "linear-gradient(145deg, #ffffff, #e6e1da)",
            boxShadow: "20px 20px 60px #d9d5ce, -20px -20px 60px #ffffff",
          },
        },
      },
    },
  },
};
