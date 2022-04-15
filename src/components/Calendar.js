import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import './style/Calendar.css'


export default function Calendar() {
    const handleDateClick = (dateClickInfo)=>{
        console.log(dateClickInfo.date)
    }
   
  return (
 
  <>


  <FullCalendar
    plugins={[ dayGridPlugin, interactionPlugin ]}

    dateClick={handleDateClick}
  />
  </>
  )
}
