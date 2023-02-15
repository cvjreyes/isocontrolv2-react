/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import Loading from "react-loading";
import { AuthContext } from "../context/AuthContext";

import { api } from "../helpers/api";
import Input1 from "../components/general/Input1";

import crossImg from "../assets/images/cross.svg";

export default function Notifications() {
  const { user, updateUserInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  const [notifications, setNotifications] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [filterVal, setFilterVal] = useState("");

  useEffect(() => {
    const updateLastSeen = async () => {
      await api("post", "/users/update_last_seen");
    };
    updateLastSeen();
    return () => {
      updateUserInfo();
    };
  }, []);

  useEffect(() => {
    const getNotifications = async () => {
      const { body } = await api("get", `/notifications/get_some/${count}`);
      const uniqueValues = [
        ...new Map(
          [...notifications, ...body.notifications].map((item) => [
            item["id"],
            item,
          ])
        ).values(),
      ];
      setNotifications(uniqueValues);
      filter(uniqueValues);
      !total && setTotal(body.total);
    };
    getNotifications();
  }, [count]);

  useEffect(() => {
    filterVal && filter();
  }, [filterVal]);

  const filter = (passedData) => {
    const tempNotifications = passedData || [...notifications];
    const split = filterVal.split(" ");
    const keys = ["title", "description", "created_at"];
    const filterd = tempNotifications.filter((x) =>
      split.every((y) =>
        keys.some(
          (z) => x[z]?.toLowerCase().includes(y.toLowerCase())
          // x.title.toLowerCase().includes(y.toLowerCase()) ||
          // x.description?.toLowerCase().includes(y.toLowerCase())
        )
      )
    );
    setDisplayNotifications(filterd);
  };

  const handleChange = ({ target }) => {
    setFilterVal(target.value);
  };

  const resetView = () => {
    setFilterVal("");
    setDisplayNotifications(notifications);
  };

  return (
    <div css={notificationsStyle}>
      <div className="head">
        <div className="flexCenter left">
          <div onClick={() => navigate(-1)}>BACK</div>
          <Input1 onChange={handleChange} value={filterVal} />
          {/* <input type="text" onChange={handleChange} value={filterVal} /> */}
          <button
            className="pointer removeStyle flexCenter"
            onClick={resetView}
          >
            <img alt="cross" src={crossImg} />
          </button>
        </div>
        <h3>Notifications</h3>
        <div className="right">
          {notifications.length} / {total} notifications
        </div>
      </div>
      <div className="notificationsWrapper">
        {displayNotifications ? (
          displayNotifications.map((x, i) => {
            const unseen = user.last_opened_notifications < x.created_at;
            return (
              <div
                key={i}
                className="notification"
                style={{ backgroundColor: unseen ? "#99c6f88a" : "lightgray" }}
              >
                <p className="time">
                  {new Date(x.created_at).toLocaleString()}
                </p>
                <p className="bold">{x.title}</p>
                <p>{x.description}</p>
              </div>
            );
          })
        ) : (
          <Loading />
        )}
      </div>
      {notifications.length !== total && (
        <button
          className="see_more removeStyle"
          onClick={() => setCount(count + 20)}
        >
          See more
        </button>
      )}
    </div>
  );
}

const notificationsStyle = {
  textAlign: "center",
  padding: "75px 0 0",
  width: "80vw",
  margin: "0 auto",
  ".head": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    ".left": {
      justifySelf: "flex-start",
      input: { marginRight: "1rem" },
      button: {
        background:
          "linear-gradient(322deg, rgba(196,196,196,1) 0%, rgba(211,211,211,1) 47%, rgba(221,221,221,1) 100%)",
        padding: "5px",
        borderRadius: "6px",
        ":hover": {
          background:
            "linear-gradient(322deg, rgba(221,221,221,1) 0%, rgba(211,211,211,1) 47%, rgba(196,196,196,1) 100%)",
        },
        img: {
          width: "20px",
          height: "20px",
        },
      },
    },
    h3: {
      fontSize: "24px",
      textTransform: "uppercase",
    },
    ".right": {
      justifySelf: "flex-end",
    },
  },
  ".notificationsWrapper": {
    margin: "50px 0 0",
    maxHeight: "calc(90vh - 204px)",
    overflowY: "auto",
    ".notification": {
      padding: "15px 20px",
      borderRadius: "10px",
      margin: "0 0 10px",
      textAlign: "left",
      p: {
        lineHeight: "25px",
      },
      ".time": {
        fontSize: "14px",
        lineHeight: "20px",
      },
    },
  },
  ".see_more": {
    marginTop: "30px",
    fontWeight: 700,
    // border: "1px solid #080808",
    padding: "10px 20px",
    borderRadius: "6px",
    color: "white",
    background:
      "linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)",
    ":hover": {
      background:
        "linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)",
    },
  },
};
