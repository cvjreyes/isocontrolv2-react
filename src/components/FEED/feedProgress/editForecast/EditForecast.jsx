/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../../../../context/AuthContext";
import { api } from "../../../../helpers/api";
import WithToast from "../../../../modals/Toast";
import WithModal from "../../../../modals/YesNo";
import EditForecastRow from "./EditForecastRow";
import EditForecastHead from "./EditForecastHead";

function EditForecastComp({ setMessage, setModalContent }) {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);
  const [changed, setChanged] = useState([]);
  const [rowsToAdd, setRowsToAdd] = useState(1);

  const getData = async () => {
    const { body } = await api("get", "/feed/get_forecast");
    setData(body);
  };

  useEffect(() => {
    const checkRoles = () => {
      if (!user.roles.some((x) => x.name.includes("Speciality Lead")))
        navigate("/");
    };
    checkRoles();
    getData();
  }, []);

  function handleChange({ target }, i) {
    const { name, value } = target;
    // check for nums 1-100 or empty string
    const regex = /^[1-9][0-9]?$|^100$/;
    if (regex.test(value) !== true && value) return;
    const tempData = [...data];
    const tempRow = { ...tempData[i] };
    tempRow[name] = Number(value);
    tempData[i] = tempRow;
    setData(tempData);
    addToChanged(tempRow.week);
  }

  const addToChanged = (i) => {
    const tempChanged = [...changed];
    // findIndex
    const idx = tempChanged.indexOf(i);
    // if not => add
    idx < 0 && tempChanged.push(i);
    setChanged(tempChanged);
  };

  const changeRowsToAdd = ({ value }) => {
    setRowsToAdd(value);
  };

  const addRows = () => {
    const tempData = [...data];
    let toAdd = [];
    [...Array(rowsToAdd).keys()].forEach((_) => {
      tempData.unshift({
        id: tempData.length + 1,
        week: tempData.length + 1,
        estimated: 0,
        forecast: 0,
      });
      toAdd.push(tempData.length);
    });
    setData(tempData);
    setChanged([...changed, ...toAdd]);
  };

  const clear = () => {
    getData();
    if (changed.length < 1)
      return setMessage({ txt: "No changes to undo!", type: "warn" });
    setMessage({ txt: "Changes undone!", type: "success" });
    setChanged([]);
  };

  const submitChanges = async () => {
    if (changed.length < 1)
      return setMessage({ txt: "No changes to save!", type: "warn" });
    const dataToSend = data.filter((x) => changed.includes(x.week));
    const { ok } = await api("post", "/feed/submit_forecast", {
      data: dataToSend,
    });
    if (ok) {
      setChanged([]);
      return setMessage({ txt: "Changes saved!", type: "success" });
    }
    return setMessage({ txt: "Something went wrong", type: "error" });
  };

  const handleDelete = (week) => {
    setModalContent({
      openModal: true,
      text: `Are you sure you want to delete week: ${week}`,
      onClick1: () => deleteEntry(week),
    });
  };

  const deleteEntry = async (week) => {
    const { ok } = await api("delete", `/feed/delete_forecast/${week}`);
    if (ok) {
      // slice
      const tempData = [...data];
      const idx = data.findIndex((x) => x.week === week);
      tempData.splice(idx, 1);
      setData(tempData);
      // message
      return setMessage({ txt: "Row deleted successfully!", type: "success" });
    }
    setMessage({ txt: "Something went wrong", type: "error" });
  };

  const columns = [
    { title: "Week", key: "week", readOnly: true },
    { title: "Estimated", key: "estimated" },
    { title: "Forecast", key: "forecast" },
  ];

  return (
    <div css={editForecastStyle}>
      <EditForecastHead
        addRows={addRows}
        clear={clear}
        submitChanges={submitChanges}
        changeRowsToAdd={changeRowsToAdd}
      />
      <div className="tableWrapper">
        <div className="header">
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
                handleDelete={handleDelete}
                length={data.length}
                changeRowsToAdd={changeRowsToAdd}
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
      <WithModal>
        <EditForecastComp />
      </WithModal>
    </WithToast>
  );
}

const editForecastStyle = {
  ".head": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "50px",
    padding: "0 10% 0 2%",
    backgroundColor: "#338DF1",
    ".left": {
      display: "flex",
      ".backWrapper": {
        width: "40px",
        height: "40px",
        borderRadius: "100px",
        ":hover": {
          boxShadow: "inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff",
        },
        img: { width: "20px", filter: "invert(100%)" },
      },
      ".selectWrapper": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "20px",
        ".css-1nmdiq5-menu, .css-1nmdiq3-menu": {
          cursor: "pointer",
        },
        div: {
          cursor: "pointer",
        },
        label: {
          marginRight: ".5rem",
          color: "white",
        },
      },
    },
    ".right": {
      display: "flex",
    },
  },
  ".tableWrapper": {
    border: "solid #D2D2D2",
    borderWidth: "0 1px 1px 1px",
    height: "calc(70vh - 50px)",
    padding: "10px 0 0 10px",
    ".cell": { padding: "10px", textAlign: "center" },
    ".header": {
      borderRadius: "20px 20px 0 0",
      height: "40px",
      backgroundColor: "#338DF1",
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      width: "80%",
      ".cell": { color: "white" },
    },
    ".addWrapper": {
      backgroundColor: "#338DF1",
      borderRadius: "100px",
      width: "30px",
      height: "30px",
      marginLeft: "10px",
      ":hover": {
        boxShadow: "inset 7px 7px 13px #2f83e0, inset -7px -7px 13px #3797ff",
      },
      img: {
        padding: "5px",
      },
    },
    ".table": {
      maxHeight: "calc(70vh - 101px)",
      border: "solid black",
      borderWidth: "0 0 0 1px",
      ".tableGrid": {
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        height: "50px",
        width: "80%",
        ".cell": {
          padding: "10px",
          textAlign: "center",
          border: "solid black",
          borderWidth: "0 1px 1px 0",
        },
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
