/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import Button2 from "../../general/Button2";

import addImg from "../../../assets/images/add.svg";
import saveImg from "../../../assets/images/save.svg";

export default function UploadFileComp({
  setMessage,
  fileToSend,
  saveFile,
  setFile,
  title,
  icons,
  ext,
  tag,
}) {
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((f) => {
      if (!tag.toLowerCase().includes(f.name.slice(0, -4).toLowerCase())) {
        return setMessage({
          txt: "File name should contain line's tag",
          type: "warn",
        });
      }
      setFile(f);
    });
  }, []);

  const { getRootProps } = useDropzone({ onDrop, multiple: false });

  return (
    <div css={newFileStyle}>
      <p className="master">{title}</p>
      <div
        className="dnd flexCenter pointer"
        {...getRootProps()}
        style={{ backgroundColor: fileToSend ? "#D4F1DD" : "" }}
      >
        {fileToSend ? (
          <div className="fileIconWrapper">
            <img alt="file type" src={icons[ext]} />
            <p>{tag}</p>
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
  );
}

const newFileStyle = {
  marginTop: "30px",
  width: "200px",
  ".master": {
    fontSize: "18px",
    marginBottom: "10px",
    lineHeight: "40px",
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
};
