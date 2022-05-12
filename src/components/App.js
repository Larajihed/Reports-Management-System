import React from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import ReportForm from "./ReportForm";
import Header from "./Header";
import Calendar from "./Calendar";
import Reminders from "./Reminders";
import SendEmail from "./SendEmail";
import Clients from "./Clients";
import ClientsList from "./ClientsList";
function App() {
  return (
    <AuthProvider>
      <div
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Router>
            <AuthProvider>
              <Routes>
                <Route
                exact
                  path="/"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/send-email"
                  element={
                    <PrivateRoute>
                     <SendEmail/>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/clients-list"
                  element={
                    <PrivateRoute>
                     <ClientsList/>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/clients"
                  element={
                    <PrivateRoute>
                     <Clients/>
                    </PrivateRoute>
                  }
                ></Route>
                <Route
                  path="/update-profile"
                  element={
                    <PrivateRoute>
                      <UpdateProfile />
                    </PrivateRoute>
                  }
                ></Route>
                 <Route
                  path="/reminders"
                  element={
                    <PrivateRoute>
                      <Reminders/>
                    </PrivateRoute>
                  }
                ></Route>
                
       
                <Route
                  path="/report-form"
                  element={
                    <PrivateRoute>
                      <ReportForm />
                    </PrivateRoute>
                  }
                ></Route>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
              </Routes>
            </AuthProvider>
          </Router>
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
