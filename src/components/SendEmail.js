import React, { useState,useEffect,useRef} from 'react'
import Header from './Header'
import {Link} from 'react-router-dom'
import { database } from '../firebase'
import { storage } from '../firebase'
import Menu from './Menu'
import emailjs from 'emailjs-com'
import {  ref as sRef, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import './style/SendEmail.css'
import { Alert } from 'react-bootstrap'
import { onValue,ref,push,set } from 'firebase/database'
import { upload } from '@testing-library/user-event/dist/upload'
import { BoxLoading } from 'react-loadingg';

export default function SendEmail() {
    const [loading,setLoading]=useState(false);
    const [error, setError] = useState("")
    const [clients, setClients] = useState([])
    const ClientsRef = ref(database, '/clients');
    const emailRef = useRef()
    const [URL,setURL]=useState()
    const subjectRef = useRef()
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

    const emailsRef = ref(database, '/emails');
    const postListRef = ref(database, 'emails');
    const newPostRef = push(postListRef);

    async function uploadFiles  (file,email,subject) {
        //
        console.log("upload Started")
        if (!file) return;

        const sotrageRef = sRef(storage, `files/${file.name}`);
        const uploadTask = uploadBytesResumable(sotrageRef, file);
        
         uploadTask.on(
          "state_changed",
          (snapshot) => {
        console.log(snapshot)
          },
          (error) => console.log("Error" , error),
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
              setURL(downloadURL)
               set(newPostRef,

                {
      
                  receiver:email,
                  subject:subject,
                 link:downloadURL
                },
                
            )
            });
          }
        )
        
     
      };

    async function sendEmail(event){
        event.preventDefault()
      setLoading(true)
        const file = event.target[2].files[0]
        const email = event.target[0].value
       
        const subject = event.target[1].value
        uploadFiles(file,email,subject);

       
        emailjs.sendForm("service_pchrrda","template_b3kb6gi",'#formulaire','pussdbd5XcIzZwUkL')
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
           // alert("Email Sent");
            setError("Email Sent !")
            setLoading(false)

            
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
        <h5 style={{position:"absolute",left:"19%",top:"16%",zIndex:"1",backgroundColor:"#ededed",padding:"8px 16px",borderRadius:"5px"}}>Send Report
        
</h5>

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
            <input className='text' name="subject" type="string" required ref={subjectRef} />
            <br/>
            <input className='filebtn' type="file" name="my_file" required/><br></br>
            <input className='sendbtn' type="submit" value="Send"/>
            </form>
<div>
  { loading && <BoxLoading/> }

</div>
            {error && <Alert variant="success" style={{width:"350px",marginTop:"100px"}}>{error}<br></br>
            <Link to="/reminders">Delete from calendar</Link>

            </Alert>}

                    
        </div>
    </div>
    
  )
}
