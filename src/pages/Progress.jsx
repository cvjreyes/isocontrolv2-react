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

const progressStyle = {};
