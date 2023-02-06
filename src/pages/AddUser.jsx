/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useRef } from "react";

import WithToast from "../modals/Toast";
import { api } from "../helpers/api";

import ReactSelect from "react-select";
import Button2 from "../components/general/Button2";
import saveImg from "../assets/images/save.svg";
import addImg from "../assets/images/add.svg";
import { useEffect } from "react";

function AddUserComp({ setMessage }) {
  const selectRef = useRef(null);

  const [data, setData] = useState(
    [...Array(5).keys()].map((_) => ({
      email: "",
      roles: [{ value: "Design", label: "Design" }],
    }))
  );
  const [rowsToAdd, setRowsToAdd] = useState(1);
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const { body } = await api("get", "/roles/get_all");
        setRoles(body);
      } catch (err) {
        console.error(err);
        throw err;
      }
    };
    getRoles();
  }, []);

  const changeRowsToAdd = ({ value }) => {
    setRowsToAdd(value);
  };

  const addRows = () => {
    const tempData = [...data];
    for (let i = 0; i < rowsToAdd; i++)
      tempData.push({ email: "", roles: ["Design"] });
    setData(tempData);
  };

  const handleChange = ({ target }, i) => {
    const { value } = target;
    const tempData = [...data];
    tempData[i].email = value;
    setData(tempData);
  };

  const handleSelectChange = (e, i) => {
    const tempData = [...data];
    if (e.some((x) => x.value === "All")) {
      tempData[i].roles = roles.map((x) => ({ label: x.name, value: x.name }));
    } else tempData[i].roles = e;
    setData(tempData);
  };

  const handlePaste = (e, i) => {
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...data];
      let emails = text.split("\n");
      emails.forEach((line, y) => {
        if (line.length < 1) return;
        const newLine = line.replace(/(\r\n|\n|\r)/gm, "");
        tempData[i + y] = { email: newLine, roles: ["Design"] };
      });
      setData(tempData);
    });
  };

  const clear = () => {
    setData(
      [...Array(5).keys()].map((_) => ({
        email: "",
        roles: [{ value: "Design", label: "Design" }],
      }))
    );
    const dataToSend = data.filter((x) => x.email);
    if (dataToSend.length < 1)
      return setMessage({ txt: "No changes to undo", type: "warn" });
    setMessage({ txt: "Changes undone", type: "success" });
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    const dataToSend = data
      .filter((x) => x.email)
      .map((x) => ({
        ...x,
        roles: x.roles.map((role) => roles.find((y) => role.value === y.name)),
      }));
    if (dataToSend.length < 1)
      return setMessage({ txt: "No users to save", type: "warn" });
    if (dataToSend.filter((x) => x.roles.length === 0).length > 0)
      return setMessage({
        txt: "All users must have a role",
        type: "warn",
      });
    const { ok, body } = await api("post", "/users/create", {
      data: dataToSend,
    });
    if (ok) {
      clear();
      return setMessage({
        txt: "Users added successfully!",
        type: "success",
      });
    }
    setMessage({ txt: body, type: "error" });
  };

  return (
    <form css={addUserStyle} onSubmit={handleSubmit}>
      <div className="head">
        <div className="left flexCenter">
          <div>{data.length} items</div>
          <Button2
            type="button"
            width="100px"
            text="Clear"
            onClick={clear}
            border="none"
            bgColor="#0070ED"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 6px"
            margin="0 0 0 20px"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            // img
            alt="clear"
            src={"https://img.icons8.com/ios-filled/50/null/left2.png"}
            imgFilter="invert(100%) brightness(200%)"
          />
        </div>
        <h2>Add User</h2>
        <div className="right flexCenter">
          <Button2
            type="button"
            text="Add"
            onClick={addRows}
            width="100px"
            margin="0 0 0 10px"
            border="none"
            bgColor="#0070ED"
            color="white"
            fontWeight="600"
            fontSize="14px"
            textMargin="0 0 0 5px"
            hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
            // img
            alt="add"
            src={addImg}
            imgFilter="invert(100%) brightness(200%)"
          />
          <div className="selectWrapper">
            <label
              className="pointer"
              htmlFor="mode"
              onClick={() => selectRef.current.focus()}
            >
              Rows to add:
            </label>
            <ReactSelect
              options={[1, 10, 20].map((num) => ({ value: num, label: num }))}
              openMenuOnFocus={true}
              ref={selectRef}
              onChange={changeRowsToAdd}
              styles={{
                control: (baseStyles) => ({
                  ...baseStyles,
                  border: "none",
                }),
              }}
              defaultValue={{ value: 1, label: 1 }}
            />
          </div>
        </div>
      </div>
      <div className="table">
        {data.map((item, i) => {
          return (
            <div key={i} className="row" onPaste={(e) => handlePaste(e, i)}>
              <input
                placeholder="your@email.com"
                onChange={(e) => handleChange(e, i)}
                value={item.email}
                type="email"
              />
              <ReactSelect
                options={[
                  { value: "All", label: "All" },
                  ...roles.map((x) => ({ label: x.name, value: x.name })),
                ]}
                defaultValue={
                  [...roles.map((x) => ({ label: x.name, value: x.name }))][0]
                }
                value={item.roles}
                onChange={(e) => handleSelectChange(e, i)}
                isMulti
              />
            </div>
          );
        })}
      </div>
      <Button2
        width="100px"
        text="Save"
        onClick={handleSubmit}
        border="none"
        bgColor="#0070ED"
        color="white"
        fontWeight="600"
        fontSize="14px"
        textMargin="0 0 0 6px"
        margin="0 auto"
        hoverShadow="inset 5px 5px 10px #0061ce, inset -5px -5px 10px #007fff"
        // img
        alt="add"
        src={saveImg}
      />
    </form>
  );
}

const addUserStyle = {
  textAlign: "center",
  marginTop: "50px",
  h2: { fontSize: "25px" },
  ".head": {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    alignItems: "center",
    ".left": {
      backgroundColor: "lightgray",
      width: "fit-content",
      padding: "10px 20px",
      borderRadius: "10px",
      justifySelf: "flex-end",
    },
    ".right": {
      backgroundColor: "lightgray",
      width: "fit-content",
      padding: "10px 20px",
      borderRadius: "10px",
      ".selectWrapper": {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "20px",
        label: {
          marginRight: ".5rem",
        },
      },
    },
  },
  ".table": {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    height: "60vh",
    width: "60vw",
    margin: "30px auto",
    overflowY: "auto",
    /* Hide scrollbar for IE, Edge and Firefox */
    msOverflowStyle: "none" /* IE and Edge */,
    scrollbarWidth: "none" /* Firefox */,
    /* Hide scrollbar for Chrome, Safari and Opera */
    "::-webkit-scrollbar": {
      display: "none",
    },
    ".row": {
      width: "100%",
      backgroundColor: "lightgray",
      borderRadius: "6px",
      padding: "10px 20px",
      marginBottom: "20px",
      textAlign: "left",
      input: {
        margin: "0 2rem 1rem 0",
        width: "100%",
        padding: "10px",
      },
    },
  },
};

export default function AddUser() {
  return (
    <WithToast>
      <AddUserComp />
    </WithToast>
  );
}
