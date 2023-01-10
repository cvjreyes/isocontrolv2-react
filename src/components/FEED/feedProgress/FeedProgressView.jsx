/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
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
import EditForecast from "./EditForecast";

export default function FeedProgressView() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { rows } = await api("get", "/gfeed", true);
      console.log("Body: ", rows);

      let weeks = [];
      if (rows) {
        for (let i = 0; i < rows.length; i++) {
          //Por cada semana
          //Creamos el punto en la grafica
          weeks.push({
            name: `D${rows[i].id}`,
            current_weight: rows[i].progress,
            max_weight: rows[i].max_progress,
            estimated: (rows[i].max_progress / 100) * rows[i].estimated,
            forecast: (rows[i].max_progress / 100) * rows[i].forecast,
          });
        }
        setData(weeks);
      }
    };

    getData();
  }, []);

  return (
    <div css={forecastStyles}>
      <Link to="/feed/progress/edit_forecast">Edit Forecast</Link>
      <ResponsiveContainer width="100%" height="90%">
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
};
