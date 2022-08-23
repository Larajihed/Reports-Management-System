import React from "react";
import { AuthProvider } from "./contexts/AuthContext";
import Signup from "./Pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Login from "./Pages/Login";
import PrivateRoute from "./Components/PrivateRoute";
import ForgotPassword from "./Pages/ForgotPassword";
import UpdateProfile from "./Pages/UpdateProfile";
import ReportForm from "./Pages/ReportForm";
import Reminders from "./Pages/Reminders";
import SendEmail from "./Pages/SendEmail";
import Clients from "./Pages/Clients";
import ClientsList from "./Components/ClientsList";
import EmailsHistory from "./Pages/EmailsHistory";
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <PrivateRoute>
                {" "}
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/send-email"
            element={
              <PrivateRoute>
                {" "}
                <SendEmail />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/clients-list"
            element={
              <PrivateRoute>
                {" "}
                <ClientsList />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/clients"
            element={
              <PrivateRoute>
                {" "}
                <Clients />{" "}
              </PrivateRoute>
            }
          ></Route>
          <Route
            path="/update-profile"
            element={
              <PrivateRoute>
                {" "}
                <UpdateProfile />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/reminders"
            element={
              <PrivateRoute>
                {" "}
                <Reminders />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/report-form"
            element={
              <PrivateRoute>
                {" "}
                <ReportForm />{" "}
              </PrivateRoute>
            }
          />
          <Route
            path="/emails-history"
            element={
              <PrivateRoute>
                {" "}
                <EmailsHistory />{" "}
              </PrivateRoute>
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
