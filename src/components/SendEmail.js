import React, {useRef} from 'react'
import Header from './Header'
import Menu from './Menu'
import emailjs from 'emailjs-com'
import { useAuth } from "../contexts/AuthContext"

export default function SendEmail() {


    function renderData(){

        return (<p>rendered</p>)
    }

  

    function sendEmail(event){
        event.preventDefault()
        emailjs.sendForm("service_pchrrda","template_b3kb6gi",'#formulaire','pussdbd5XcIzZwUkL')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            renderData()
            alert("Email Sent");
            
         }, function(error) {
            console.log('FAILED...', error)
            alert("Email Failed");
         });
      
      }
  return (
    <div>
        <Header/>
        <Menu/>
        <h5 style={{position:"absolute",left:"19%",top:"16%",zIndex:"1",backgroundColor:"#ededed",padding:"8px 16px",borderRadius:"5px"}}>Send Report</h5>

        <div className='main' style={{position:"absolute",top:"20%",left:"40%"}}>
            <form id='formulaire' enctype="multipart/form-data"  method="post" onSubmit={sendEmail}>
                <label for="receiver">Email</label><br/>
            <input name="receiver" type="email" required/>
            <br/>
            <label for="subject">Subject</label><br/>
            <input name="subject" type="string" required/>
            <br/>
            <input type="file" name="my_file" required/>
       <input type="submit" value="Send"/>

            </form>
            {renderData}
        </div>

    </div>
  )
}
