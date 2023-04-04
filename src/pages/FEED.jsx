/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Navigate, Route, Routes } from "react-router-dom";

import Main from "../layouts/Main";
import Sidebar from "../components/sidebar/Sidebar";
import FEEDPipes from "../components/FEED/main/FEEDPipes";
import FeedProgress from "../components/FEED/feedProgress/FeedProgress";

export default function FEED() {
  const data = [
    {
      title: "FEED",
      links: [{ text: "Line Control", to: "/feed/line_control" }],
    },
  ];

  return (
    <Main circles={false}>
      <div css={feedStyle}>
        <Sidebar data={data} />
        <Routes>
          <Route path="/line_control/*" element={<FEEDPipes />} />
          <Route path="/*" element={<Navigate to="/feed/line_control" />} />
        </Routes>
      </div>
    </Main>
  );
}

const feedStyle = {
  margin: "0 2%",
  minHeight: "calc(100vh - 50px)",
  display: "grid",
  gridTemplateColumns: "1.2fr 8fr",
  "> *": {
    alignSelf: "center",
    height: "74vh",
  },
  // selects sidebar
  "> div:first-of-type": {
    borderRight: "0", // equivale a hacer border-collapse: collapse pero sin table
    borderRadius: "20px 0 0 0",
    ".fakeHeader": {
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
  // selects table head
  "> div:nth-of-type(2) > div:first-of-type": {
    borderRadius: "0 20px 0 0",
  },
};
