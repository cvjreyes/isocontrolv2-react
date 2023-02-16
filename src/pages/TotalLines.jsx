/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useEffect } from "react";

import { api } from "../helpers/api";
import Button2 from "../components/general/Button2";
import Input1 from "../components/general/Input1";
import WithToast from "../modals/Toast";

import saveImg from "../assets/images/save.svg";
function TotalLinesComp({ setMessage }) {
  const [totals, setTotals] = useState(null);

  useEffect(() => {
    const getTotals = async () => {
      const { body } = await api("get", "/totals/FEED");
      setTotals(body);
    };
    getTotals();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const tempTotals = [...totals];
    const idx = tempTotals.findIndex((x) => x.page === name);
    tempTotals[idx] = { ...tempTotals[idx], total: value };
    setTotals(tempTotals);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    const res = await api("post", "/totals/update", { totals });
    setMessage({ txt: "Changes saved!", type: "success" });
  };

  return (
    <div css={totalsStyle}>
      <form className="content" onSubmit={handleSubmit}>
        <h2>Total Lines</h2>
        {totals &&
          totals.map((total) => {
            return (
              <div className="row" key={total.page}>
                <div>{total.page}:</div>
                <Input1
                  name={total.page}
                  value={total.total || 0}
                  onChange={handleChange}
                  type="number"
                />
              </div>
            );
          })}
        <Button2
          text="Save"
          width="100px"
          border="none"
          bgColor="#0070ED"
          color="white"
          fontWeight="600"
          fontSize="14px"
          textMargin="0 0 0 5px"
          hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
          margin="30vh auto 0"
          // img
          alt="save"
          src={saveImg}
          imgWidth="30px"
        />
      </form>
    </div>
  );
}

const totalsStyle = {
  textAlign: "center",
  padding: "50px 0 0",
  background:
    "linear-gradient(322deg, rgba(251,251,251,1) 0%, rgba(255,255,255,1) 48%, rgba(244,244,244,1) 100%)",
  height: "calc(100vh - 50px)",
  ".content": {
    width: "70vw",
    margin: "0 auto",
    padding: "5vw 10vw",
    borderRadius: "20px",
    height: "70vh",
    background:
      "linear-gradient(322deg, rgba(191,231,251,1) 0%, rgba(180,208,255,1) 48%, rgba(220,248,255,1) 100%)",
    h2: { fontSize: "1.5rem" },
    ".row": {
      display: "flex",
      justifyContent: "space-between",
      margin: "2rem auto 0",
      width: "60%",
      div: { fontSize: "1.25rem" },
    },
  },
};

// using this components to use modals
export default function TotalLines() {
  return (
    <WithToast>
      <TotalLinesComp />
    </WithToast>
  );
}
