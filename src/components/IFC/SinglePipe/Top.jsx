/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useNavigate } from "react-router-dom";

import Button2 from "../../general/Button2";

export default function Top({ pipe, updatePipe }) {
  const navigate = useNavigate();

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
