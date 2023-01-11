/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

import { api } from "../../../helpers/api";
import Button1 from "../../general/Button1";
import { prepareRows } from "./feedProgressHelpers";

export default function FeedProgressView() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { rows } = await api("get", "/gfeed", true);
      const weeks = prepareRows(rows);
      setData(weeks);
    };
    getData();
  }, []);

  return (
    <div css={forecastStyles} className="flexColumn">
      <h3>Feed Progress</h3>
      <Button1
        text="Edit Forecast"
        width="150px"
        border="1px solid white"
        bgColor="#0070ED"
        bgHover="#3e96fa"
        color="white"
        onClick={() => navigate("/feed/progress/edit_forecast")}
      />
      <ResponsiveContainer width="92%" height="70%" className="chart">
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 35,
            right: 30,
            left: 20,
            bottom: -15,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis
            label={{
              value: "Weight",
              position: "insideLeft",
              angle: -90,
              dy: 30,
            }}
          />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="current_weight"
            stroke="blue"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="max_weight" stroke="red" />
          <Line type="monotone" dataKey="estimated" stroke="green" />
          <Line type="monotone" dataKey="forecast" stroke="brown" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

const forecastStyles = {
  width: "100%",
  height: "100%",
  h3: {
    fontSize: "20px",
  },
  button: {
    alignSelf: "flex-end",
    marginRight: "10%",
  },
  ".chart": {
    alignSelf: "flex-start",
  },
};
