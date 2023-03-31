/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import ReactSelect from "react-select";

import Button from "../components/general/Button1";
import { progressNumbers } from "../components/IFC/IFCPipeHelpers";
import { api } from "../helpers/api";

export default function Modal({ closeModal, pipe, getMyPipes }) {
  const [selected, setSelected] = useState(null);

  const escFunction = (e) => e.key === "Escape" && resetModalContent();

  const list = Object.keys(progressNumbers[pipe.type]);
  const idx = list.indexOf(pipe.status.toLowerCase());
  const options = list.splice(0, idx).map((x) => {
    const str = x.charAt(0).toUpperCase() + x.slice(1);
    return { value: str, label: str };
  });

  useEffect(() => {
    setSelected(options[0]);
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  const preventPropagation = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const orderBy = (e) => {
    setSelected(e);
  };

  const handleClick = async () => {
    await api("post", "/ifc/return_to_tray", {
      pipe_id: pipe.id,
      returnTo: selected.value,
    });
    getMyPipes();
    closeModal();
  };

  return (
    <div css={blurEffect} onClick={closeModal} className="pointer">
      <div css={mainStyle} onClick={preventPropagation} className="default">
        <ReactSelect
          options={options}
          openMenuOnFocus={true}
          onChange={orderBy}
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              border: "none",
              cursor: "pointer",
              width: "200px",
            }),
          }}
          defaultValue={options[0]}
        />
        <div className="buttonWrapper">
          <Button
            onClick={closeModal}
            text="Cancel"
            margin="0 1rem"
            backgroundColor="white"
            color="black"
            width="150px"
            bgHover="lightgray"
          />
          <Button
            onClick={handleClick}
            text="Confirm"
            margin="0 1rem"
            color="black"
            backgroundColor="white"
            bgHover="red"
            colorHover="white"
            width="150px"
          />
        </div>
      </div>
    </div>
  );
}

const blurEffect = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh !important",
  backgroundColor: "rgba(0, 0, 0, 0.2)",
  backdropFilter: "blur(2px)",
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
  p: { color: "white" },
  ".buttonWrapper": {
    display: "flex",
    justifyContent: "center",
    marginTop: "2rem",
  },
};
