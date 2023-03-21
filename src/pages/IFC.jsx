/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Navigate, Route, Routes } from "react-router";

import Main from "../layouts/Main";
import Sidebar from "../components/sidebar/Sidebar";
import { data } from "../components/IFC/SidebarContent";
import IFCMain from "../components/IFC/Main/IFCMain";
import MyTray from "../components/IFC/MyTray/MyTray";
import Trash from "../components/IFC/Trash/Trash";
// import Modelled from "../components/IFC/Trays/Modelled";
// import SStress from "../components/IFC/Trays/SStress";
// import RStress from "../components/IFC/Trays/RStress";
// import Stress from "../components/IFC/Trays/Stress";
// import Supports from "../components/IFC/Trays/Supports";
// import SDesign from "../components/IFC/Trays/SDesign";
import IFCProgress from "../components/IFC/ifCProgress/IFCProgress";

export default function IFC() {
  return (
    <Main circles={false}>
      <div css={IFCStyle}>
        <Sidebar data={data} />
        <Routes>
          <Route exact path="/main/*" element={<IFCMain />} />
          <Route path="/my-tray" element={<MyTray />} />
          <Route path="/trash" element={<Trash />} />
          {/* <Route path="/modelled" element={<Modelled />} />
          <Route path="/s-stress" element={<SStress />} />
          <Route path="/r-stress" element={<RStress />} />
          <Route path="/stress" element={<Stress />} />
          <Route path="/supports" element={<Supports />} />
          <Route path="/s-design" element={<SDesign />} /> */}
          <Route path="/ifC_progress/*" element={<IFCProgress />} />
          <Route path="/*" element={<Navigate to="/ifc/main" />} />
        </Routes>
      </div>
    </Main>
  );
}

const IFCStyle = {
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
