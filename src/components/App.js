import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import Signup from "./Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./ForgotPassword";
import UpdateProfile from "./UpdateProfile";
import ReportForm from "./ReportForm";

import Reminders from "./Reminders";
import SendEmail from "./SendEmail";
import Clients from "./Clients";
import ClientsList from "./ClientsList";
import EmailsHistory from "./EmailsHistory";
function App() {
  return (

    <BrowserRouter>
          <AuthProvider>

      <Routes>
        <Route exact path="/" element={<PrivateRoute> <Dashboard /></PrivateRoute>} />
        <Route path="/send-email" element={<PrivateRoute> <SendEmail /> </PrivateRoute>} />
        <Route path="/clients-list" element={<PrivateRoute> <ClientsList /> </PrivateRoute>} />
        <Route path="/clients" element={<PrivateRoute> <Clients /> </PrivateRoute>}></Route>
        <Route path="/update-profile" element={<PrivateRoute> <UpdateProfile /> </PrivateRoute>} />
        <Route path="/reminders" element={<PrivateRoute> <Reminders /> </PrivateRoute>} />
        <Route path="/report-form" element={<PrivateRoute> <ReportForm /> </PrivateRoute>} />
        <Route path="/emails-history" element={<PrivateRoute> <EmailsHistory/> </PrivateRoute>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
      </AuthProvider>

    </BrowserRouter>





  );
}

export default App;
