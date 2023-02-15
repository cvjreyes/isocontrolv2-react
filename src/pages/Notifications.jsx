/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import Loading from "react-loading";

import { api } from "../helpers/api";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [displayNotifications, setDisplayNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [filterVal, setFilterVal] = useState("");

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
    // actualFilter
    const split = filterVal.split(" ");
    const filterd = tempNotifications.filter(
      (x) => x.title.toLowerCase().includes(filterVal)
      // split.every(
      //   (y) =>
      //     x.title.toLowerCase().includes(y) ||
      //     x.description?.toLowerCase().includes(y)
      // )
    );
    console.log(filterd.length);
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
        <div className="flexCenter">
          <input type="text" onChange={handleChange} value={filterVal} />
          <button className="pointer" onClick={resetView}>
            X
          </button>
        </div>
        <h3>Notifications</h3>
        <div>
          {notifications.length} / {total} notifications
        </div>
      </div>
      <div className="notificationsWrapper">
        {displayNotifications ? (
          displayNotifications.map((x, i) => (
            <div key={i} className="notification">
              <p className="time">{new Date(x.created_at).toLocaleString()}</p>
              <p className="bold">{x.title}</p>
              <p>{x.description}</p>
            </div>
          ))
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
  ".head": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    h3: {
      fontSize: "24px",
      textTransform: "uppercase",
    },
  },
  ".notificationsWrapper": {
    margin: "50px auto 0",
    width: "80vw",
    maxHeight: "calc(90vh - 204px)",
    overflowY: "auto",
    ".notification": {
      backgroundColor: "lightgray",
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
