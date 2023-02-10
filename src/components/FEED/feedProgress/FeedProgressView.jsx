/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../../../context/AuthContext";

import { api } from "../../../helpers/api";
import { userHasRoles } from "../../../helpers/user";
import Button1 from "../../general/Button2";
import { prepareRows } from "./feedProgressHelpers";

export default function FeedProgressView() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { body } = await api("get", "/feed/get_feed_progress");
      const weeks = prepareRows(body, "Feed");
      setData([...weeks]);
    };
    getData();
  }, []);

  const colorsFeed = ["brown", "red", "blue", "green"];

  return (
    <div css={forecastStyles} className="flexColumn">
      <div css={headStyle}>
        <div />
        <div className="flexCenter">
          <h3>Feed Progress</h3>
        </div>
        {userHasRoles(user, ["Speciality Lead"]) && (
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
        )}
      </div>
      <div className="chartWrapper flexCenter">
        <ResponsiveContainer width="80%" height="90%" className="chart">
          <LineChart
            data={data}
            margin={{
              top: 35,
              right: 0,
              left: 0,
              bottom: 0,
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
            <Tooltip isAnimationActive={false} offset={10000000} />
            {!!data[0] && (
              <Legend
                iconType="line"
                payload={Object.keys(data[0])
                  .filter((x) => x !== "name")
                  .map((x, i) => ({
                    value: x,
                    type: "diamond",
                    id: x,
                    color: colorsFeed[i],
                  }))}
              />
            )}
            {!!data[0] &&
              Object.keys(data[0]).map((x, i) => {
                console.log(i, x);
                return (
                  <Line
                    isAnimationActive={false}
                    key={i}
                    type="monotone"
                    dataKey={x}
                    stroke={colorsFeed[i]}
                  />
                );
              })}
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
