import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import PublicRoute from "./router/PublicRoute";
import PrivateRoute from "./router/PrivateRoute";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import FEED from "./pages/FEED";
import IFD from "./pages/IFD";
import IFC from "./pages/IFC";
import Change from "./pages/Change";
import Navis from "./pages/Navis";
import AddUser from "./pages/AddUser";
import Progress from "./pages/Progress";
import Request from "./pages/Request";
// import Forgot from "./pages/Forgot";

export default function App() {
  useEffect(() => {
    document.title = `${import.meta.env.VITE_APP_NAMEPROJ} v2`;
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<PrivateRoute component={Home} />} />
          <Route
            exact
            path="/login"
            element={<PublicRoute component={Login} />}
          />
          <Route path="/feed/*" element={<PrivateRoute component={FEED} />} />
          <Route
            exact
            path="/ifd/*"
            element={<PrivateRoute component={IFD} />}
          />
          <Route exact path="/ifc" element={<PrivateRoute component={IFC} />} />
          <Route
            exact
            path="/progress"
            element={<PrivateRoute component={Progress} />}
          />
          <Route
            exact
            path="/change_password"
            element={<PrivateRoute restricted={true} component={Change} />}
          />
          <Route
            exact
            path="/navis"
            element={<PublicRoute component={Navis} />}
          />

          <Route
            exact
            path="/add_user"
            element={<PrivateRoute restricted={false} component={AddUser} />}
          />
          <Route
            exact
            path="/request_access"
            element={<PublicRoute component={Request} />}
          />
          {/*  <Route
            exact
            path="/forgot_pw"
            element={<PublicRoute restricted={false} component={Forgot} />}
          /> */}
          <Route path="/*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
