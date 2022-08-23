import { React, useState } from "react";
import Calendar from "../Components/Calendar";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import { useAuth } from "../contexts/AuthContext";

export default function Reminders() {
  const [show, setShow] = useState(false);
  const { currentUser, logout } = useAuth();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userEmail = currentUser.email;

  var templateParams = {
    name: "James",
    notes: "Check this out!",
    receiver: `${userEmail}`,
  };

  return (
    <>
      <Header />
      <Menu />

      <div
        style={{
          position: "absolute",
          top: "25%",
          left: "30%",
          width: "650px",
        }}
      >
        <Calendar />
      </div>
    </>
  );
}
