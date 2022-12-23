/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import GreenCircle from "../../assets/images/green_circle.png";
import BlueCircle from "../../assets/images/blue_circle.png";
import TechnipLogo from "../../assets/images/technip.png";

export default function Main({ children }) {
  return (
    <div css={mainStyle}>
      <img src={TechnipLogo} alt="technipLogo" className="technipLogo" />
      <img src={GreenCircle} alt="greenCircle" className="greenCircle" />
      <img src={BlueCircle} alt="blueCircle" className="blueCircle" />

      {children}
    </div>
  );
}

const mainStyle = {
  ".technipLogo": {
    position: "absolute",
    top: "80px",
    right: "100px",
  },
  ".greenCircle": {
    position: "absolute",
    width: "205px",

    right: "0",
    top: "200px",
    mixBlendMode: "darken",
  },

  ".blueCircle": {
    position: "absolute",
    width: "450px",

    right: "100px",
    top: "200px",
    mixBlendMode: "darken",
  },
};
