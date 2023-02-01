/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../../helpers/api";
import WithToast from "../../../../modals/Toast";
import EditForecastRow from "./EditForecastRow";

// TODO
// save
// add
// paste

function EditForecastComp({ setMessage }) {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [changed, setChanged] = useState([]);

  const getData = async () => {
    const { body } = await api("get", "/feed/get_forecast");
    setData(body);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitChanges = async () => {
    const { estimated: valEstimated, forecast: valForecast } = inputValues;

    const invalidNum1 = Number(valEstimated) > 100 || Number(valEstimated) < 1;
    const invalidNum2 = Number(valForecast) > 100 || Number(valForecast) < 0;

    if (invalidNum1 || invalidNum2)
      return setMessage({ txt: "Use numbers between 1 and 100", type: "warn" });

    const { ok } = await api("post", "/feed/submit_forecast", false, {
      day: forecast.length + 1,
      estimated: valEstimated,
      forecast: valForecast,
    });
    if (ok) {
      getData();
      setInputValues({
        estimated: 0,
        forecast: 0,
      });
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  function handleChange({ target }, i) {
    const { name, value } = target;
    // check for nums 1-100 or empty string
    const regex = /^[1-9][0-9]?$|^100$/;
    if (regex.test(value) !== true && value) return;
    const tempData = [...data];
    const tempRow = { ...tempData[i] };
    tempRow[name] = value;
    tempData[i] = tempRow;
    setData(tempData);
    addToChanged(i);
  }

  const addToChanged = (i) => {
    const tempChanged = [...changed];
    // findIndex
    const idx = tempChanged.indexOf(i);
    // if not => add
    idx < 0 && tempChanged.push(i);
    setChanged(tempChanged);
  };

  const columns = [
    { title: "Week", key: "week", readOnly: true },
    { title: "Estimated", key: "estimated" },
    { title: "Forecast", key: "forecast" },
  ];

  return (
    <div css={editForecastStyle}>
      <div className="head">
        <div
          onClick={() => navigate(-1)}
          className="flexCenter backWrapper pointer"
        >
          <img src="https://img.icons8.com/ios-filled/50/null/chevron-left.png" />
        </div>
      </div>
      <div className="tableWrapper">
        <div className="tableGrid header">
          {columns.map((col) => {
            return (
              <div key={col.key} className="bold cell">
                {col.title}
              </div>
            );
          })}
        </div>
        <div className="table">
          {data.map((item, i) => {
            return (
              <EditForecastRow
                key={item.id}
                columns={columns}
                item={item}
                i={i}
                changed={changed}
                handleChange={handleChange}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// using this components to use modals
export default function EditForecast() {
  return (
    <WithToast>
      <EditForecastComp />
    </WithToast>
  );
}

const editForecastStyle = {
  ".head": {
    display: "flex",
    alignItems: "center",
    height: "50px",
    backgroundColor: "#338DF1",
    ".backWrapper": {
      width: "40px",
      height: "40px",
      margin: "0 5% 0 2%",
      borderRadius: "100px",
      ":hover": {
        boxShadow: "inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff",
      },
      img: { width: "20px", filter: "invert(100%)" },
    },
  },
  ".tableWrapper": {
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    padding: "10px 20% 0 10px",
    ".tableGrid": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      height: "50px",
      ".cell": {
        padding: "10px",
        textAlign: "center",
      },
    },
    ".header": {
      // border: "1px solid #338DF1",
      borderRadius: "20px 20px 0 0",
      height: "40px",
      backgroundColor: "#338DF1",
      div: { color: "white" },
    },
    ".table": {
      maxHeight: "calc(60vh - 101px)",
      border: "solid black",
      borderWidth: "0 0 0 1px",
      ".cell": {
        border: "solid black",
        borderWidth: "0 1px 1px 0",
      },
      overflowY: "auto",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
  },
};
