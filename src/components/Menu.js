import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";

import React, { useState } from "react";
import "../style/Menu.css";
export default function Menu() {
  const [error, setError] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }
  return (
    <Dropdown.Menu
      show
      style={{
        position: "fixed",
        paddingRight: "10px",
        paddingTop: "16px",
        border: "none",
        background: "#FFFFFF",
        boxShadow: "2px 7px 35px rgba(221, 225, 229, 0.6)",
        zIndex: "0",
        paddingTop: "69px",
        height: "100vh",

        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "grid" }}>
        <Link className="menu-element" to="/">
          Dashboard
        </Link>

        <Link className="menu-element" to="/reminders">
          Manage Reminders
        </Link>
        <Link className="menu-element" to="/send-email">
          Send Report
        </Link>
        <Link className="menu-element" to="/emails-history">
          Emails History
        </Link>
        <Link className="menu-element" to="/clients">
          Manage Clients
        </Link>
        <Link className="menu-element" to="/update-profile">
          Account Settings
        </Link>
      </div>
      <div>
        <button className="logout-btn " onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </Dropdown.Menu>
  );
}
