import React, { useEffect, useState } from "react";
import { HotTable } from "@handsontable/react";

import { api } from "../../../helpers/api";
import { prepareForecast } from "./feedProgressHelpers";

// - testear afterChange de HotTable

// dia 15 feed + ifd
// propuesta sean:
// - funcionalidad
// - optimizar feed + ifd
// +15 días + plan con sean

export default function EditForecast(props) {
  const [forecastObj, setForecastObj] = useState({});

  const [daysArray, setDaysArray] = useState([]);
  const [estimatedArray, setEstimatedArray] = useState([]);
  const [forecastArray, setForecastArray] = useState([]);
  const [addDayClicked, setAddDayClicked] = useState(false);

  useEffect(() => {
    const getData = async () => {
      const { forecast } = await api("get", "/getFeedForecast", true);

      const { daysA, estimatedA, forecastA } = prepareForecast(forecast);
      setDaysArray(daysA);
      setEstimatedArray(estimatedA);
      setForecastArray(forecastA);
      setForecastObj(forecast);
    };

    getData();
  }, []);

  useEffect(() => {
    console.log(
      "Data: ",
      daysArray,
      estimatedArray,
      forecastArray,
      forecastObj
    );
  }, [daysArray, estimatedArray, forecastArray, forecastObj]);

  const addDay = async () => {
    let tempDaysArray = [...daysArray];
    let tempEstimatedArray = [...estimatedArray];
    let tempForecastArray = [...forecastArray];

    let newDay = "D" + (daysArray.length + 1);
    tempDaysArray.push(newDay);
    tempEstimatedArray.push("");
    tempForecastArray.push("");

    setDaysArray(tempDaysArray);
    setEstimatedArray(tempEstimatedArray);
    setForecastArray(tempForecastArray);

    setAddDayClicked(true);
  };

  // const submitChanges = async () => {
  //   const invalidNum1 = Object.values(estimated).some(
  //     (item) => !item || isNaN(item) || Number(item) > 100 || Number(item) < 0
  //   );
  //   const invalidNum2 = Object.values(forecast).some(
  //     (item) => isNaN(item) || Number(item) > 100 || Number(item) < 0
  //   );
  //   if (invalidNum1 || invalidNum2)
  //     return props.alert("Invalid number", "warning");
  //   const { success } = await api("post", "/submitFeedForecast", true, {
  //     estimated: estimated,
  //     forecast: forecast,
  //   });
  //   if (success) {
  //     props.alert("Changes saved!", "success");
  //   }
  // };

  // const settings = {
  //   licenseKey: "non-commercial-and-evaluation",
  //   colWidths: 40,
  //   rowHeaderWidth: 190,
  // };

  return (
    <div className="feed__forecast_container">
      {/* <HotTable
        data={[estimated, forecast]}
        colHeaders={Object.keys(estimated)}
        rowHeaders={["Estimated (%)", "Forecast (%)"]}
        width="1550"
        height="160"
        settings={settings}
        manualColumnResize={true}
        manualRowResize={true}
        filters={true}
        className="mat1-table"
      /> */}
      <div>
        <table style={{ border: "1px solid" }}>
          <thead>
            <tr>
              {daysArray.map((x) => (
                <th key={`D${x}`}>{x}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              {estimatedArray.map((x, y) => {
                return (
                  <td key={`E${x}${y}`}>
                    {y + 1 === estimatedArray.length && addDayClicked ? (
                      <input style={{ width: "50px", height: "30px" }} />
                    ) : (
                      <span>{x}</span>
                    )}
                  </td>
                );
              })}
            </tr>
            <tr>
              {forecastArray.map((x, y) => {
                return (
                  <td key={`E${x}${y}`}>
                    {y + 1 === forecastArray.length && addDayClicked ? (
                      <input style={{ width: "50px", height: "30px" }} />
                    ) : (
                      <span>{x}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <button
          className="btn btn-sm btn-info"
          onClick={() => addDay()}
          style={{
            marginLeft: "570px",
            marginRight: "25px",
            fontSize: "16px",
            width: "160px",
            borderRadius: "10px",
          }}
          disabled={addDayClicked}
        >
          Add
        </button>
        <button
          className="btn btn-sm btn-success"
          // onClick={() => submitChanges()}
          style={{
            marginRight: "5px",
            fontSize: "16px",
            width: "160px",
            borderRadius: "10px",
          }}
          disabled={!addDayClicked}
        >
          Save
        </button>
      </div>
    </div>
  );
}
