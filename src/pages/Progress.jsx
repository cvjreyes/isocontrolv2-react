/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import Titles from "../components/progress/Titles";
import { api } from "../helpers/api";

export default function Progress() {
  const { section } = useParams();

  useEffect(() => {
    const getData = async () => {
      const res = await api("get", `/${section}/get_progress_data`);
      console.log(res);
      // const prepareFeed = prepareRows(tempFeed, "Feed");
      // setIFDWeeks(prepareIFD);
      // setDisplayData([...prepareFeed]);
    };
    getData();
  }, []);
  return (
    <div css={progressStyle}>
      <Titles />

      {/* componente de gráfica */}
      {/* - sidebar */}
      {/* - gráfica */}
    </div>
  );
}

const progressStyle = {};
