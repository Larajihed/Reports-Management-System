import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import { push, ref, set, onValue,remove } from 'firebase/database'
import { database } from '../firebase'
import './style/Calendar.css'
import NewEventPopup from './NewEventPopup'
import RemoveEventPopup from './RemoveEventPopup'
export default function Calendar() {
  const [showPopup, setShowPopup] = useState(false)
  const [showEventPopup, setShowEvent] = useState(false)

  const [event,setEvent]=useState()
  const [data, setdata] = useState('[]')
  function togglePopup() {
    setShowPopup(false)

  }
  let tab = []


  const DateRef = ref(database, 'date/')
  useEffect(() => {
    onValue(DateRef, (snapshot) => {
      const dates = snapshot.val()
      /* Map into array */
      const  amine = Object.keys(dates)
      console.log("amine" + amine)
     amine.map((i,index) => {

        tab.push(dates[i])
        dates[i].key = amine[index];

      })
              setdata(tab)
    })
    return () => { }

  }, [])


  const DateListRef = ref(database, 'date');
  const newDateRef = push(DateListRef);
  /*
    var today = new Date(),
    date = today.getFullYear() + '' + (today.getMonth() + 1) + '' + today.getDate();
  */

  async function handleDateClick(e) {
    setEvent(e)
    if (showEventPopup) {

      //setShowEvent(false)

      setShowPopup(true)

    } else{

      setShowPopup(true)

    }
    
   // setShowEvent(false)
    //var title = prompt('Enter Company Title', "")
   /* if (title != "") {
      await set(newDateRef,
        {
          title: title,
          start: e.dateStr,
          allDay: true,
          status: false,
        
        },
      );

    }
    else if (title === "") {
      alert('Entry Required');
      return false;
    }
    else {
      console.log('Entry Cancelled By User');
      return false;
    }
    */
  }






  const handleEventClick = (eventClickInfo ) => {
    // setShow(true)
    const Key = eventClickInfo.event._def.extendedProps.key 
    setEvent(eventClickInfo)
    if (showPopup) {
      setShowPopup(false)
      setShowEvent(true)
    } else{
      setShowEvent(true)
    }

    //remove(ref(database, "date/" + Key))
    //window.location.reload(false);
  }
  return (

    <>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={data}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />

      


<div className='main-popup-container'>
        {showPopup ?
          <NewEventPopup
          
          event={event}
            text='Close Me'
            closePopup={togglePopup}
          />
          : null
        }
         {showEventPopup ?
          <RemoveEventPopup
          event={event}

            text='Close Me'
            closePopup={togglePopup}
          />
          : null
        }
      </div>
      
    </>
  )
}
