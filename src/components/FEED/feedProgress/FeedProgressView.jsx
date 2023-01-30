/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
import Button1 from "../../general/Button2";
import { prepareRows } from "./feedProgressHelpers";

export default function FeedProgressView() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  
  useEffect(() => {
    getData();
  }, []);
  
  const getData = async () => {
    // Falla aqui
    const { rows } = await api("get", "/feed/get_gfeed");
    console.log(rows);
    const weeks = prepareRows(rows);
    setData(weeks);
  };
  
  return (
    <div css={forecastStyles} className="flexColumn">
      <div css={headStyle}>
        <div />
        <div className="flexCenter">
          <h3>Feed Progress</h3>
        </div>
        <Button1
          text="Edit Forecast"
          width="140px"
          bgColor="transparent"
          border="none"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 6px"
          margin="auto"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          // img
          alt="Edit Forecast"
          src={
            "https://img.icons8.com/external-kiranshastry-lineal-kiranshastry/64/null/external-magnifying-glass-interface-kiranshastry-lineal-kiranshastry.png"
          }
          // src={"https://img.icons8.com/color/search"} // naranjita por si ak
          imgFilter="invert(100%) brightness(200%)"
          onClick={() => navigate("/feed/progress/edit_forecast")}
        />
      </div>
      <div className="chartWrapper flexCenter">
        <ResponsiveContainer width="80%" height="90%" className="chart">
          <LineChart
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
    </div>
  );
}

const headStyle = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr",
  height: "50px",
  width: "100%",
  backgroundColor: "#338DF1",
  h3: {
    fontSize: "1.2rem",
    color: "white",
  },
};

const forecastStyles = {
  width: "100%",
  height: "60vh",
  button: {
    alignSelf: "flex-end",
    marginRight: "10%",
  },
  ".chart": {
    alignSelf: "flex-start",
  },
  ".chartWrapper": {
    width: "100%",
    height: "calc(60vh - 50px)",
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
  },
};
