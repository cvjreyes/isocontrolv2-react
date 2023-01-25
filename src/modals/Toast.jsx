import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Toast({ children }) {
  const [message, setMessage] = useState({
    txt: "",
    type: "",
  });

  useEffect(() => {
    if (message.type) {
      toast[message.type](message.txt, {
        toastId: message.txt,
        theme: "dark",
      });
    }
  }, [message]);

  useEffect(() => {
    if (message.txt) {
      setTimeout(() => {
        setMessage({
          txt: "",
          type: null,
        });
      }, 2000);
    }
  }, [message]);

  return [
    React.cloneElement(children, { setMessage, key: 3 }),
    <ToastContainer autoClose={2000} newestOnTop={true} key="4" />,
  ];
}

export default Toast;
