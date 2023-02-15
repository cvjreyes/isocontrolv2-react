/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../helpers/api";

export default function NotificationsDropDown({
  closeMenu,
  notifications,
  updateUserInfo,
}) {
  const navigate = useNavigate();

  const escFunction = useCallback((e) => {
    if (e.key === "Escape") {
      closeMenu();
    }
  }, []);

  useEffect(() => {
    const updateLastSeen = async () => {
      await api("post", "/users/update_last_seen");
      updateUserInfo();
    };
    updateLastSeen();
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  return (
    <div css={dropdownStyle}>
      {notifications.map((x) => {
        return (
          <div key={x.id} className="row default">
            <p>{x.title}</p>
          </div>
        );
      })}
      <div
        className="see_all row removeStyle"
        onClick={() => navigate("/notifications")}
      >
        See All
      </div>
    </div>
  );
}

const dropdownStyle = {
  position: "absolute",
  top: "50px",
  right: "2%",
  zIndex: 3,
  backgroundColor: "#383838",
  width: "500px",
  padding: "0 0 10px",
  borderRadius: "0 0 10px 10px",
  "*": {
    color: "white",
    fontSize: "14px",
  },
  ".row": {
    padding: "10px",
    ":hover": {
      backgroundColor: "#282828",
    },
  },
  ".see_all": {
    width: "100%",
    textAlign: "center",
  },
};
