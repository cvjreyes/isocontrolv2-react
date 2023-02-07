/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import axios from "axios";

import Main from "../layouts/Main";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";
import WithToast from "../modals/Toast";
import { URL } from "../helpers/config";

import IsoControlLogo from "../assets/images/IsoControl.svg";
import { api } from "../helpers/api";

// request access button => redirect to email input => send email with link => click link => go to create pw

const RequestComp = ({ setMessage }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)
      return setMessage({ type: "warn", txt: "Please, fill all fields!" });
    const res = await api("post", "/emails/request_access", email);

    if (!res.data.ok) return setMessage({ type: "warn", txt: res.data.body });
    setTimeout(() => login(res.data.body), 1000);
    setMessage({
      type: "success",
      txt: `Welcome back, ${res.data.body.email}`,
    });
  };

  return (
    <Main logo="Technip" circles={true}>
      <form css={mainStyle} onSubmit={handleSubmit}>
        <img
          src={IsoControlLogo}
          alt="IsoControlLogo"
          className="IsoControlLogo"
        />

        <h3 className="welcome">Request Access</h3>
        <p className="pleaseEnter">
          Please, enter your e-mail account and a link to create your password
          will be sent.
        </p>
        <label htmlFor="email">E-mail</label>
        <div className="inputWrapper">
          <Input1
            id="email"
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <Button1
          text="Send link"
          bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
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
  justifyContent: "center",
  padding: "50px",
  width: "500px",
  marginLeft: "10%",
  ".IsoControlLogo": {
    width: "343.57px",
  },
  ".welcome": {
    fontSize: "25px",
    margin: "40px 0 0",
  },
  ".pleaseEnter": { margin: "40px 0 30px" },
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
export default function Request() {
  return (
    <WithToast>
      <RequestComp />
    </WithToast>
  );
}
