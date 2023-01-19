/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";

import { api } from "../../../helpers/api";
import WithToast from "../../../modals/Toast";
import Button from "../../general/Button1";

function EditForecastComp({ setMessage }) {
  const [forecast, setForecast] = useState([]);
  const [inputValues, setInputValues] = useState({
    estimated: 0,
    forecast: 0,
  });

  // - reset inputs when saved
  // - no scroll on table

  const getData = async () => {
    const { body } = await api("get", "/feed/get_forecast");
    setForecast(body);
  };

  useEffect(() => {
    getData();
  }, []);

  const submitChanges = async () => {
    const { estimated: valEstimated, forecast: valForecast } = inputValues;

    const invalidNum1 = Number(valEstimated) > 100 || Number(valEstimated) < 0;
    const invalidNum2 = Number(valForecast) > 100 || Number(valForecast) < 0;

    if (invalidNum1 || invalidNum2)
      return setMessage({ txt: "Use numbers between 0 and 100", type: "warn" });

    const { ok } = await api("post", "/feed/submit_forecast", false, {
      day: forecast.length + 1,
      estimated: valEstimated,
      forecast: valForecast,
    });
    if (ok) {
      getData();
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  function handleChange(evt) {
    const value = evt.target.value;
    setInputValues({
      ...inputValues,
      [evt.target.name]: value,
    });
  }

  return (
    <div css={editForecastStyle}>
      <div className="tableStyle">
        <div className="tableGrid head">
          <div className="bold">Day</div>
          <div className="bold">Estimated</div>
          <div className="bold">Forecast</div>
        </div>
        <div className="tableBody">
          {forecast.map((x) => (
            <div key={x.day} className="tableGrid">
              <div>{x.day}</div>
              <div>{x.estimated}</div>
              <div>{x.forecast}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="addBox">
        <div>
          <h4>New Forecast</h4>
          <div className="inputWrapper">
            <label htmlFor="estimated_input">Estimated: </label>
            <input
              id="estimated_input"
              type="number"
              name="estimated"
              value={inputValues.estimated}
              onChange={handleChange}
              min="0"
              max="100"
            ></input>
          </div>
          <div className="inputWrapper">
            <label htmlFor="forecast_input">Forecast: </label>
            <input
              id="forecast_input"
              type="number"
              name="forecast"
              value={inputValues.forecast}
              onChange={handleChange}
              min="0"
              max="100"
            ></input>
          </div>
        </div>
        <Button
          text="Save"
          width="120px"
          onClick={submitChanges}
          margin="0 auto"
          padding="5px"
          border="1px solid white"
          bgColor="#0070ED"
          bgHover="#3988e2"
          color="white"
        />
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
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  height: "80vh",
  ".tableStyle": {
    margin: "0 auto",
    ".head": {
      border: "solid black",
      borderWidth: "0 1px 0 0",
    },
    ".tableBody": {
      border: "solid black",
      borderWidth: "0 1px 1px 0",
      maxHeight: "60vh",
      overflowY: "auto",
      /* Hide scrollbar for IE, Edge and Firefox */
      msOverflowStyle: "none" /* IE and Edge */,
      scrollbarWidth: "none" /* Firefox */,
      /* Hide scrollbar for Chrome, Safari and Opera */
      "::-webkit-scrollbar": {
        display: "none",
      },
    },
    ".tableGrid": {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      div: {
        padding: "10px",
        textAlign: "center",
        border: "solid black",
        borderWidth: "1px 0 0 1px",
      },
    },
  },
  ".addBox": {
    alignSelf: "center",
    padding: "20px",
    border: "1px solid black",
    borderRadius: "15px",
    width: "fit-content",
    height: "fit-content",
    display: "flex",
    flexDirection: "column",
    h4: {
      textAlign: "center",
    },
    ".inputWrapper": {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      margin: "1rem 0",
      input: {
        textAlign: "center",
        marginLeft: "1rem",
      },
    },
  },
};
