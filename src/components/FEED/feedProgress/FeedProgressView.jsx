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
      <div css={headStyle}>
        <h3 className="centerTitle">Feed Progress</h3>
        <Button1
          text="Edit Forecast"
          width="150px"
          border="1px solid black"
          bgColor="#0070ED"
          bgHover="#3e96fa"
          color="white"
          margin="auto"
          onClick={() => navigate("/feed/progress/edit_forecast")}
        />
      </div>
      <ResponsiveContainer width="92%" height="70%" className="chart">
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 35,
            right: 0,
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

const headStyle = {
  display: "grid",
  gridTemplateColumns: "8fr 1fr 1fr 1fr",
  height: "50px",
  width: "100%",
  backgroundColor: "#338DF1",
  borderRadius: "0 20px 0 0",
  h3: {
    fontSize: "1.2rem",
    whiteSpace: "nowrap",
    color: "white",
    marginLeft: "41%"
  },
  ".centerTitle": {
    display: "flex",
    alignItems: "center",
  },
};

const forecastStyles = {
  width: "100%",
  height: "82.5%",
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
