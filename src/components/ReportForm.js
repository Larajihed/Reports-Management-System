import React, {  useRef , useState } from "react"
import { Form, Button, Card,  } from "react-bootstrap"
import { database } from "../firebase";
// import { useNavigate } from "react-router-dom"
import { ref, push, set  } from "firebase/database";
import Header from "./Header";
import Menu from "./Menu";
import Popup from './NewReportPopup';
//import 'reactjs-popup/dist/index.css';
import auth from '../firebase'
import { getAuth } from "firebase/auth";



export default function ReportForm() {

  const projectsNumberRef =useRef()
 const ResearchHoursRef =useRef()
const usersNumberRef =useRef()
const peakHoursRef =useRef()
const companyNameRef =useRef()
const dateRef =useRef()
const dataRef =useRef()

  const postListRef = ref(database, 'reports');
  const newPostRef = push(postListRef);
  const [arr, setdata] = useState('')


  
  const auth = getAuth();
  const user = auth.currentUser;



  async function handleSubmit(e) {
    e.preventDefault() 
    
    const projectsNumber= projectsNumberRef.current.value
    const ResearchHours= ResearchHoursRef.current.value
    const usersNumber = usersNumberRef.current.value
    const peakHours = peakHoursRef.current.value
    const companyName = companyNameRef.current.value
    const date = dateRef.current.value
    const csvData= dataRef.current.value
    const variabless = [projectsNumber,ResearchHours,usersNumber, peakHours,companyName,date,csvData]
console.log("variables"  + variabless)
const userId = user.uid
    await set(newPostRef, 
      
      {
   
          
            userId,
            projectsNumber,
            ResearchHours,
            usersNumber,
            peakHours,
            companyName,
            date,
            csvData,
         
          
       
        
        
    },
    );
    


  console.log("Data sent ! :rocket ");

setdata(variabless)
}
 
  


  
  return (
    <>
    <Header></Header>
   <Menu></Menu>
      <Card style={{width:"400px" ,display:"flex", marginLeft:"250px"}}>
        <Card.Body >
          <h2 className='text-center mb-4'>Report Details</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group id="companyName">
              <Form.Label>Company Name*</Form.Label>
              <Form.Control type="text" ref={companyNameRef} required style={{width:"370px"}} />
            </Form.Group>
            <Form.Group id="date">
              <Form.Label>Report Date * </Form.Label>
              <Form.Control type="month" ref={dateRef} required style={{width:"370px"}} />
            </Form.Group>
            <Form.Group id="projectsNumber">
              <Form.Label>Number of Projects*</Form.Label>
              <Form.Control type="number" ref={projectsNumberRef} required style={{width:"370px"}} />
            </Form.Group>
            <Form.Group id="researchHours">
              <Form.Label>Research Hours*</Form.Label>
              <Form.Control type="number" ref={ResearchHoursRef} required  style={{width:"370px"}}/>
            </Form.Group>
            <Form.Group id="usersNumber">
              <Form.Label>Number of Users*</Form.Label>
              <Form.Control type="number" ref={usersNumberRef} required  style={{width:"370px"}}/>
            </Form.Group>
            <Form.Group id="peakHours">
              <Form.Label>Peak man hours*</Form.Label>
              <Form.Control type="number" ref={peakHoursRef} required style={{width:"370px"}}/>
            </Form.Group>
            
            <Form.Group id="dataSource" style={{display: "flex"}} >
              <Form.Label>Data Source</Form.Label>

              <textarea ref={dataRef} required style={{marginTop: "32px" , width:"370px", marginLeft:"-84px"}} ></textarea>
            </Form.Group>
           <button onClick={handleSubmit}> <Popup data={arr}  >

</Popup> </button> 
          </Form>
        </Card.Body>
        
      </Card>
      
     
    </>
  )
}
