/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from "@emotion/react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../helpers/api";
import Main from "../layouts/Main";
import WithToast from "../modals/Toast";
import Input1 from "../components/general/Input1";
import Button1 from "../components/general/Button1";

import IsoControlLogo from "../assets/images/IsoControl.svg";
import Eye from "../assets/images/eye.png";
import { useState } from "react";

function CreatePasswordComp({ setMessage }) {
  const { user_id, token } = useParams();
  const navigate = useNavigate();

  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordConfirmShown, setPasswordConfirmShown] = useState(false);
  const [form, setForm] = useState({
    password: "",
    passwordConfirm: "",
  });

  useEffect(() => {
    const validateCredentials = async () => {
      const { ok } = await api("post", "/users/validate_credentials", {
        user_id,
        token,
      });
      if (!ok) {
        // redirect to error page
        setMessage({ txt: "Invalid credentials", type: "error" });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    };
    validateCredentials();
  }, []);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    const tempForm = { ...form };
    tempForm[name] = value;
    setForm(tempForm);
  };

  const handleSubmit = async (e) => {
    e && e.preventDefault();
    if (form.password.length < 8 || form.passwordConfirm.length < 8)
      return setMessage({
        txt: "Passwords should have at least 8 characters",
        type: "warn",
      });
    if (form.password !== form.passwordConfirm)
      return setMessage({ txt: "Passwords should match", type: "warn" });
    const { ok, body } = await api("post", "/users/choose_password", {
      ...form,
      user_id,
    });
    if (!ok)
      return setMessage({
        txt: "Something went wrong saving your password",
        type: "warn",
      });
    setMessage({ txt: body, type: "success" });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <Main logo="Technip" circles={true}>
      <form css={mainStyle} onSubmit={handleSubmit}>
        <img
          src={IsoControlLogo}
          alt="IsoControlLogo"
          className="IsoControlLogo"
        />

        <h3 className="welcome">Create Password</h3>
        <p className="pleaseEnter">
          Choose the password for your account. It should have at least 8
          characters.
        </p>
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
        <label htmlFor="passwordConfirm">Confirm Password</label>
        <div className="inputWrapper">
          <Input1
            id="passwordConfirm"
            name="passwordConfirm"
            value={form.passwordConfirm}
            type={passwordConfirmShown ? "text" : "password"}
            onChange={handleChange}
          />
          <img
            onClick={() => setPasswordConfirmShown((prevVal) => !prevVal)}
            src={Eye}
            alt="eye"
            className="eyeStyle pointer"
          />
        </div>
        <Button1
          text="Save Password"
          bgColor="linear-gradient(322deg, rgba(0,105,223,1) 0%, rgba(0,112,237,1) 21%, rgba(22,128,247,1) 100%)"
          bgHover="linear-gradient(180deg, #338DF1 -2.23%, #338DF1 -2.22%, #85BFFF 148.66%)"
          color="white"
          border="1px solid #0070ED"
          margin="10px auto 0"
          disabled={form.password.length < 8 || form.passwordConfirm.length < 8}
        />
      </form>
    </Main>
  );
}

// using this components to use modals
export default function CreatePassword() {
  return (
    <WithToast>
      <CreatePasswordComp />
    </WithToast>
  );
}

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
