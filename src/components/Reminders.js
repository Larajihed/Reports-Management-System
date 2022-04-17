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


function sendEmail(){

  emailjs.send('service_pchrrda', 'template_b3kb6gi',templateParams ,'pussdbd5XcIzZwUkL')
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
 }, function(error) {
    console.log('FAILED...', error);
 });

}


  return (
    <>
    <button onClick={sendEmail}>Send Email</button>
    <Header/>
    <Menu/>
   <div style={{position:"absolute", top:"20%",left:"30%",width:"650px"}}>
   <Calendar/>

   </div>
    </>
  )
}
