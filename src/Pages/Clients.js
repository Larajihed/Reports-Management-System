import React from "react";
import ClientsList from "../Components/ClientsList";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import "../style/Clients.css";
export default function Clients() {
  return (
    <div>
      <Header />
      <Menu />

      <div
        className="main"
        style={{ position: "absolute", top: "20%", left: "18%" }}
      >
        <div></div>
      </div>
      <div className="right-container">
        <ClientsList />
      </div>
    </div>
  );
}
