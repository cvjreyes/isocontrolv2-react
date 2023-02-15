/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { prepareRows } from "../components/FEED/feedProgress/feedProgressHelpers";
import Main from "../components/progress/Main";
import Titles from "../components/progress/Titles";
import { api } from "../helpers/api";

export default function Progress() {
  const { section } = useParams();
  console.log(section);

  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const { body } = await api("get", `/${section}/get_progress_data`);
      const prepared = prepareRows(body, section);
      setData(prepared);
    };
    getData();
  }, [section]);

  return (
    <div css={progressStyle}>
      <Titles />
      <div>
        {data.map((x, i) => {
          return (
            <div key={i}>
              <div>
                {Object.entries(x).map((y, j) => {
                  return <div key={j}>{y}</div>;
                })}
              </div>
            </div>
          );
        })}
        {/* componente de gráfica */}
        <Main data={data} />
      </div>
    </div>
  );
}

const progressStyle = {
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
      marginLeft:"-90%"
    },
  },
};
