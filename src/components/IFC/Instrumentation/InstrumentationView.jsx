/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { api } from "../../../helpers/api";
import { buildTag } from "../../FEED/feedPipesHelpers";

import File from "./File";
import Button2 from "../../general/Button2";

import crossImg from "../../../assets/images/cross.svg";

export default function ProcessView() {
  const { pipe_id } = useParams();
  const navigate = useNavigate();

  const [pipe, setPipe] = useState(null);

  useEffect(() => {
    const fillProcessOwner = async (row) => {
      const { body } = await api(
        "get",
        `/ifc/fill_process_owner/${row.process_owner}`
      );
      setPipe({ ...row, process_owner: body });
      if (!body) return navigate("/ifc");
    };
    const getPipeInfo = async () => {
      const { body } = await api("get", `/ifc/get_pipe_info/${pipe_id}`);
      const row = { ...body, tag: buildTag(body) };
      fillProcessOwner(row);
    };
    getPipeInfo();
  }, []);

  const unclaim = async () => {
    const { ok } = await api("post", `/ifc/unclaim_process/${pipe_id}`);
    if (ok) return navigate("/ifc/process");
  };

  return (
    <div css={trayStyle}>
      <div css={headStyle}>
        <div />
        <h3>ProcessView</h3>
        <div>
          <Button2
            text="Unclaim"
            onClick={unclaim}
            width="110px"
            border="none"
            bgColor="transparent"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 5px"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            height="40px"
            // img
            alt="add"
            src={crossImg}
            imgWidth="23px"
            imgFilter="invert(100%) brightness(200%)"
          />
        </div>
      </div>
      <div className="wrapper">
        <div className="top">
          <div onClick={() => navigate(-1)} className="backWrapper pointer">
            <img
              alt="back"
              src="https://img.icons8.com/ios-filled/50/null/chevron-left.png"
            />
          </div>
          <div className="tag">
            <b>Tag: </b>
            {pipe?.tag}
          </div>
        </div>
        <div className="content">
          <File title="Process" isOwner={true} tag={pipe?.tag} />
        </div>
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
    ".top": {
      display: "grid",
      gridTemplateColumns: "1fr 3fr 1fr",
      alignItems: "start",
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
      ".tag": { justifySelf: "center", marginTop: ".5rem" },
    },
    ".content": {
      padding: "0 1rem",
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
