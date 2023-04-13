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
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((f) => {
        if (!tag.toLowerCase().includes(f.name.slice(0, -4).toLowerCase())) {
          return setMessage({
            txt: "File name should contain line's tag",
            type: "warn",
          });
        }
        setFile(f);
      });
    },
    [tag]
  );

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
      <div className="btnWrapper">
        <Button2
          text="Accept"
          width="48%"
          display="inline"
          color="white"
          border="none"
          margin="10px 0 0"
          bgColor="#78B38A"
          hoverShadow="inset 12px 12px 24px #669875, inset -12px -12px 24px #8ace9f"
          onClick={() => saveFile(1)}
        />
        <Button2
          text="Deny"
          width="48%"
          display="inline"
          color="white"
          border="none"
          margin="10px 0 0"
          bgColor="#FF3358"
          hoverShadow="inset 12px 12px 24px #d92b4b, inset -12px -12px 24px #ff3b65"
          onClick={() => saveFile(0)}
        />
      </div>
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
  ".btnWrapper": {
    display: "flex",
    justifyContent: "space-between",
  },
};
