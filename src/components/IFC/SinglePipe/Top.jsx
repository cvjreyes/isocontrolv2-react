/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";

import Button2 from "../../general/Button2";

function TopComp({ pipe, setMessage, getPipeInfo }) {
  const navigate = useNavigate();

  const updatePipe = async (key, val, id) => {
    const { ok } = await api("post", "/ifc/update_pipe", {
      key,
      val: val ? 0 : 1,
      id,
    });
    if (!ok) return setMessage({ txt: "Something went wrong", type: "error" });
    setMessage({ txt: "Changes saved!", type: "success" });
    getPipeInfo();
  };

  return (
    <div css={topStyle}>
      <div onClick={() => navigate(-1)} className="backWrapper pointer">
        <img
          alt="back"
          src="https://img.icons8.com/ios-filled/50/null/chevron-left.png"
        />
      </div>
      <div>
        <b>Tag: </b>
        {pipe.tag}
      </div>
      <div className="btnWrapper">
        <Button2
          text="P"
          width="50px"
          border="1px solid black"
          margin="2px 10px 0"
          bgColor={pipe.process && "#28A745"}
          onClick={() => updatePipe("process", pipe.process, pipe.id)}
        />
        <Button2
          text="I"
          width="50px"
          border="1px solid black"
          margin="2px 10px 0"
          bgColor={pipe.instrumentation && "#28A745"}
          onClick={() =>
            updatePipe("instrumentation", pipe.instrumentation, pipe.id)
          }
        />
      </div>
    </div>
  );
}

// using this components to use modals
export default function Top(props) {
  return (
    <WithToast>
      <TopComp {...props} />
    </WithToast>
  );
}

const topStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  alignItems: "center",
  ".backWrapper": {
    width: "40px",
    height: "40px",
    borderRadius: "100px",
    padding: "10px",
    background: "linear-gradient(145deg, #ffffff, #e6e1da)",
    boxShadow: "20px 20px 60px #d9d5ce, -20px -20px 60px #ffffff",
    transition: "all 50ms linear",
    ":hover": { padding: "9px" },
  },
  ".btnWrapper": {
    display: "flex",
    justifyContent: "center",
  },
};
