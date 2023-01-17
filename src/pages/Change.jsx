/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import { AuthContext } from "../context/AuthContext";
import Main from "../layouts/Main";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";
import WithToast from "../modals/Toast";
import { URL } from "../helpers/config";

import IsoTrackerLogo from "../assets/images/IsoTracker.svg";
import FullTrackerLogo from "../assets/images/3DTracker.svg";
import Eye from "../assets/images/eye.png";
import { api } from "../helpers/api";

const ChangeComp = ({ setMessage }) => {
  const { login } = useContext(AuthContext);

  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [form, setForm] = useState({
    email: "",
    old_password: "",
    new_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api("post", "/users/change_password", 0, {
      email: form.email,
      old_password: form.old_password,
      new_password: form.new_password,
    });
    console.log(res);
    return;
    try {
      const res = await axios.post(`${URL}/users/login`);
      if (!res.data.ok) return setMessage({ type: "warn", txt: res.data.body });
      setTimeout(() => login(res.data.body), 1000);
      setMessage({
        type: "success",
        txt: "Password changed successfully!",
      });
    } catch (err) {
      setMessage({
        type: "error",
        txt: "Something went wrong",
      });
      console.error(err);
    }
  };

  return (
    <Main logo="Technip" circles={true}>
      <form css={mainStyle} onSubmit={handleSubmit}>
        <img
          src={import.meta.env.VITE_PROGRESS ? FullTrackerLogo : IsoTrackerLogo}
          alt="isoTrackerLogo"
          className="isoTrackerLogo"
        />

        <h3 className="change">Change Password</h3>
        <p className="pleaseEnter">
          Please, enter your current password, new password and new password
          confirmation.
        </p>
        <label htmlFor="email">E-mail</label>
        <div className="inputWrapper">
          <Input1
            id="email"
            name="email"
            value={form.email}
            type="email"
            onChange={handleChange}
          />
        </div>
        <label htmlFor="old_password">Old Password</label>
        <div className="inputWrapper">
          <Input1
            id="old_password"
            name="old_password"
            value={form.old_password}
            type={oldPasswordShown ? "text" : "password"}
            onChange={handleChange}
          />
          <img
            onClick={() => setOldPasswordShown((prevVal) => !prevVal)}
            src={Eye}
            alt="eye"
            className="eyeStyle pointer"
          />
        </div>
        <label htmlFor="new_password">New Password</label>
        <div className="inputWrapper">
          <Input1
            id="new_password"
            name="new_password"
            value={form.new_password}
            type={newPasswordShown ? "text" : "password"}
            onChange={handleChange}
          />
          <img
            onClick={() => setNewPasswordShown((prevVal) => !prevVal)}
            src={Eye}
            alt="eye"
            className="eyeStyle pointer"
          />
        </div>
        <Button1
          text="Save"
          bgColor="#0070ED"
          bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
          color="white"
          border="1px solid #0070ED"
          margin="10px auto 0"
        />
      </form>
    </Main>
  );
};

const mainStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  padding: "50px",
  width: "500px",
  marginLeft: "10%",
  ".isoTrackerLogo": {
    width: "343.57px",
  },
  ".change": {
    fontSize: "25px",
    margin: "30px 0 0",
  },
  ".pleaseEnter": { margin: "30px 0 30px" },
  label: { fontWeight: "bold" },
  input: { width: "400px" },
  ".inputWrapper": {
    width: "400px",
    position: "relative",
    display: "flex",
    alignItems: "center",
    margin: "5px 0 20px",
    ".eyeStyle": {
      position: "absolute",
      right: "20px",
      width: "20px",
    },
  },
};

// using this components to use modals
export default function Change() {
  return (
    <WithToast>
      <ChangeComp />
    </WithToast>
  );
}
