/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { api } from "../../../../helpers/api";
import WithToast from "../../../../modals/Toast";
import Button from "../../../general/Button1";

function EditForecastComp({ setMessage }) {
  const navigate = useNavigate();

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

    const invalidNum1 = Number(valEstimated) > 100 || Number(valEstimated) < 1;
    const invalidNum2 = Number(valForecast) > 100 || Number(valForecast) < 0;

    if (invalidNum1 || invalidNum2)
      return setMessage({ txt: "Use numbers between 1 and 100", type: "warn" });

    const { ok } = await api("post", "/feed/submit_forecast", {
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

  function handleChange(evt) {
    const value = evt.target.value;
    setInputValues({
      ...inputValues,
      [evt.target.name]: value,
    });
  }

  return (
    <div>
      <div css={headStyle}>
        <div
          onClick={() => navigate(-1)}
          className="flexCenter backWrapper pointer"
        >
          <img src="https://img.icons8.com/ios-filled/50/null/chevron-left.png" />
        </div>
      </div>
      <div css={editForecastStyle}>
        <div className="tableStyle">
          <div className="tableGrid head">
            <div className="bold">Week</div>
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
        <form className="addBox" onSubmit={(e) => e.preventDefault()}>
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
                min="1"
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
                min="1"
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
            bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
            bgHover="#3988e2"
            color="white"
          />
        </form>
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

const headStyle = {
  display: "flex",
  alignItems: "center",
  height: "50px",
  width: "100%",
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
};

const editForecastStyle = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr",
  height: "calc(60vh - 50px)",
  border: "solid #D2D2D2",
  borderWidth: "0 1px 1px 1px",
  ".tableStyle": {
    margin: "10px 10px 0 10px",
    ".head": {
      border: "solid black",
      borderWidth: "0 1px 0 0",
      borderRadius: "20px 20px 0 0",
      height: "40px",
      backgroundColor: "#338DF1",
      "> div:first-of-type": {
        borderRadius: "20px 0 0 0",
      },
      "> div:last-child": {
        borderRadius: "0 20px 0 0",
      },
      div: {
        color: "white",
      },
    },
    ".tableBody": {
      border: "solid black",
      borderWidth: "0 1px 1px 0",
      maxHeight: "calc(60vh - 100px)",
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
    margin: "auto",
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
