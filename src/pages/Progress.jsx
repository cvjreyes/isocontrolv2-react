/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { prepareRows } from "../components/FEED/feedProgress/feedProgressHelpers";
import Main from "../components/PROGRESS/Main";
import Titles from "../components/PROGRESS/Titles";
import { api } from "../helpers/api";

export default function Progress() {
  const { section } = useParams();
  // console.log(section);

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const subcategories = [
    {
      label: `Current Weight ${section}`,
      key: `Current Weight ${section}`,
    },
    {
      label: `Max Weight ${section}`,
      key: `Max Weight ${section}`,
    },
    {
      label: `Estimated ${section}`,
      key: `Estimated ${section}`,
    },
    {
      label: `Forecast ${section}`,
      key: `Forecast ${section}`,
    },
  ];

  useEffect(() => {
    const getData = async () => {
      const { body } = await api("get", `/${section}/get_progress_data`);
      const prepared = prepareRows(body, section);
      setData(prepared);
      setDisplayData(JSON.parse(JSON.stringify(prepared)));
    };
    getData();
  }, [section]);

  const handleChange = (key) => {
    let tempData = [...displayData];
    console.log("Data: ", data);
    console.log("displayData: ", displayData);
    // check if key exists in displayData
    if (key === section) {
      // check if all Subcategories are in displayData
      if (subcategories.every((x) => displayData[0].hasOwnProperty(x.key))) {
        // if they are remove all
        subcategories.every((x) => tempData.map((y) => delete y[x.key]));
      } else {
        // else they add all
        subcategories.map((y) => {
          tempData = tempData.map((x, i) => {
            return {
              ...x,
              [y.key]: data[i] ? data[i][y.key] : null,
            };
          });
        });
      }
    } else if (tempData[0] && key in tempData[0]) {
      // if exists delete
      tempData.map((x) => delete x[key]);
    } else {
      tempData = tempData.map((x, i) => {
        console.log(x);
        console.log("I: ", i, "| key: ", key);
        console.log(key, data[i], data[i][key]);
        return { ...x, [key]: data[i] ? data[i][key] : null };
      });
    }
    setDisplayData(tempData);
  };

  return (
    <div css={progressStyle}>
      <Titles />
      {/* componente de Gráfica y SidePanel */}
      <Main
        data={displayData}
        subcategories={subcategories}
        section={section}
        handleChange={handleChange}
      />
    </div>
  );
}

const progressStyle = {
  height:"90%",
  ".titles": {
    display: "grid",
    justifyContent: "center",
    marginTop: "3%",
    gridRowGap: "50%",
    ".title": {
      display: "grid",
      gridTemplateColumns: "3fr",
      justifySelf: "center",
    },
    ".links": {
      display: "grid",
      gridTemplateColumns: "1fr 1fr 1fr",
      gridColumnGap: "50%",
      marginLeft: "-90%",
    },
  },
  ".mainProgress": {
    display: "grid",
    gridTemplateColumns: "1fr 4fr",
    marginTop: "3%",
    ".sidepanel": {
      justifySelf: "center",
      width: "70%",
      ".category": {
        marginBottom: "5%",
      },
      ".subcategories": {
        marginLeft: "5%",
        ".subcategory": {
          marginBottom: "3%",
        },
      },
    },
    ".graphic": {
      // height: "90%",
    },
  },
};
