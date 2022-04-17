import React,{ useState, useEffect} from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import interactionPlugin from '@fullcalendar/interaction'
import { push, ref,set, onValue } from 'firebase/database'
import {  database } from '../firebase'
import './style/Calendar.css'
export default function Calendar() {

  const [data,setdata]=useState('[]')
  const [show,setShow] = useState(false)

  let tab=[]

  
  

  useEffect(()=>{
    const DateRef= ref(database,'date/')
    let isMounted = true
    onValue(DateRef,(snapshot)=>{
      const dates=snapshot.val()
                 /* Map into array */
      Object.keys(dates).map((date)=> {
      tab.push(dates[date])
     }) 
     if (isMounted) setdata(tab)
      // setdata(data)
      /* Map into array */
    })  
    return ()=>{}
  },[])
  
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const DateListRef = ref(database, 'date');
  const newDateRef = push(DateListRef);

  
  async function handleDateClick  (e){
      const title = prompt('Enter Title', "")
        await set(newDateRef,       
        {      
            title:title ? title : e.dateStr,
            start: e.dateStr,
            allDay:true,
            status:false          
        },
        );
    }
 


const handleEventClick =(e )=>{
  setShow(true)
  console.log(e.start)
}
const handleClose = () =>{
  setShow(false)
}
  return (
 
  <>

  <FullCalendar
    plugins={[ dayGridPlugin, interactionPlugin]}
    events={data}
    eventClick={handleEventClick}
    dateClick={handleDateClick}
  />

  {show ? 
  <div className='modal-container' >
  <h1> Report Details </h1> <button onClick={handleClose}>Close</button>
  <h3>Date : 22-04-2022</h3>
  <h3>Status: </h3>
  <select >
    <option value="sent">Sent</option>
    <option value="notSent">Not Sent </option>
  </select>
  <button >Delete</button> 
  <button >Done</button> 

  
  </div>
  : 
    <h1></h1>
}



  </>
  )
}
