/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useCallback, useEffect, useState } from "react";
import Button from "../components/general/Button1";

function withModal({ setMessage, children }) {
  const [modalContent, setModalContent] = useState({
    openModal: false,
    text: "",
    onClick1: "",
  });

  return (
    <div>
      {React.cloneElement(children, { setMessage, setModalContent })}
      <Modal setModalContent={setModalContent} {...modalContent} />
    </div>
  );
}

export default withModal;

const Modal = ({ setModalContent, openModal, text, onClick1 }) => {
  const resetModalContent = () => {
    setModalContent({ openModal: false, txt: "", onClick1: "" });
  };

  const escFunction = (e) => e.key === "Escape" && resetModalContent();

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const blurEffect = {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(2px)",
  };

  const preventPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  if (!openModal) return null;
  return (
    <div css={blurEffect} onClick={resetModalContent} className="pointer">
      <div css={mainStyle} onClick={preventPropagation} className="default">
        <p>{text}</p>
        <div className="buttonWrapper">
          <Button
            onClick={resetModalContent}
            text="No"
            margin="0 1rem"
            backgroundColor="white"
            color="black"
            border="1px solid black"
            className="pointer"
            width="150px"
          />
          <Button
            onClick={() => {
              onClick1();
              resetModalContent();
            }}
            text="Yes"
            margin="0 1rem"
            border="1px solid rgb(240, 10, 10)"
            borderRadius="0"
            color="black"
            backgroundColor="white"
            bgColorHover="rgb(240, 10, 10)"
            colorHover="white"
            className="pointer"
            width="150px"
          />
        </div>
      </div>
    </div>
  );
};

const mainStyle = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  width: "500px",
  height: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 9999,
  padding: "2rem",
  borderRadius: "10px",
  backgroundColor: "#030303",
  color: "white",
  textAlign: "center",
  ".buttonWrapper": {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
};
