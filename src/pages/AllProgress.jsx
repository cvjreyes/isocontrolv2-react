/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import AnimateHeight from "react-animate-height";
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
  const [displayData, setDisplayData] = useState([]);
  const [feedWeeks, setFeedWeeks] = useState([]);
  const [heightDropdown, setHeightDropdown] = useState(0);

  useEffect(() => {
    const getFeedData = async () => {
      const { body } = await api("get", "/feed/get_gfeed");
      const data = prepareRows(body);
      setDisplayData([...data]);
      setFeedWeeks(JSON.parse(JSON.stringify(data)));
    };
    getFeedData();
  }, []);

  const handleChangeFeed = (key) => {
    let tempData = [...displayData];
    // check if key exists in displayData
    if (key === "feed") {
      // check if all feedSubcategories are in displayData
      if (
        feedSubcategories.every((x) => displayData[0].hasOwnProperty(x.key))
      ) {
        // if they are remove all
        feedSubcategories.every((x) => tempData.map((y) => delete y[x.key]));
      } else {
        // else they add all
        feedSubcategories.map((y) => {
          tempData = tempData.map((x, i) => {
            return {
              ...x,
              [y.key]: feedWeeks[i][y.key],
            };
          });
        });
      }
    } else if (tempData[0] && key in tempData[0]) {
      // if exists delete
      tempData.map((x) => delete x[key]);
    } else {
      tempData = tempData.map((x, i) => {
        return { ...x, [key]: feedWeeks[i][key] };
      });
    }
    setDisplayData(tempData);
  };

  const colorsFeed = ["brown", "red", "blue", "green"];
  // const colorsIFD = ["yellow", "orange", "purple", "green"];

  const feedSubcategories = [
    { label: "Current Weight Feed", key: "Current Weight" },
    { label: "Max Weight Feed", key: "Max Weight" },
    { label: "Estimated Feed", key: "Estimated" },
    { label: "Forecast Feed", key: "Forecast" },
  ];

  return (
    <div css={progresstyle}>
      <div className="optionsBox">
        <div className="category">
          <label className="bold">
            <input
              type="checkbox"
              checked={
                !!displayData[0] &&
                feedSubcategories.every((x) =>
                  displayData[0].hasOwnProperty(x.key)
                )
              }
              onChange={() => handleChangeFeed("feed")}
            />
            Feed
          </label>
          <img
            aria-controls="image_dropdown"
            className="image_dropdown"
            src={
              heightDropdown === 0
                ? "https://img.icons8.com/material-outlined/24/null/filled-plus-2-math.png"
                : "https://img.icons8.com/material-outlined/24/null/indeterminate-checkbox.png"
            }
            onClick={() => setHeightDropdown(heightDropdown === 0 ? "auto" : 0)}
          />
        </div>
        <div className="subCategory">
          <AnimateHeight
            id="image_dropdown"
            duration={500}
            height={heightDropdown}
          >
            {feedSubcategories.map((x, i) => {
              return (
                <label className="bold labelSub" key={i}>
                  <input
                    type="checkbox"
                    checked={!!displayData[0] && x.key in displayData[0]}
                    onChange={() => handleChangeFeed(x.key)}
                  />
                  {x.label}
                  <br/>
                </label>
              );
            })}
          </AnimateHeight>
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
            <Tooltip isAnimationActive={false} offset={10000000} />
            {!!displayData[0] && (
              <Legend
                iconType="line"
                payload={Object.keys(displayData[0])
                  .filter((x) => x !== "name")
                  .map((x, i) => ({
                    value: x,
                    type: "diamond",
                    id: x,
                    color: colorsFeed[i],
                  }))}
              />
            )}
            {displayData.map((x, i) => {
              return (
                <Line
                  isAnimationActive={false}
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
  ".optionsBox": {
    ".category": {
      display: "flex",
      flexDirection: "row",
      ".image_dropdown": {
        width: "20px",
      },
    },
    ".subCategory": {
      marginLeft: "5%",
      display: "flex",
      flexDirection: "row",
      ".labelSub": {
        // flexDirection: "column",
      }
    },
  },
};
