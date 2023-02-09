/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Main from "../layouts/Main";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";
import WithToast from "../modals/Toast";

import IsoControlLogo from "../assets/images/IsoControl.svg";
import { api } from "../helpers/api";

const ForgotComp = ({ setMessage }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email)
      return setMessage({ type: "warn", txt: "Please, fill all fields!" });
    const { ok, body } = await api("post", "/users/request_access", { email });
    if (!ok) return setMessage({ type: "warn", txt: body });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
    setMessage({
      type: "success",
      txt: body,
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
        <div className="titleWrapper">
          <div
            onClick={() => navigate(-1)}
            className="flexCenter backWrapper pointer"
          >
            <img src="https://img.icons8.com/ios-filled/50/null/chevron-left.png" />
          </div>
          <h3 className="welcome">Forgot password</h3>
        </div>
        <p className="pleaseEnter">
          Please, enter your e-mail address and a link will be sent to reset
          your password.
        </p>
        <label htmlFor="email">E-mail</label>
        <div className="inputWrapper">
          <Input1
            id="email"
            name="email"
            value={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@technipenergies.com"
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
  ".titleWrapper": {
    display: "flex",
    alignItems: "center",
    margin: "40px 0 0",
    ".backWrapper": {
      margin: "0 5% 0 0",
      width: "40px",
      height: "40px",
      borderRadius: "100px",
      background: "linear-gradient(45deg, #d1d1d1, #f8f8f8)",
      ":hover": {
        img: { width: "22px" },
      },
      img: { width: "20px" },
    },
    ".welcome": {
      fontSize: "25px",
    },
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
export default function Forgot() {
  return (
    <WithToast>
      <ForgotComp />
    </WithToast>
  );
}
