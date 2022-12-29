/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useEffect } from "react";

import Button1 from "../general/Button1";

export default function Dropdown({ closeMenu, logout }) {
  const escFunction = useCallback((e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <form onSubmit={logout} css={dropdownStyle}>
      <div className="dropdownElement">
        <Button1
          text="Logout"
          className="logout pointer"
          bgColor="transparent"
          color="white"
          border="none"
          padding="10px"
        />
      </div>
    </form>
  );
}

const dropdownStyle = {
  position: "absolute",
  top: "50px",
  right: "2%",
  backgroundColor: "#383838",
  width: "200px",
  padding: "0 0 10px",
  borderRadius: "0 0 10px 10px",
  ".dropdownElement": {
    ":hover": {
      backgroundColor: "#282828",
    },
  },
  ".logout": {
    outline: "default",
    ":hover": {
      color: "#0070ED",
    },
  },
};
