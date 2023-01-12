import React, { useEffect, useState } from "react";

import { api } from "../../../helpers/api";
import WithToast from "../../../modals/Toast";

// dia 15 feed + ifd
// propuesta sean:
// - funcionalidad
// - optimizar feed + ifd
// +15 días + plan con sean

function EditForecastComp({setMessage}) {
  const [forecast, setForecast] = useState([]);
  const [inputValues, setInputValues] = useState({
    estimated: 0,
    forecast: 0,
  });

  const getData = async () => {
    const { body } = await api("get", "/feed/get_forecast");
    setForecast(body);
  };
  
  useEffect(() => {
    getData();

  }, []);

  const submitChanges = async () => {
    const { estimated: valEstimated, forecast: valForecast } = inputValues;
    console.log("Value: ", valEstimated, valForecast);

    const invalidNum1 = Number(valEstimated) > 100 || Number(valEstimated) < 0
    const invalidNum2 = Number(valForecast) > 100 || Number(valForecast) < 0

    if (invalidNum1 || invalidNum2)
      return setMessage({ txt: "Use numbers between 0 and 100", type: "warn" });

    const { ok } = await api("post", "/feed/submit_forecast", false, {
      day: forecast.length + 1,
      estimated: valEstimated,
      forecast: valForecast,
    });
    if (ok) {
      getData()
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
    <div>
      <div>
        <table style={{ border: "1px solid", margin: "0 auto" }}>
          <thead>
            <tr>
              <th>Day</th>
              <th>Estimated</th>
              <th>Forecast</th>
            </tr>
          </thead>
          <tbody>
            {forecast.map((x) => (
              <tr key={x.day}>
                <td>{x.day}</td>
                <td>{x.estimated}</td>
                <td>{x.forecast}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>New Forecast</label>
        <div>
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
        <div>
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
      <div style={{ margin: "0 auto" }}>
        <button
          onClick={() => submitChanges()}
          style={{
            margin: "0 auto",
            marginRight: "5px",
            fontSize: "16px",
            width: "160px",
            borderRadius: "10px",
          }}
        >
          Save
        </button>
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