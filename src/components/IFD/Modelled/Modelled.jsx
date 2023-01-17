/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect } from "react";

import { api } from "../../../helpers/api";
import { buildDate, buildTag } from "../../FEED/feedPipesHelpers";
import Button1 from "../../general/Button1";
import ModelledRow from "./ModelledRow";

// -

export default function Modelled() {
  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);

  const gridSize = ".3fr 1.5fr 0.3fr 0.5fr 1.2fr 0.3fr 0.8fr";
  const titles = [
    { text: "Claim", key: "claim" },
    { text: "Tag", key: "tag" },
    { text: "Type", key: "type" },
    { text: "Date", key: "updated_at" },
    { text: "User", key: "owner" },
    { text: "%", key: "progress" },
    { text: "Actions", key: "actions" },
  ];

  const modelledStyle = {
    ".head": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      marginBottom: "10px",
    },
    ".table": {
      border: "solid black",
      borderWidth: "1px 0 0 1px",
    },
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
        padding: "5%",
      },
    },
  };

  const getModelledIFDPipes = async () => {
    const { body: pipes } = await api("get", "/ifd/get_modelled_ifd_pipes");
    const rows = pipes.map((row) => ({
      ...row,
      tag: buildTag(row),
      updated_at: buildDate(row),
    }));
    setData(rows);
    setDisplayData(rows);
  };

  useEffect(() => {
    getModelledIFDPipes();
  }, []);

  return (
    <div css={modelledStyle}>
      <div className="head">
        <div />
        <div className="flexCenter">Modelled</div>
        <div className="flexCenter">
          <Button1 text="Claim" width="150px" border="1px solid black" />
        </div>
      </div>
      <div className="table">
        <div className="grid">
          {titles.map((title) => {
            return (
              <div key={title.text} className="flexCenter cell">
                <h4 className="bold">{title.text}</h4>
              </div>
            );
          })}
        </div>
        {displayData.map((row) => (
          <ModelledRow key={row.id} row={row} titles={titles} />
        ))}
      </div>
    </div>
  );
}
