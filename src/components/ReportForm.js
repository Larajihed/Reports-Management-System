import React, {  useRef , useState } from "react"
import { Form, Button, Card,  } from "react-bootstrap"
import { database } from "../firebase";
// import { useNavigate } from "react-router-dom"
import { ref, push, set  } from "firebase/database";
import PDF from "./PDF";





export default function ReportForm() {

  const projectsNumberRef =useRef()
 const ResearchHoursRef =useRef()
const usersNumberRef =useRef()
const peakHoursRef =useRef()
const companyNameRef =useRef()
const logoRef =useRef()
const dataRef =useRef()
  //const [loading, setLoading] = useState(false)
//   const navigate = useNavigate();
  const postListRef = ref(database, 'reports');
  const newPostRef = push(postListRef);
  const [showPdf, setPdf] = useState(false)
  const [arr, setdata] = useState('[]')

  

  




  async function handleSubmit(e) {
    e.preventDefault() 
    
    const projectsNumber= projectsNumberRef.current.value
    const ResearchHours= ResearchHoursRef.current.value
    const usersNumber = usersNumberRef.current.value
    const peakHours = peakHoursRef.current.value
    const companyName = companyNameRef.current.value
    const logo = logoRef.current.value
    const csvData= dataRef.current.value
    let variabless = [projectsNumber,ResearchHours,usersNumber,peakHours,companyName,logo,csvData ]
    
    console.log(variabless)


    await set(newPostRef, {
      
        projectsNumber,
        ResearchHours,
        usersNumber,
        peakHours,
        companyName,
        logo,
        csvData,
    },
    );
    
    
  //const elementsArray = [ ...e.target.elements];
 // const formData=elementsArray.reduce((accumulator, currentValue)=> {
   // if (currentValue.id){
   //   accumulator[currentValue.id] = currentValue.value;
  //  }
  //  return accumulator
 // },{})
//history.push('/PDF',[]);

  console.log("Data sent ! :rocket ");
  setPdf(true)
setdata(variabless)
}
 
  
console.log(arr[6])

  
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Report infos</h2>
          <Form onSubmit={handleSubmit}>
          <Form.Group id="companyName">
              <Form.Label>Company Name*</Form.Label>
              <Form.Control type="text" ref={companyNameRef} required />
            </Form.Group>
            <Form.Group id="projectsNumber">
              <Form.Label>Number of Projects*</Form.Label>
              <Form.Control type="number" ref={projectsNumberRef} required />
            </Form.Group>
            <Form.Group id="researchHours">
              <Form.Label>Research Hours*</Form.Label>
              <Form.Control type="number" ref={ResearchHoursRef} required />
            </Form.Group>
            <Form.Group id="usersNumber">
              <Form.Label>Number of Users*</Form.Label>
              <Form.Control type="number" ref={usersNumberRef} required />
            </Form.Group>
            <Form.Group id="peakHours">
              <Form.Label>Peak man hours*</Form.Label>
              <Form.Control type="number" ref={peakHoursRef} required />
            </Form.Group>
            <Form.Group id="peakHours">
              <Form.Label>Logo * </Form.Label>
              <Form.Control type="link" ref={logoRef} required  />
            </Form.Group>
            <Form.Group id="dataSource" >
              <Form.Label>Data Source</Form.Label>

              <textarea ref={dataRef} required  ></textarea>
            </Form.Group>
         

            
            
            
            <Button  className="w-100 mt-4" type="submit" >
                Generate Report
            </Button>
         

          </Form>
        </Card.Body>
        
      </Card>
      <div>
            { showPdf ?  <PDF data={arr}/> : null }

            </div>
    </>
  )
}
