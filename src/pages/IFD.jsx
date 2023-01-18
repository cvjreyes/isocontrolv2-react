/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Navigate, Route, Routes } from "react-router";

import IFDMain from "../components/IFD/Main/IFDMain";
import MyTray from "../components/IFD/MyTray/MyTray";
import Modelled from "../components/IFD/Trays/Modelled";
import SStress from "../components/IFD/Trays/SStress";
import RStress from "../components/IFD/Trays/RStress";
import Stress from "../components/IFD/Trays/Stress";
import Supports from "../components/IFD/Trays/Supports";
import SDesign from "../components/IFD/Trays/SDesign";
import { sidebarContent } from "../components/IFD/SidebarContent";
import Sidebar from "../components/sidebar/Sidebar";
import Main from "../layouts/Main";
import IFDLayout from "../layouts/IFDLayout";

export default function IFD() {
  return (
    <Main logo="IsoTracker" circles={false}>
      <div css={IFDStyle}>
        <Sidebar
          title1={sidebarContent.title1}
          title2={sidebarContent.title2}
          links1={sidebarContent.links1}
          links2={sidebarContent.links2}
        />
        <IFDLayout>
          <Routes>
            <Route exact path="/main/*" element={<IFDMain />} />
            <Route path="/my-tray" element={<MyTray />} />
            <Route path="/modelled" element={<Modelled />} />
            <Route path="/s-stress" element={<SStress />} />
            <Route path="/r-stress" element={<RStress />} />
            <Route path="/stress" element={<Stress />} />
            <Route path="/supports" element={<Supports />} />
            <Route path="/s-design" element={<SDesign />} />
            <Route path="/*" element={<Navigate to="/ifd/main" />} />
          </Routes>
        </IFDLayout>
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
};
