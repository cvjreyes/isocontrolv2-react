/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useState } from "react";

import { AuthContext } from "../context/AuthContext";
import Main from "../layouts/Main";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";
import WithToast from "../modals/Toast";

import IsoControlLogo from "../assets/images/IsoControl.svg";
import Eye from "../assets/images/eye.png";
import { api } from "../helpers/api";

const ChangeComp = ({ setMessage }) => {
  const { logout } = useContext(AuthContext);

  const [oldPasswordShown, setOldPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);
  const [confirmNewPasswordShown, setConfirmNewPasswordShown] = useState(false);
  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_new_password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { ok, body } = await api("post", "/users/change_password", {
        old_password: form.old_password,
        new_password: form.new_password,
        confirm_new_password: form.confirm_new_password,
      });
      if (!ok) return setMessage({ txt: body, type: "warn" });
      setMessage({ txt: body, type: "success" });
      setTimeout(() => {
        logout();
      }, 2000);
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
          src={IsoControlLogo}
          alt="IsoControlLogo"
          className="IsoControlLogo"
        />

        <h3 className="change">Change Password</h3>
        <p className="pleaseEnter">
          Please, enter your current password, new password and new password
          confirmation.
        </p>
        <p className="pleaseEnter">
          New password should be at least 6 characters long
        </p>
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
        <label htmlFor="confirm_new_password">Confirm New Password</label>
        <div className="inputWrapper">
          <Input1
            id="confirm_new_password"
            name="confirm_new_password"
            value={form.confirm_new_password}
            type={confirmNewPasswordShown ? "text" : "password"}
            onChange={handleChange}
          />
          <img
            onClick={() => setConfirmNewPasswordShown((prevVal) => !prevVal)}
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
          margin="30px auto 0"
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
  ".IsoControlLogo": {
    width: "343.57px",
  },
  ".change": {
    fontSize: "25px",
    margin: "30px 0 0",
  },
  ".pleaseEnter": { margin: "30px 0 0px" },
  label: { fontWeight: "bold", margin: "20px 0 5px" },
  input: { width: "400px" },
  ".inputWrapper": {
    width: "400px",
    position: "relative",
    display: "flex",
    alignItems: "center",
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
