/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";

import { api } from "../helpers/api";
import { AuthContext } from "../context/AuthContext";
import Main from "../layouts/Main";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";
import WithToast from "../modals/Toast";

import IsoControlLogo from "../assets/images/IsoControl.svg";
import Eye from "../assets/images/eye.png";

// request access button => redirect to email input => send email with link => click link => go to create pw

const LoginComp = ({ setMessage }) => {
  const { login } = useContext(AuthContext);

  const [passwordShown, setPasswordShown] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { ok, body } = await api("post", "/users/login", {
      email: form.email,
      password: form.password,
    });
    if (!ok) return setMessage({ type: "warn", txt: body });
    setTimeout(() => login(body), 1000);
    setMessage({
      type: "success",
      txt: `Welcome back, ${body.email}`,
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

        <h3 className="welcome">Welcome</h3>
        <p className="pleaseEnter">
          Please, enter your e-mail account and password.
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
        <label htmlFor="password">Password</label>
        <div className="inputWrapper">
          <Input1
            id="password"
            name="password"
            value={form.password}
            type={passwordShown ? "text" : "password"}
            onChange={handleChange}
          />
          <img
            onClick={() => setPasswordShown((prevVal) => !prevVal)}
            src={Eye}
            alt="eye"
            className="eyeStyle pointer"
          />
        </div>
        <Button1
          text="Log In"
          bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
          bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
          color="white"
          border="1px solid #0070ED"
          margin="10px auto 0"
        />
        <NavLink to="/request_access">
          <Button1
            text="Request Access"
            bgColor="linear-gradient(322deg, rgba(22,128,247,1) 0%, rgba(0,112,237,1) 79%, rgba(0,105,223,1) 100%)"
            bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
            border="1px solid #0070ED"
            color="white"
            margin="10px 0 0"
          />
        </NavLink>
        <Button1
          text="Download quick user guide"
          bgColor="white"
          border="1px solid black"
          margin="10px auto 30px"
          bgHover="linear-gradient(180deg, #AAA -2.23%, #DDD -2.22%, #FFF 148.66%)"
          // prevents submit to be called ↓
          type="button"
          onClick={() =>
            window.open(
              "http://wks-fr.exnet.technip.com/sites/GLOBALBPMS/EMIA/ML-380-01%20Isotracker%20QuickUsersGuide.pdf",
              "_blank"
            )
          }
        />
        <p>Or you can access to NavisattSelect</p>
        <NavLink className="navisattBtn" to="/navis">
          <Button1
            text="NAVISATTSELECT"
            bgColor="#94DCAA"
            bgHover="linear-gradient(180deg, #94DCAA -2.23%, #A4ECBA -2.22%, #FFF 148.66%)"
            border="1px solid #94DCAA"
            fontWeight="bold"
            margin="10px 0 0"
          />
        </NavLink>
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
export default function Login() {
  return (
    <WithToast>
      <LoginComp />
    </WithToast>
  );
}
