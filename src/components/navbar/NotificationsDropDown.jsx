/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotificationsDropDown({
  closeMenu,
  notifications,
  user,
}) {
  const navigate = useNavigate();

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
    <div css={dropdownStyle} onClick={() => navigate("/notifications")}>
      {notifications.map((x) => {
        const unseen = user.last_opened_notifications < x.created_at;
        return (
          <div
            key={x.id}
            className="row pointer"
            style={{ backgroundColor: unseen ? "#080808" : "auto" }}
          >
            <p>{x.title}</p>
          </div>
        );
      })}
      <div className="see_all row removeStyle">See All</div>
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
