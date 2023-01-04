/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Navigate, Route, Routes } from "react-router-dom";

import Main from "../layouts/Main";
import Sidebar from "../components/sidebar/Sidebar";
import Table from "../components/table/Table";
import FEEDPipes from "../components/FEED/FEEDPipes";

export default function FEED() {
  const sidebarContent = {
    title1: "FEED",
    links1: [{ text: "Line Control", to: "/feed/line_control" }],
    title2: "Reporting",
    links2: [{ text: "Feed Progress", to: "/feed/progress" }],
  };

  return (
    <Main logo="IsoTracker" circles={false}>
      <div css={feedStyle}>
        <Sidebar
          title1={sidebarContent.title1}
          title2={sidebarContent.title2}
          links1={sidebarContent.links1}
          links2={sidebarContent.links2}
        />
        <Routes>
          <Route path="/line_control" element={<FEEDPipes />} />
          <Route path="/progress" element={<div>Elisa</div>} />
          <Route path="/*" element={<Navigate to="/feed/line_control" />} />
        </Routes>
      </div>
    </Main>
  );
}

const feedStyle = {
  minHeight: "calc(100vh - 50px)",
  display: "flex",
  alignItems: "center",
  padding: "0 2%",
};
