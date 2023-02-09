/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { prepareRows } from "../components/FEED/feedProgress/feedProgressHelpers";
import GraphicProgress from "../components/PROGRESS/GraphicProgress";
import Category from "../components/PROGRESS/Category";
import { api, handleFetch } from "../helpers/api";

export default function AllProgress() {
  const [displayData, setDisplayData] = useState([]);
  const [feedWeeks, setFeedWeeks] = useState([]);
  const [ifdWeeks, setIFDWeeks] = useState([]);
  const [heightDropdownFeed, setHeightDropdownFeed] = useState(0);
  const [heightDropdownIFD, setHeightDropdownIFD] = useState(0);

  const colorsFeed = ["brown", "red", "blue", "salmon"];
  const colorsIFD = ["black", "orange", "purple", "green"];

  const allColors = [...colorsFeed, ...colorsIFD];

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

  useEffect(() => {
    const getData = async () => {
      const results = await Promise.allSettled([
        api("get", "/feed/get_feed_progress"),
        api("get", "/ifd/get_ifd_progress"),
      ]);
      const [tempFeed, tempIFD] = handleFetch(results);
      const prepareFeed = prepareRows(tempFeed, "Feed");
      const prepareIFD = prepareRows(tempIFD, "IFD");
      setFeedWeeks(JSON.parse(JSON.stringify(prepareFeed)));
      setIFDWeeks(JSON.parse(JSON.stringify(prepareIFD)));
      // 1 buscar el array mas largo
      // 2 mapear ese array
      // 3 sumar feed con ifd sin repetir name
      setDisplayData([...prepareFeed]);
    };
    getData();
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
                [y.key]: feedWeeks[i] ? feedWeeks[i][y.key] : null,
              };
            });
        });
      }
    } else if (tempData[0] && key in tempData[0]) {
      // if exists delete
      tempData.map((x) => delete x[key]);
    } else {
      tempData = tempData.map((x, i) => {
        return { ...x, [key]: feedWeeks[i] ? feedWeeks[i][key] : null };
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
              [y.key]: ifdWeeks[i] ? ifdWeeks[i][y.key] : null,
            };
          });
        });
      }
    } else if (tempData[0] && key in tempData[0]) {
      // if exists delete
      tempData.map((x) => delete x[key]);
    } else {
      tempData = tempData.map((x, i) => {
        return { ...x, [key]: ifdWeeks[i] ? ifdWeeks[i][key] : null };
      });
    }
    setDisplayData(tempData);
  };

  return (
    <div css={progresstyle}>
      <div className="optionsBox">
        {/* Feed */}
        <Category
          displayData={displayData}
          subcategories={feedSubcategories}
          handleChange={handleChangeFeed}
          heightDropdown={heightDropdownFeed}
          setHeightDropdown={setHeightDropdownFeed}
          categoryName="feed"
        />
        {/* IFD */}
        <Category
          displayData={displayData}
          subcategories={ifdSubcategories}
          handleChange={handleChangeIFD}
          heightDropdown={heightDropdownIFD}
          setHeightDropdown={setHeightDropdownIFD}
          categoryName="ifd"
        />
      </div>
      {/* Graphic */}
      <GraphicProgress displayData={displayData} allColors={allColors} />
    </div>
  );
}

const progresstyle = {
  display: "grid",
  gridTemplateColumns: "1fr 3fr",
  alignItems: "center",
  marginLeft: "5%",
  marginTop: "50px",
  ".optionsBox": {
    height: "fit-content",
    padding: "2rem",
    borderRadius: "16px",
    background: "linear-gradient(225deg, #e6e6e6, #ffffff)",
    boxShadow: "-8px 8px 16px #dedede, 8px -8px 16px #ffffff",
    marginTop: "-10rem",
    input: {
      marginRight: ".5rem",
    },
    ".categoryWrapper": {
      margin: "0 0 2rem",
      ".category": {
        margin: "0 0 0.5rem",
        display: "flex",
        flexWrap: "nowrap",
        justifyContent: "space-between",
        width: "100%",
        paddingRight: "50%",
        label: {
          width: "100%",
        },
        img: {
          width: "20px",
          height: "20px",
          marginLeft: "1rem",
        },
      },
    },
    ".subCategory": {
      marginLeft: "5%",
      display: "flex",
      lineHeight: "2rem",
    },
  },
  ".graphic": {
    // alignItems: "center",
    // justifyContent: "center",
    height: "calc(100vh - 100px)",
  },
};
