/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import crossImg from "../../../assets/images/remove.webp";

export default function FileComponent({
  setModalContent,
  downloadFile,
  setMessage,
  deleteFile,
  isOwner,
  setFile,
  title,
  file,
  tag,
}) {
  const onDrop = useCallback(
    (acceptedFiles) =>
      acceptedFiles.forEach((f) => {
        if (!tag.toLowerCase().includes(f.name.slice(0, -4).toLowerCase())) {
          return setMessage({
            txt: "File name should contain line's tag",
            type: "warn",
          });
        }
        setFile(f);
      }),
    []
  );
  const { getRootProps } = useDropzone({ onDrop, multiple: false });

  const icons = {
    pdf: "https://img.icons8.com/color/48/null/pdf.png",
    txt: "https://img.icons8.com/ios/50/null/edit-text-file.png",
  };

  // last index of '.'
  const ext = file.filename.slice(-3);

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
        {file.title !== "Master" && isOwner && (
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
        <div
          className="fileIconWrapper"
          style={{
            marginTop: file.title === "Master" || !isOwner ? "60px" : "-30px",
          }}
        >
          <img alt="pdf" src={icons[ext]} />
          <p>{tag}</p>
        </div>
      </a>
      {isOwner && (
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
            className="iconWrapper pointer"
            {...getRootProps()}
            multiple={false}
          >
            <img
              alt="replace"
              src="https://img.icons8.com/material-outlined/24/null/replace.png"
            />
          </div>
        </div>
      )}
    </div>
  );
}

const fileWrapperStyle = {
  marginTop: "30px",
  ".title": {
    lineHeight: "40px",
    marginBottom: "10px",
  },
  ".dnd": {
    textDecoration: "none",
    padding: "0 10px",
    width: "200px",
    height: "200px",
    border: "1px dotted lightgray",
    borderRadius: "4px",
    transition: "all 200ms ease-in-out",
    display: "grid",
    gridTemplateRows: "min-content",
    ".removeIcon": {
      opacity: 0,
      top: "5px",
      right: "5px",
      width: "20px",
      height: "20px",
      background: "#F44241",
      borderRadius: "100px",
      padding: "4px",
      justifySelf: "flex-end",
      alignSelf: "flex-start",
      marginTop: "10px",
    },
    ":hover": { textDecoration: "underline" },
    ":hover .removeIcon": {
      opacity: 1,
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
