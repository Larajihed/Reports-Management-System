import {React, useState} from 'react'
import Calendar from './Calendar'
import Header from './Header'
import Menu from './Menu'
import emailjs from 'emailjs-com'
import { useAuth } from "../contexts/AuthContext"

import { auth } from '../firebase'
import { connectStorageEmulator } from 'firebase/storage'
export default function Reminders() {
  const [show, setShow] = useState(false);
  const { currentUser, logout } = useAuth()
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const userEmail = currentUser.email

  var templateParams = {
    name: 'James',
    notes: 'Check this out!',
    receiver:  `${userEmail}`
};




  return (
    <>
    <Header/>
    <Menu/>
    <h5 style={{position:"absolute",left:"19%",top:"16%",zIndex:"1",backgroundColor:"#ededed",padding:"8px 16px",borderRadius:"5px"}}>Manage Reminders</h5>

   <div style={{position:"absolute", top:"25%",left:"30%",width:"650px"}}>
   <Calendar/>

   </div>
    </>
  )
}
