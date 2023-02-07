/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
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

import { prepareRows } from "../components/FEED/feedProgress/feedProgressHelpers";
import { api } from "../helpers/api";

export default function AllProgress() {
  const [allChecked, setAllChecked] = useState(false);

  const [displayData, setDisplayData] = useState([]);
  const [checkedFeed, setCheckedFeed] = useState([false, false, false, false]);
  const [feedWeeks, setFeedWeeks] = useState([]);

  const getFeedData = async () => {
    const { body } = await api("get", "/feed/get_gfeed");
    const data = prepareRows(body);
    console.log(data);
    setFeedWeeks(data);
    setDisplayData(data);
  };

  useEffect(() => {
    getFeedData();
  }, []);

  const handleChangeFeed = () => {
    setAllChecked(!allChecked);
    if (allChecked) {
      console.log("all: ", allChecked);
      setDisplayData([...feedWeeks]);
      setCheckedFeed([true, true, true, true]);
    } else {
      // if (checkedFeed[0]) {
      //   checkChecked(0, checkedFeed[0]);
      // } else if (checkedFeed[1]) {
      //   checkChecked(1, checkedFeed[1]);
      // } else if (checkedFeed[2]) {
      //   checkChecked(2, checkedFeed[2]);
      // } else if (checkedFeed[3]) {
      //   checkChecked(3, checkedFeed[3]);
      // } else {
        setDisplayData([]);
      // }
    }
    console.log("Feed: ", checkedFeed);
  };

  const checkChecked = (i, checked) => {
    const tempData = [...displayData];
    if (checked) {
      tempData.splice(i, 1);
    } else {
      tempData.splice(i, 0, feedWeeks[i]);
    }
    setDisplayData(...tempData)
    console.log("temp data: ", tempData);
  };

  const colorsFeed = ["brown", "red", "blue", "pink"];
  const colorsIFD = ["yellow", "orange", "purple", "green"];

  return (
    <div css={progresstyle}>
      <div className="optionsBox">
        <label className="bold">
          <input
            type="checkbox"
            checked={!allChecked}
            onChange={() => handleChangeFeed()}
          />{" "}
          Feed
        </label>
        <div className="subCategory">
          <label className="bold">
            <input
              type="checkbox"
              checked={!checkedFeed[0]}
              onChange={() => handleChangeFeed()}
            />{" "}
            Current Weight Feed
          </label>
          <br />
          <label className="bold">
            <input
              type="checkbox"
              checked={!checkedFeed[1]}
              onChange={() => handleChangeFeed()}
            />{" "}
            Max Weight Feed
          </label>
          <br />
          <label className="bold">
            <input
              type="checkbox"
              checked={!checkedFeed[2]}
              onChange={() => handleChangeFeed()}
            />{" "}
            Estimated Feed
          </label>
          <br />
          <label className="bold">
            <input
              type="checkbox"
              checked={!checkedFeed[3]}
              onChange={() => handleChangeFeed()}
            />{" "}
            Forecast Feed
          </label>
        </div>
      </div>
      <div className="graphic">
        <ResponsiveContainer width="90%" height="90%">
          <LineChart
            width={500}
            height={300}
            data={displayData}
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
            {displayData.map((x, i) => {
              // console.log(x, i, Object.keys(x)[i]);
              return (
                <Line
                  key={x.name}
                  type="monotone"
                  dataKey={Object.keys(x)[i + 1]}
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

const progresstyle = {
  display: "grid",
  gridTemplateColumns: "auto auto",
  marginLeft: "5%",
  marginTop: "50px",
  ".graphic": {
    alignItems: "center",
    justifyContent: "center",
    height: "calc(100vh - 100px)",
  },
  ".subCategory": {
    marginLeft: "5%",
  },
};
