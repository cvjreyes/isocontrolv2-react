import axios from "axios";
import { useState, createContext, useEffect } from "react";
import Cookies from "js-cookie";
import Loading from "../components/general/Loading";
import { URL } from "../helpers/config";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkAuthCookie = async () => {
      try {
        const access_token = Cookies.get("access_token"); // get token
        if (!access_token) return logout();
        axios.defaults.headers.common["Authorization"] = access_token; // set token for all api calls
        const res = await axios.get(`${URL}/users/get_user_info`);
        if (res.data.ok)
          return login({ ...res.data.body, token: access_token });
        setIsLoggedIn(false);
      } catch (err) {
        console.error(err);
      }
    };
    checkAuthCookie();
  }, []);

  const login = (receivedUser) => {
    const { token } = receivedUser;
    delete receivedUser.token;
    setIsLoggedIn(true);
    setUser(receivedUser);
    Cookies.set("access_token", token);
    axios.defaults.headers.common["Authorization"] = token; // set token for all api calls
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    Cookies.remove("access_token");
  };

  if (isLoggedIn === null) return <Loading />;
  return (
    <AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
