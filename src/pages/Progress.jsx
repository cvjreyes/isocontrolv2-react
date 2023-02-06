/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
// import { Line } from "react-chartjs-2";
// import { CategoryScale, Chart } from "chart.js";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// import Main from "../layouts/Main";
import { prepareRows } from "../components/FEED/feedProgress/feedProgressHelpers";
import { api } from "../helpers/api";

export default function Progress() {
  // Chart.register(CategoryScale);

  const [weeks, setWeeks] = useState([]);

  const getGeneralData = async () => {
    const { body } = await api("get", "/feed/get_gfeed");
    const data = prepareRows(body);
    console.log(data);
    setWeeks(data);
  };

  useEffect(() => {
    getGeneralData();
    // const [data, setData] = useState({
    // labels: weeks.map((week) => week.name),
    // datasets: [{
    //     label: "Users Gained",
    //     data: weeks.map((week) => week.estimated)
    // }],
    // });
    //   console.log("Data: ", weeks);
  }, []);

  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  const colors = ["red", "orange", "yellow", "green", "purple"];

  return (
    // <Main circles={false}>
    <div css={progresstyle}>
      <div onClick={() => setWeeks(weeks.slice(0, -1))}>CLick me</div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={weeks}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {weeks.map((x, i) => {
            console.log(i, Object.keys(x)[i]);
            return (
              <Line
                key={x.name}
                type="monotone"
                dataKey={Object.keys(x)[i]}
                stroke={colors[i]}
              />
            );
          })}
          {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
        </LineChart>
      </ResponsiveContainer>
    </div>
    // </Main>
  );
}

const progresstyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "calc(100vh - 50px)",
};
