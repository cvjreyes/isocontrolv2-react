/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import crossImg from "../../../assets/images/remove.webp";

export default function FileComponent({
  file,
  title,
  setModalContent,
  downloadFile,
  deleteFile,
  name,
}) {
  return (
    <div css={fileWrapperStyle}>
      <p className="title">{title}</p>
      <a
        target="_blank"
        rel="noreferrer noopener"
        className="dnd flexCenter pointer"
        href={`http://${import.meta.env.VITE_SERVER}:${
          import.meta.env.VITE_NODE_PORT
        }/files/${file.filename}`}
      >
        {file.title !== "Master" && (
          <img
            alt="delete"
            src={crossImg}
            className="removeIcon pointer"
            onClick={(e) => {
              e.preventDefault();
              setModalContent({
                openModal: true,
                text: `Are you sure you want to delete the file?`,
                onClick1: () => deleteFile(file.id),
              });
            }}
          />
        )}
        <div className="fileIconWrapper">
          <img alt="pdf" src="https://img.icons8.com/color/48/null/pdf.png" />
          <p>{name}</p>
        </div>
      </a>
      <div className="btnsWrapper">
        <div
          className="iconWrapper pointer"
          onClick={() => downloadFile(file.filename)}
        >
          <img
            alt="download"
            src="https://img.icons8.com/fluency-systems-regular/48/null/downloading-updates.png"
          />
        </div>
        <div
          className="iconWrapper not-allowed"
          // onClick={() => replaceFile(file.filename)}
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
}

const fileWrapperStyle = {
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
};
