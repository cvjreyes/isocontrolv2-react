/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import Button2 from "../../general/Button2";
import crossImg from "../../../assets/images/cross.svg";
import saveImg from "../../../assets/images/save.svg";
import returnImg from "../../../assets/images/return.svg";

export default function MyTrayHead({
  undo,
  submitChanges,
  unclaim,
  nextStep,
  returnPipe,
}) {
  return (
    <div css={headStyle}>
      <div className="flexCenter leftSide">
        <Button2
          text="Undo"
          onClick={undo}
          width="100px"
          border="none"
          bgColor="transparent"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 6px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="add"
          src={"https://img.icons8.com/ios-filled/50/null/left2.png"}
          imgFilter="invert(100%) brightness(200%)"
        />
        <Button2
          text="Save"
          onClick={submitChanges}
          width="100px"
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
          src={saveImg}
          imgWidth="30px"
        />
      </div>
      <div className="flexCenter">
        <h2>My Tray</h2>
      </div>
      <div className="flexCenter">
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
        <Button2
          text="Next Step"
          onClick={nextStep}
          width="120px"
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
          src="https://img.icons8.com/ios/50/null/end--v1.png"
          imgWidth="20px"
          imgFilter="invert(100%) brightness(200%)"
        />
        <Button2
          text="Return"
          onClick={returnPipe}
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
          src={returnImg}
          imgWidth="23px"
          imgFilter="invert(100%) brightness(200%)"
        />
      </div>
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(3, 1fr)",
  backgroundColor: "#338DF1",
  height: "50px",
  borderRadius: "0 20px 0 0",
  ".leftSide": {
    justifyContent: "flex-start",
  },
  h2: {
    fontSize: "20px",
    color: "white",
  },
};
