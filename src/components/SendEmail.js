import React, { useState,useEffect} from 'react'
import Header from './Header'
import { database } from '../firebase'
import Menu from './Menu'
import emailjs from 'emailjs-com'
import { useAuth } from "../contexts/AuthContext"
import './style/SendEmail.css'
import { Alert } from 'react-bootstrap'
import { onValue,ref } from 'firebase/database'
export default function SendEmail() {
    const [error, setError] = useState("")
    const [clients, setClients] = useState([])
    const ClientsRef = ref(database, '/clients');
    const [selectedValue,setSelectedValue]=useState("")
    useEffect( () => {
        async function fetchData(){
            await onValue(ClientsRef, (snapshot) => {
                const data = snapshot.val();
                const clientsArray = Object.entries(data)
                setClients(clientsArray)
            })
        }
          fetchData();
    }, [])



  

    function sendEmail(event){
        event.preventDefault()
        emailjs.sendForm("service_pchrrda","template_b3kb6gi",'#formulaire','pussdbd5XcIzZwUkL')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
           // alert("Email Sent");
            setError("Email Sent !")
            
         }, function(error) {
            console.log('FAILED...', error)
            setError("Choose an Email")
            
            
         });
      
      }
      function handleChange(e) {
        console.log("Fruit Selected!!");
        setSelectedValue(e.target.value);
        
      }
  return (
    <div>
        <Header/>
        <Menu/>
        <h5 style={{position:"absolute",left:"19%",top:"16%",zIndex:"1",backgroundColor:"#ededed",padding:"8px 16px",borderRadius:"5px"}}>Send Report</h5>

        <div className='main' style={{position:"absolute",top:"20%",left:"19%",border:"1px solid rgb(209, 209, 209)",marginTop:"20px", borderRadius:"8px"}}>

            <form id='formulaire' enctype="multipart/form-data"  method="post" onSubmit={sendEmail}>
                <label for="receiver">Client Email</label><br/>
                <select value={selectedValue} name="receiver"  onChange={handleChange} required>
                <option value="" >Client Email</option>
                {clients.map((anObjectMapped, index) => {
                                         
                    
                        return (
                            <>
                                <option value={anObjectMapped[1].clientEmail}>
                                {anObjectMapped[1].clientName } -  {anObjectMapped[1].clientEmail}
                                </option>
                            </>
                        );
                    })}
                 
                   
                </select><br/>
            
            <br/>
            <label for="subject">Subject</label><br/>
            <input className='text' name="subject" type="string" required/>
            <br/>
            <input className='filebtn' type="file" name="my_file" required/><br></br>
            <input className='sendbtn' type="submit" value="Send"/>
            </form>
            {error && <Alert variant="success" style={{width:"350px",marginTop:"100px"}}>{error}</Alert>}

       
        </div>

    </div>
  )
}
