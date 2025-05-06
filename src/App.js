import React, { useContext, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import "./assets/css/app.css";
import "./assets/css/app.min.css";
import "./assets/css/bootstrap.css";
import "./assets/css/icons.css";
import "./assets/css/style.css";

import LoginPage from "./pages/LoginPage/LoginPage";
import ForgetPassword from "./components/ForgetPassword";
import VendorRegister from "./components/VendorRegister";

import { UserContext } from "./Context/Context";
import AdminPanal from "./panal/AdminPanal";
import VendorPanal from "./panal/VendorPanal";

function App() {
  const [isRegister, setIsRegister] = useState(false);
  const { user, loading } = useContext(UserContext);

  if (loading) {
    return <div>Loading...</div>; // Optional: Replace with spinner
  }

  return (
    <Router>
      <Routes>
        {/* Redirect to respective panel based on user type */}
        <Route
          path="/"
          element={
            !user ? (
              <Navigate to="/login" />
            ) : user.type === "admin" ? (
              <Navigate to="/admin" />
            ) : user.type === "vendor" ? (
              <Navigate to="/vendor" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Login & Register Pages */}
        <Route
          path="/login"
          element={
            <LoginPage isRegister={isRegister} setIsRegister={setIsRegister} />
          }
        />
        <Route
          path="/register"
          element={
            <LoginPage isRegister={isRegister} setIsRegister={setIsRegister} />
          }
        />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route
          path="/vendor-registration"
          element={<VendorRegister setIsRegister={setIsRegister} />}
        />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            user && user.type === "admin" ? (
              <AdminPanal />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/vendor"
          element={
            user && user.type === "vendor" ? (
              <VendorPanal />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
