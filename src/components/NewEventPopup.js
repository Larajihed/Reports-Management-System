import React, { useState, useEffect } from "react";
import { ref, push, set, onValue } from "firebase/database";
import { database } from "../firebase";

import "../style/NewEventPopup.css";

export default function NewEventPopup(props) {
  console.log(props.event.el);
  const DateListRef = ref(database, "date");
  const newDateRef = push(DateListRef);
  const [clients, setClients] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");

  const ClientsRef = ref(database, "/clients");
  const eventDetailsObject = props.event.dateStr;
  console.log(eventDetailsObject);

  async function addEvent(e) {
    e.preventDefault();
    await set(newDateRef, {
      title: selectedValue,
      start: eventDetailsObject,
      allDay: true,
    });
    window.location.reload(false);
  }

  function handleChange(e) {
    setSelectedValue(e.target.value);
  }

  useEffect(() => {
    async function fetchData() {
      await onValue(ClientsRef, (snapshot) => {
        const data = snapshot.val();
        const clientsArray = Object.entries(data);
        setClients(clientsArray);
      });
    }
    fetchData();
  }, []);

  return (
    <div className="container">
      <form
        id="formulaire"
        enctype="multipart/form-data"
        method="post"
        onSubmit={addEvent}
      >
        Report Date: <strong>{eventDetailsObject}</strong>
        <br />
        <label>Client</label>
        <select
          value={selectedValue}
          name="receiver"
          onChange={handleChange}
          required
          style={{ width: "230px" }}
        >
          <option value="">Choose Client </option>
          {clients.map((anObjectMapped) => {
            return (
              <>
                <option value={anObjectMapped[1].clientName}>
                  {anObjectMapped[1].clientName}
                </option>
              </>
            );
          })}
        </select>
        <input
          style={{
            width: "230px",
            backgroundColor: "green",
            color: "white",
            borderRadius: "6px",
            border: "none",
            height: "40px",
            marginTop: "16px",
          }}
          type="Submit"
          value="Add Reminder"
        ></input>
      </form>
    </div>
  );
}
