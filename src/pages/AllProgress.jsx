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

import {
  prepareRowsFeed,
  prepareRowsIFD,
} from "../components/FEED/feedProgress/feedProgressHelpers";
import { api } from "../helpers/api";

export default function AllProgress() {
  const [displayData, setDisplayData] = useState([]);
  const [feedWeeks, setFeedWeeks] = useState([]);
  const [ifdWeeks, setIFDWeeks] = useState([]);
  const [heightDropdownFeed, setHeightDropdownFeed] = useState(0);
  const [heightDropdownIFD, setHeightDropdownIFD] = useState(0);

  useEffect(() => {
    const getFeedData = async () => {
      const { body } = await api("get", "/feed/get_gfeed");
      const data = prepareRowsFeed(body);
      setDisplayData([...data]);
      setFeedWeeks(JSON.parse(JSON.stringify(data)));
    };
    const getIFDData = async () => {
      const { body } = await api("get", "/ifd/get_ifd_progress");
      const data = prepareRowsIFD(body);
      setDisplayData([...data]);
      setIFDWeeks(JSON.parse(JSON.stringify(data)));
    };
    getIFDData();
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

  const handleChangeIFD = (key) => {
    let tempData = [...displayData];
    // check if key exists in displayData
    if (key === "ifd") {
      // check if all ifdSubcategories are in displayData
      if (ifdSubcategories.every((x) => displayData[0].hasOwnProperty(x.key))) {
        // if they are remove all
        ifdSubcategories.every((x) => tempData.map((y) => delete y[x.key]));
      } else {
        // else they add all
        ifdSubcategories.map((y) => {
          tempData = tempData.map((x, i) => {
            return {
              ...x,
              [y.key]: ifdWeeks[i][y.key],
            };
          });
        });
      }
    } else if (tempData[0] && key in tempData[0]) {
      // if exists delete
      tempData.map((x) => delete x[key]);
    } else {
      tempData = tempData.map((x, i) => {
        return { ...x, [key]: ifdWeeks[i][key] };
      });
    }
    setDisplayData(tempData);
  };

  const colorsFeed = ["brown", "red", "blue", "salmon"];
  const colorsIFD = ["black", "orange", "purple", "green"];

  const allColors = [...colorsFeed, ...colorsIFD]


  const feedSubcategories = [
    { label: "Current Weight Feed", key: "Current Weight Feed" },
    { label: "Max Weight Feed", key: "Max Weight Feed" },
    { label: "Estimated Feed", key: "Estimated Feed" },
    { label: "Forecast Feed", key: "Forecast Feed" },
  ];

  const ifdSubcategories = [
    { label: "Current Weight IFD", key: "Current Weight IFD" },
    { label: "Max Weight IFD", key: "Max Weight IFD" },
    { label: "Estimated IFD", key: "Estimated IFD" },
    { label: "Forecast IFD", key: "Forecast IFD" },
  ];

  return (
    <div css={progresstyle}>
      <div className="optionsBox">
        {/* Feed */}
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
              heightDropdownFeed === 0
                ? "https://img.icons8.com/material-outlined/24/null/filled-plus-2-math.png"
                : "https://img.icons8.com/material-outlined/24/null/indeterminate-checkbox.png"
            }
            onClick={() =>
              setHeightDropdownFeed(heightDropdownFeed === 0 ? "auto" : 0)
            }
          />
        </div>
        <div className="subCategory">
          <AnimateHeight
            id="image_dropdown"
            duration={500}
            height={heightDropdownFeed}
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
                  <br />
                </label>
              );
            })}
          </AnimateHeight>
        </div>
        {/* IFD */}
        <div className="category">
          <label className="bold">
            <input
              type="checkbox"
              checked={
                !!displayData[0] &&
                ifdSubcategories.every((x) =>
                  displayData[0].hasOwnProperty(x.key)
                )
              }
              onChange={() => handleChangeIFD("ifd")}
            />
            IFD
          </label>
          <img
            aria-controls="image_dropdown"
            className="image_dropdown"
            src={
              heightDropdownIFD === 0
                ? "https://img.icons8.com/material-outlined/24/null/filled-plus-2-math.png"
                : "https://img.icons8.com/material-outlined/24/null/indeterminate-checkbox.png"
            }
            onClick={() =>
              setHeightDropdownIFD(heightDropdownIFD === 0 ? "auto" : 0)
            }
          />
        </div>
        <div className="subCategory">
          <AnimateHeight
            id="image_dropdown"
            duration={500}
            height={heightDropdownIFD}
          >
            {ifdSubcategories.map((x, i) => {
              return (
                <label className="bold labelSub" key={i}>
                  <input
                    type="checkbox"
                    checked={!!displayData[0] && x.key in displayData[0]}
                    onChange={() => handleChangeIFD(x.key)}
                  />
                  {x.label}
                  <br />
                </label>
              );
            })}
          </AnimateHeight>
        </div>
      </div>
      {/* Graphic */}
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
                    color: allColors[i],
                  }))}
              />
            )}
            {!!displayData[0] && Object.keys(displayData[0]).map((x, i) => {
              return (
                <Line
                  isAnimationActive={false}
                  key={i}
                  type="monotone"
                  dataKey={x}
                  stroke={allColors[i]}
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
      },
    },
  },
};
