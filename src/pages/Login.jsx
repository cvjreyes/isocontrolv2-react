/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useState } from "react";

import Main from "../components/layouts/Main";

import IsoTrackerLogo from "../assets/images/IsoTracker.svg";
import FullTrackerLogo from "../assets/images/3DTracker.svg";
import Eye from "../assets/images/eye.png";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";
import { Link } from "react-router-dom";

export default function Login() {
  const [passwordShown, setPasswordShown] = useState(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <Main>
      <form css={mainStyle} onSubmit={handleSubmit}>
        <img
          src={import.meta.env.VITE_PROGRESS ? FullTrackerLogo : IsoTrackerLogo}
          alt="isoTrackerLogo"
          className="isoTrackerLogo"
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
          ></img>
        </div>
        <Button1
          className="pointer"
          text="Log In"
          bgColor="#0070ED"
          color="white"
          border="1px solid #0070ED"
          margin="10px auto 0"
        />
        <Button1
          className="pointer"
          text="Download quick user guide"
          bgColor="white"
          border="1px solid black"
          margin="10px auto 30px"
          onClick={(e) =>
            window.open(
              "http://wks-fr.exnet.technip.com/sites/GLOBALBPMS/EMIA/ML-380-01%20Isotracker%20QuickUsersGuide.pdf",
              "_blank"
            )
          }
        />
        <p>Or you can access to NavisattSelect</p>
        <Link to={`/${import.meta.env.VITE_PROJECT}/navis`}>
          <Button1
            className="pointer"
            text="NAVISATTSELECT"
            margin="10px 0 0"
            bgColor="#94DCAA"
            border="1px solid #94DCAA"
            fontWeight="bold"
          />
        </Link>
        {/*{error && (
            <p
              className="error__message"
              style={{ color: "red", position: "absolute" }}
            >
              Email or password incorrect. Try again.
            </p>
          )}*/}
      </form>
    </Main>
  );
}

const mainStyle = {
  // backgroundColor: "red",
  display: "flex",
  flexDirection: "column",
  alignItems: "left",
  padding: "50px",
  width: "500px",
  marginLeft: "10%",
  ".isoTrackerLogo": {
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
    },
  },
};
