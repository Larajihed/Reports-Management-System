import React from "react";
import { ref, remove } from "firebase/database";
import { database } from "../firebase";

import "../style/NewEventPopup.css";

export default function RemoveEventPopup(props) {
  const key = props.event.event._def.extendedProps.key;
  const title = props.event.event._def.title;
  const date = props.event.event._instance.range.start;
  const myJSON = JSON.stringify(date);
  const stringifiedDate = myJSON.replace("T00:00:00.000Z", "");

  async function deleteEvent(e) {
    e.preventDefault();
    console.log("deleted");
    remove(ref(database, "date/" + key));
    window.location.reload(false);
  }

  function handleCancel() {
    window.location.reload(false);
  }

  return (
    <div className="container">
      <form
        id="formulaire"
        enctype="multipart/form-data"
        method="post"
        onSubmit={deleteEvent}
      >
        Report Date: <strong>{stringifiedDate}</strong>
        <br />
        Client: <strong>{title}</strong>
        <input
          style={{
            width: "230px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "6px",
            border: "none",
            height: "40px",
            marginTop: "16px",
          }}
          type="Submit"
          value="Delete Reminder"
        ></input>
      </form>
      <button
        onClick={handleCancel}
        style={{
          background: "none",
          border: "none",
          fontWeight: "600",
          marginTop: "8px",
          textDecoration: "underline",
        }}
      >
        Cancel
      </button>
    </div>
  );
}
