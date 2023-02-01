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

import IsoControlLogo from "../assets/images/IsoControl.svg";
import Eye from "../assets/images/eye.png";

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
    try {
      const res = await axios.post(`${URL}/users/login`, {
        email: form.email,
        password: form.password,
      });
      if (!res.data.ok) return setMessage({ type: "warn", txt: res.data.body });
      setTimeout(() => login(res.data.body), 1000);
      setMessage({
        type: "success",
        txt: `Welcome back, ${res.data.body.email}`,
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
          bgColor="#0070ED"
          bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
          color="white"
          border="1px solid #0070ED"
          margin="10px auto 0"
        />
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
        <Link
          className="navisattBtn"
          to={`/${import.meta.env.VITE_PROJECT}/navis`}
        >
          <Button1
            text="NAVISATTSELECT"
            bgColor="#94DCAA"
            bgHover="linear-gradient(180deg, #94DCAA -2.23%, #A4ECBA -2.22%, #FFF 148.66%)"
            border="1px solid #94DCAA"
            fontWeight="bold"
          />
        </Link>
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
  ".navisattBtn": {
    margin: "10px 0 0",
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
