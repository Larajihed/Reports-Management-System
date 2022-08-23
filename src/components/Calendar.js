import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin from "@fullcalendar/interaction";
import { push, ref, set, onValue, remove } from "firebase/database";
import { database } from "../firebase";
import "../style/Calendar.css";
import NewEventPopup from "../Components/NewEventPopup";
import RemoveEventPopup from "./RemoveEventPopup";

export default function Calendar() {
  const [showPopup, setShowPopup] = useState(false);
  const [showEventPopup, setShowEvent] = useState(false);

  const [event, setEvent] = useState();
  const [data, setdata] = useState("[]");
  function togglePopup() {
    setShowPopup(false);
  }
  let tab = [];

  const DateRef = ref(database, "date/");
  useEffect(() => {
    onValue(DateRef, (snapshot) => {
      const dates = snapshot.val();
      /* Map into array */
      const result = Object.keys(dates);
      console.log("result" + result);
      result.map((i, index) => {
        tab.push(dates[i]);
        dates[i].key = result[index];
      });
      setdata(tab);
    });
    return () => {};
  }, []);

  const DateListRef = ref(database, "date");
  const newDateRef = push(DateListRef);
  async function handleDateClick(e) {
    setEvent(e);
    if (showEventPopup) {
      setShowPopup(true);
    } else {
      setShowPopup(true);
    }
  }

  const handleEventClick = (eventClickInfo) => {
    const Key = eventClickInfo.event._def.extendedProps.key;
    setEvent(eventClickInfo);
    if (showPopup) {
      setShowPopup(false);
      setShowEvent(true);
    } else {
      setShowEvent(true);
    }
  };
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={data}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />

      <div className="main-popup-container">
        {showPopup ? (
          <NewEventPopup
            event={event}
            text="Close Me"
            closePopup={togglePopup}
          />
        ) : null}
        {showEventPopup ? (
          <RemoveEventPopup
            event={event}
            text="Close Me"
            closePopup={togglePopup}
          />
        ) : null}
      </div>
    </>
  );
}
