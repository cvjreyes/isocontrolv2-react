/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, keyframes } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import WithToast from "../../../modals/Toast";
import { api } from "../../../helpers/api";

import Button2 from "../../general/Button2";

function TopComp({ pipe, setMessage, getPipeInfo, isOwner, user }) {
  const navigate = useNavigate();

  const updatePipe = async (key, val, id) => {
    if (!isOwner) return;
    const { ok } = await api("post", "/ifc/update_pipe", {
      key,
      val: val ? 0 : 1,
      id,
    });
    if (!ok) return setMessage({ txt: "Something went wrong", type: "error" });
    setMessage({ txt: "Changes saved!", type: "success" });
    getPipeInfo();
  };

  const handleVerify = async () => {
    if (!isTrayLead) return;
    const { ok } = await api("post", "/ifc/update_pipe", {
      key: "toValidate",
      val: pipe.toValidate ? 0 : 1,
      id: pipe.id,
    });
    if (!ok) return setMessage({ txt: "Something went wrong", type: "error" });
    setMessage({ txt: "Changes saved!", type: "success" });
    getPipeInfo();
  };

  const isTrayLead = user?.roles.some(
    ({ name: role }) =>
      role.toLowerCase().includes("lead") &&
      role.toLowerCase().includes(pipe.status.toLowerCase())
  );

  const showVerifyBtn =
    pipe.status.toLowerCase() === "design" ||
    pipe.status.toLowerCase() === "stress" ||
    pipe.status.toLowerCase() === "supports";

  const verifyBtnStyle = {
    button: {
      transition: "all 1s ease",
      animation: pipe.toValidate && `${blink} 1s infinite ease`,
    },
  };

  return (
    <div css={topStyle}>
      <div onClick={() => navigate(-1)} className="backWrapper pointer">
        <img
          alt="back"
          src="https://img.icons8.com/ios-filled/50/null/chevron-left.png"
        />
      </div>
      <div className="center">
        <div>
          <b>Tag: </b>
          <span>{pipe.tag}</span>
        </div>
        <div>
          <b>Owner: </b>
          <span>{pipe.owner || "-"}</span>
        </div>
      </div>
      <div className="btnWrapper">
        <Button2
          text="P"
          width="50px"
          border="1px solid black"
          margin="2px 10px 0"
          bgColor={pipe.process && "#28A745"}
          onClick={() => updatePipe("process", pipe.process, pipe.id)}
          className={isOwner ? "pointer" : "default"}
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
          className={isOwner ? "pointer" : "default"}
        />
        {showVerifyBtn && isTrayLead && (
          <div css={verifyBtnStyle}>
            <Button2
              text="V"
              width="50px"
              border="1px solid black"
              margin="2px 10px 0"
              bgColor="transparent"
              onClick={handleVerify}
            />
          </div>
        )}
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

const blink = keyframes`
  0% { background-color: rgba(255,202,66, 1); }
  50% { background-color: rgba(255,202,66, 0.5); }
  100% { background-color: rgba(255,202,66, 1); }
`;

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
  ".center": {
    textAlign: "right",
    "> div": {
      display: "grid",
      gridTemplateColumns: "1fr 5fr",
    },
  },
  ".btnWrapper": {
    display: "flex",
    justifyContent: "center",
  },
};
