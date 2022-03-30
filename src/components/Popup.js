import React, {useState} from 'react'
import { Modal, Button } from 'react-bootstrap';
import ReactToPdf  from 'react-to-pdf'
import { CsvToHtmlTable } from 'react-csv-to-table';
import {  ButtonGroup } from "react-bootstrap"
import './style/PDF.css'


export default function Popup(props) {
  const [show, setShow] = useState(false);
  const ref = React.createRef();
  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const arr = props.data
  const listItems = Object.keys(arr)
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
    {values.map((v, idx) => (
        <Button className="me-2 mb-2" onClick={() => handleShow(v)}>
          Full screen
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className='scaled'>
    <ReactToPdf targetRef={ref} filename="div-blue.pdf"  x={.5} y={.5}>
        {({toPdf}) => (
            <ButtonGroup>
                <Button variant='primary' onClick={toPdf}>Generate pdf  </Button>
                <Button variant='primary' onClick={toPdf}>Save To the Cloud</Button>
                
                
            </ButtonGroup>
            
        )}
        
    </ReactToPdf>
    <div className='main' style={{width: 800, height: 1390  }} ref={ref}>
     
        <div className="info-container">

            <div className="infos">
                <p className="title">{props.data.ResearchHours}</p>
         <p className="date">{props.data.ResearchHours}</p> 

            </div>

        </div>
        <div className="general-container">
        <p className="section-title"> overview</p>
    </div>
    <div className="numbers-container">
        <div className="title-container">
            <p className="bold">
                By the numbers
            </p>
        </div>
        <div className="notes-container">
            <li>
                In the past month, your company got <span class="bold"> {props.data.ResearchHours} business days back*</span> and saved <span className="bold">{props.data.ResearchHours} dollars** </span> by using Wonder for
                your research needs.

            </li>
            <li>
                Your company's peak* throughput in a 24 hour period was <span className="bold">  {props.data.ResearchHours}  hours ***</span> of research.
            </li>

        </div>
    </div>
    
    <div className="metrics-container">
        <div className="metric-row row2">
            <div className="metrics-element ">
                <div className="metric-title">
                    <p>REASEARCH HOURS</p>
                    <p className='metric-value'>{props.data.ResearchHours}</p>
                </div>
             
            </div>
            <div className="metrics-element ">
                <div className="metric-title">
                    <p>NUMBER OF PROJECTS</p>
                    <p className='metric-value'>{props.data.ResearchHours}</p>
                </div>
            
            </div>
            <div className="metrics-element ">
                <div className="metric-title">
                    <p>NUMBER OF USERS</p>
                    <p className='metric-value'>{props.data.ResearchHours}</p>

                </div>
               
            </div>
            <div className="metrics-element">
                <div className="metric-title">
                    <p>TOTAL SPENT</p>
                    <p className='metric-value'>{props.data.ResearchHours}</p>
                </div>
             
            </div>

        </div>
        <div className="definitions-container">
        <p>
            * Business Days Back = hours of research done across a given time period, divided by 9 hours in a business
            day<br/>** Dollars Saved = Dollar amount it would take a client to perform requisite research (assuming a flat rate
            of $125 per hour) over a given time period minus dollar amount it would take for Wonder to perform the same
            amount of requisite research
             <br/>

            *** Peak Man Hours = The most hours researched in a given day 
        </p>
        <CsvToHtmlTable
  data={props.data.ResearchHours}
  csvDelimiter=","
/>

    </div>
    </div>
    {props.data.ResearchHours} </div>
</div>
        </Modal.Body>
      </Modal>

  </>
  )
}
