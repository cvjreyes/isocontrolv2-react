/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { prepareRows } from "../components/FEED/feedProgress/feedProgressHelpers";
import { api } from "../helpers/api";
import {Chart as ChartJS} from 'chart.js/auto'

import Main from "../layouts/Main";

export default function Progress() {

  const [weeks, setWeeks] = useState()

  const getGeneralData = async () => {
    const { body } = await api("get", "/feed/get_gfeed");
    const data = prepareRows(body);
    setWeeks(data);
  };

  useEffect(() => {
    getGeneralData();
    const [data, setData] = useState({
      labels: weeks.map((week) => week.name),
      datasets: [{
          label: "Users Gained",
          data: weeks.map((week) => week.estimated)
      }],
    });
    console.log("Data: ", weeks);
  }, []);

  return (
    <Main circles={true}>
      <div css={progresstyle}>
        {/* <Bar data={data} /> */}
      </div>
    </Main>
  );
}

const progresstyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh - 50px)",
};
