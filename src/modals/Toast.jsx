import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";

function Toast({ children }) {
  const [message, setMessage] = useState({
    txt: "",
    ok: null,
  });

  useEffect(() => {
    if (typeof message.ok === "boolean") {
      if (message.ok) {
        toast(message.txt, {
          toastId: message.txt,
        });
      } else
        toast.error(message.txt, {
          toastId: message.txt,
        });
    }
  }, [message]);

  useEffect(() => {
    if (message.txt) {
      setTimeout(() => {
        setMessage({
          txt: "",
          ok: null,
        });
      }, 2000);
    }
  }, [message]);

  return (
    <div>
      {React.cloneElement(children, { setMessage })}
      <ToastContainer autoClose={2000} newestOnTop={true} />
    </div>
  );
}

export default Toast;
