/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../helpers/api";

export default function Notifications() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getNotifications = async () => {
      const res = await api("get", `/notifications/get_some/${count}`);
    };
    getNotifications();
  }, [count]);

  return (
    <div css={notificationsStyle}>
      {/* {notificationsStyle.map(x => )} */}
      <button className="removeStyle">See more</button>
    </div>
  );
}

const notificationsStyle = {};
