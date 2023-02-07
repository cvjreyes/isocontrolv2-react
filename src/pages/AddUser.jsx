/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState, useEffect } from "react";

import { api, handleFetch } from "../helpers/api";

import WithToast from "../modals/Toast";
import AddUsersBox from "../components/AddUser/AddUsersBox";
import ListOfUsers from "../components/AddUser/ListOfUsers";

// añadir degradfado azul bgC

function AddUserComp({ setMessage }) {
  const [data, setData] = useState(
    [...Array(3).keys()].map((_) => ({
      email: "",
      roles: [{ value: "Design", label: "Design" }],
    }))
  );
  const [rowsToAdd, setRowsToAdd] = useState(1);
  const [roles, setRoles] = useState([]);
  const [users, setUsers] = useState(null);
  const [changed, setChanged] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const results = await Promise.allSettled([
        api("get", "/roles/get_all"),
        api("get", "/users/get_all"),
      ]);
      const [tempRoles, tempUsers] = handleFetch(results);
      setRoles(tempRoles);
      setUsers(tempUsers);
    };
    getData();
  }, []);

  const getUsers = async () => {
    const { body } = await api("get", "/users/get_all");
    setUsers(body);
  };

  const changeRowsToAdd = ({ value }) => {
    setRowsToAdd(value);
  };

  const addRows = () => {
    const tempData = [...data];
    for (let i = 0; i < rowsToAdd; i++)
      tempData.push({
        email: "",
        roles: [{ label: "Design", value: "Design" }],
      });
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

  const handleUserRoleChange = (e, i) => {
    const tempUsers = [...users];
    if (e.some((x) => x.value === "All")) {
      tempUsers[i].roles = roles.map((x) => ({ label: x.name, value: x.name }));
    } else tempUsers[i].roles = e;
    setUsers(tempUsers);
    addToChanged(i);
  };

  const addToChanged = (i) => {
    const tempChanged = [...changed];
    if (!tempChanged.includes(i)) tempChanged.push(i);
    setChanged(tempChanged);
  };

  const handlePaste = (e, i) => {
    e.clipboardData.items[0].getAsString((text) => {
      const tempData = [...data];
      let emails = text.split("\n");
      emails.forEach((line, y) => {
        if (line.length < 1) return;
        const newLine = line.replace(/(\r\n|\n|\r)/gm, "");
        tempData[i + y] = {
          email: newLine,
          roles: [{ value: "Design", label: "Design" }],
        };
      });
      setData(tempData);
    });
  };

  const clear = () => {
    setData(
      [...Array(3).keys()].map((_) => ({
        email: "",
        roles: [{ value: "Design", label: "Design" }],
      }))
    );
    const dataToSend = data.filter((x) => x.email);
    if (dataToSend.length < 1)
      return setMessage({ txt: "No changes to undo", type: "warn" });
    setMessage({ txt: "Changes undone", type: "success" });
  };

  const clearUsers = () => {
    getUsers();
    setChanged([]);
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
      getUsers();
      return setMessage({
        txt: "Users added successfully!",
        type: "success",
      });
    }
    setMessage({ txt: body, type: "error" });
  };

  const handleUsersSubmit = async (e) => {
    e && e.preventDefault();
    if (changed.length < 1)
      return setMessage({ txt: "No changes to save", type: "warn" });
    const dataToSend = users.filter((_, i) => changed.includes(i));
    if (dataToSend.filter((x) => x.roles.length === 0).length > 0)
      return setMessage({
        txt: "All users must have a role",
        type: "warn",
      });
    const { ok, body } = await api("post", "/users/update", {
      data: dataToSend,
    });
    if (ok) {
      setChanged([]);
      return setMessage({
        txt: body,
        type: "success",
      });
    }
    setMessage({ txt: body, type: "error" });
  };

  return (
    <div css={addUserStyle}>
      <div className="body">
        <AddUsersBox
          data={data}
          roles={roles}
          handleSelectChange={handleSelectChange}
          handleChange={handleChange}
          handlePaste={handlePaste}
          clear={clear}
          addRows={addRows}
          changeRowsToAdd={changeRowsToAdd}
          handleSubmit={handleSubmit}
        />
        <ListOfUsers
          users={users}
          handleUserRoleChange={handleUserRoleChange}
          roles={roles}
          changed={changed}
          clear={clearUsers}
          handleSubmit={handleUsersSubmit}
        />
      </div>
    </div>
  );
}

const addUserStyle = {
  textAlign: "center",
  marginTop: "50px",
  h2: { fontSize: "25px" },
  ".body": {
    display: "grid",
    gridTemplateColumns: "1.25fr 2fr",
  },
};

export default function AddUser() {
  return (
    <WithToast>
      <AddUserComp />
    </WithToast>
  );
}
