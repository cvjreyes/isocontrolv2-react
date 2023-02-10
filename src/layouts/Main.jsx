/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";

import TechnipLogo from "../assets/images/technip.png";
import IsoControl from "../assets/images/IsoControl.svg";
import GreenCircle from "../assets/images/green_circle.png";
import BlueCircle from "../assets/images/blue_circle.png";

export default function Main({ children, logo, circles }) {
  return (
    <div css={mainStyle}>
      {logo === "Technip" ? (
        <img src={TechnipLogo} alt="technip" className="technipLogo" />
      ) : (
        <img src={IsoControl} alt="isocontrol" className="isocontrolLogo" />
      )}
      {circles && [
        <img
          key="1"
          src={GreenCircle}
          alt="greenCircle"
          className="greenCircle"
        />,
        <img
          key="2"
          src={BlueCircle}
          alt="blueCircle"
          className="blueCircle"
        />,
      ]}

      {children}
    </div>
  );
}

const mainStyle = {
  ".technipLogo": {
    position: "absolute",
    top: "80px",
    right: "100px",
    zIndex: "-100",
    width: "180px",
  },
  ".isocontrolLogo": {
    position: "absolute",
    top: "80px",
    left: "50px",
    width: "180px",
    zIndex: "-100",
  },
  ".greenCircle": {
    zIndex: "-100",
    position: "absolute",
    width: "205px",
    right: "0",
    top: "200px",
    mixBlendMode: "darken",
  },
  ".blueCircle": {
    zIndex: "-100",
    position: "absolute",
    width: "450px",
    right: "100px",
    top: "200px",
    mixBlendMode: "darken",
  },
};
