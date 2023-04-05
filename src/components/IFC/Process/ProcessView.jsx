/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";

export default function ProcessView() {
  const navigate = useNavigate();

  return (
    <div css={trayStyle}>
      <div css={headStyle}>
        <div />
        <h3>ProcessView</h3>
      </div>
      <div className="wrapper">
        <div onClick={() => navigate(-1)} className="backWrapper pointer">
          <img
            alt="back"
            src="https://img.icons8.com/ios-filled/50/null/chevron-left.png"
          />
        </div>
        <p>subir archivo process</p>
        <div>
          <button>aceptar</button>
          <button>denegar</button>
        </div>
        <button>save</button>
      </div>
    </div>
  );
}

const trayStyle = {
  ".wrapper": {
    padding: "10px 1% 0",
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    height: "calc(74vh - 50px)",
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
  },
};

const headStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr) ",
  alignItems: "center",
  height: "50px",
  width: "100%",
  backgroundColor: "#338DF1",
  borderRadius: "0 20px 0 0",
  h3: {
    fontSize: "1.2rem",
    whiteSpace: "nowrap",
    color: "white",
  },
};
