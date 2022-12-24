// PACKAGES
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// CONTEXT
import { AuthProvider } from "./context/AuthContext";
// ROUTER
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";
// COMPONENTS / VIEWS
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useEffect } from "react";
// import Signup from "./views/Signup";
// import Profile from "./views/Profile";
// import Change from "./views/Change";
// import Forgot from "./views/Forgot";

export default function App() {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAMEPROJ} v2`;
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route
            exact
            path="/home"
            element={<PrivateRoute component={Home} />}
          />
          <Route
            exact
            path="/login"
            element={<PublicRoute component={Login} />}
          />
          {/* 
          <Route
            exact
            path="/signup"
            element={<PublicRoute restricted={false} component={Signup} />}
          />
          <Route
            exact
            path="/profile"
            element={<PrivateRoute restricted={true} component={Profile} />}
          />
          <Route
            exact
            path="/change_password"
            element={<PrivateRoute restricted={true} component={Change} />}
          />
          <Route
            exact
            path="/forgot_pw"
            element={<PublicRoute restricted={false} component={Forgot} />}
          /> */}
          <Route path="*" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
