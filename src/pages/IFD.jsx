/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Navigate, Route, Routes } from "react-router";

import IFDMain from "../components/IFD/Main/IFDMain";
import MyTray from "../components/IFD/MyTray/MyTray";
import Cancelled from "../components/IFD/Cancelled/Cancelled";
import Modelled from "../components/IFD/Trays/Modelled";
import SStress from "../components/IFD/Trays/SStress";
import RStress from "../components/IFD/Trays/RStress";
import Stress from "../components/IFD/Trays/Stress";
import Supports from "../components/IFD/Trays/Supports";
import SDesign from "../components/IFD/Trays/SDesign";
import { data } from "../components/IFD/SidebarContent";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../layouts/Main";
// import IFDProgress from "../components/IFD/ifdProgress/IFDProgress";
// import IFDLayout from "../layouts/IFDLayout";

export default function IFD() {
  return (
    <Main circles={false}>
      <div css={IFDStyle}>
        <Sidebar data={data} />
        {/* <IFDLayout> */}
        <Routes>
          <Route exact path="/main/*" element={<IFDMain />} />
          <Route path="/my-tray" element={<MyTray />} />
          <Route path="/cancelled" element={<Cancelled />} />
          <Route path="/modelled" element={<Modelled />} />
          <Route path="/s-stress" element={<SStress />} />
          <Route path="/r-stress" element={<RStress />} />
          <Route path="/stress" element={<Stress />} />
          <Route path="/supports" element={<Supports />} />
          <Route path="/s-design" element={<SDesign />} />
          <Route path="/*" element={<Navigate to="/ifd/main" />} />
        </Routes>
        {/* </IFDLayout> */}
      </div>
    </Main>
  );
}

const IFDStyle = {
  minHeight: "calc(100vh - 50px)",
  display: "grid",
  gridTemplateColumns: "1.2fr 8fr",
  alignItems: "center",
  padding: "0 2%",
  "> *": {
    alignSelf: "center",
    height: "74vh",
  },
  "> div:first-of-type": {
    borderRight: "0", // equivale a hacer border-collapse: collapse pero sin table
    borderRadius: "20px 0 0 0",
    "> div:first-of-type": {
      height: "50px",
      backgroundColor: "#338DF1",
      borderRadius: "20px 0 0 0",
    },
  },
  ".wrapper": {
    padding: "10px 1% 0",
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    height: "calc(74vh - 50px)",
  },
};
