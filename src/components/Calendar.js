import React, { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import { push, ref, set, onValue,remove } from 'firebase/database'
import { database } from '../firebase'
import './style/Calendar.css'
export default function Calendar() {

  const [data, setdata] = useState('[]')
  const [show, setShow] = useState(false)

  let tab = []
  let tab2 = []


  const DateRef = ref(database, 'date/')
  useEffect(() => {
    onValue(DateRef, (snapshot) => {
      const dates = snapshot.val()
      /* Map into array */
      const  amine = Object.keys(dates)
     amine.map((i,index) => {
       // console.log( amine[index] )

        tab.push(dates[i])
        dates[i].key = amine[index];
        console.log(dates[i])
      //  console.log(dates[i])
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
    const reportDate = e.dateStr
    var title = prompt('Enter Company Title', "")
    if (title != "") {
      await set(newDateRef,
        {
          title: title,
          start: e.dateStr,
          allDay: true,
          status: false,
        
        },
      );
          window.location.reload(false);

    }
    else if (title === "") {
      alert('Entry Required');
      return false;
    }
    else {
      alert('Entry Cancelled By User');
      return false;
    }
  }






  const handleEventClick = (eventClickInfo ) => {
    // setShow(true)
    const Key = eventClickInfo.event._def.extendedProps.key 
    console.log(Key)
    remove(ref(database, "date/" + Key))
    window.location.reload(false);
  }
  return (

    <>

      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        events={data}
        eventClick={handleEventClick}
        dateClick={handleDateClick}
      />

      



    </>
  )
}
