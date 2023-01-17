/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import React, { useState, useEffect } from "react";

import { api } from "../../../helpers/api";
import { buildDate, buildTag, isClaimed } from "../../FEED/feedPipesHelpers";
import Button1 from "../../general/Button1";

export default function Modelled() {
  const id = "ifd";
  const page = "main";

  const [data, setData] = useState([]);
  const [displayData, setDisplayData] = useState([]);
  const [claimed, setClaimed] = useState("");

  const gridSize = ".2fr 1.5fr 0.2fr 0.5fr 1.2fr 0.3fr 0.8fr";
  const titles = [
    "Claim",
    "Tag",
    "Type",
    "Date",
    "User",
    "Progress",
    "Actions",
  ];

  const modelledStyle = {
    ".grid": {
      display: "grid",
      gridTemplateColumns: gridSize,
      border: "solid black",
      borderWidth: "1px 0 0 1px",
      div: {
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
      claimed: isClaimed(row),
      updated_at: buildDate(row),
    }));
    console.log("Row: ", rows);
    setData(rows);
    setDisplayData(rows);
  };

  useEffect(() => {
    getModelledIFDPipes();
  }, []);

  return (
    <div>
      <div css={modelledStyle}>
        <div>head</div>
        <div className="grid">
          {titles.map((title) => {
            return (
              <div key={title} className="flexCenter">
                <h4 className="bold">{title}</h4>
              </div>
            );
          })}
        </div>
        {displayData.map((row) => {
          return (
            <div className="grid" key={row.id}>
              {titles.map((title) => {
                if (title === "Claim") {
                  return (
                    <div key={title} className="flexCenter">
                      <input type="checkbox" />
                    </div>
                  );
                } else if (title === "Tag") {
                  return (
                    <div key={title} className="flexCenter">
                      <div>{row.tag}</div>
                    </div>
                  );
                } else if (title === "Type") {
                  return (
                    <div key={title} className="flexCenter">
                      <div>{row.type}</div>
                    </div>
                  );
                } else if (title === "Date") {
                  return (
                    <div key={title} className="flexCenter">
                      <div>{row.updated_at}</div>
                    </div>
                  );
                } else if (title === "User") {
                  if (!row.owner) {
                    return (
                      <div key={title} className="flexCenter">
                        <div>Still not Claimed</div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={title} className="flexCenter">
                        <div>{row.owner}</div>
                      </div>
                    );
                  }
                } else if (title === "Progress") {
                  if (!row.progress) {
                    return (
                      <div key={title} className="flexCenter">
                        <div>0</div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={title} className="flexCenter">
                        <div>{row.progress}</div>
                      </div>
                    );
                  }
                } else if (title === "Actions") {
                  let bgColorValve = "",
                    colorValve = "";
                  let bgColorInstrument = "",
                    colorInstrument = "";

                  if (row.valve === 1) {
                    bgColorValve = "#28a745";
                    colorValve = "white";
                  }

                  if (row.instrument === 1) {
                    bgColorInstrument = "#28a745";
                    colorInstrument = "white";
                  }
                  
                  return (
                    <div key={title} className="flexCenter">
                      <Button1
                        display={row.claimed}
                        color="white"
                        bgColor="#28a745"
                        text="Claimed"
                      />
                      <Button1
                        color={colorValve}
                        bgColor={bgColorValve}
                        text="V"
                      />
                      <Button1
                        color={colorInstrument}
                        bgColor={bgColorInstrument}
                        text="I"
                      />
                    </div>
                  );
                }
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}
