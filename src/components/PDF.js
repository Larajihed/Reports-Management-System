import React from 'react'

import ReactToPdf  from 'react-to-pdf'
import { Button, ButtonGroup } from "react-bootstrap"
import { useNavigate  } from "react-router-dom"
import './style/PDF.css'
import { CsvToHtmlTable } from 'react-csv-to-table';


export default function PDF(props ) {
    const ref = React.createRef();
    const navigate = useNavigate();
    function handleHome(){
        navigate('/');

    }
  
  return (
    <div>
    <ReactToPdf targetRef={ref} filename="div-blue.pdf"  x={.5} y={.5} scale={0.8}>
        {({toPdf}) => (
            <ButtonGroup>
                <Button variant='primary' onClick={toPdf}>Generate pdf  </Button>
                <Button variant='primary' onClick={toPdf}>Save To the Cloud</Button>
                <Button variant='primary' onClick={handleHome}>
                Go Home
                
                </Button>
                
            </ButtonGroup>
            
        )}
        
    </ReactToPdf>
    <div className='main' style={{width: 990, height: 1390,  }} ref={ref}>
     
        <div className="info-container">

            <div className="infos">
                <p className="title">{props.data[4]}</p>
         {  /* <p className="date">{props.data[4]}</p> */}

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
                In the past month, your company got <span class="bold"> {props.data[1]} business days back*</span> and saved <span className="bold">{props.data[1]*125-props.data[1]} dollars** </span> by using Wonder for
                your research needs.

            </li>
            <li>
                Your company's peak* throughput in a 24 hour period was <span className="bold">  {props.data[3]}  hours ***</span> of research.
            </li>

        </div>
    </div>
    
    <div className="metrics-container">
        <div className="metric-row row2">
            <div className="metrics-element ">
                <div className="metric-title">
                    <p>REASEARCH HOURS</p>
                    <p className='metric-value'>{props.data[1]}</p>
                </div>
             
            </div>
            <div className="metrics-element ">
                <div className="metric-title">
                    <p>NUMBER OF PROJECTS</p>
                    <p className='metric-value'>{props.data[1]}</p>
                </div>
            
            </div>
            <div className="metrics-element ">
                <div className="metric-title">
                    <p>NUMBER OF USERS</p>
                    <p className='metric-value'>{props.data[1]}</p>

                </div>
               
            </div>
            <div className="metrics-element">
                <div className="metric-title">
                    <p>TOTAL SPENT</p>
                    <p className='metric-value'>{props.data[1]}</p>
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
  data={props.data[6]}
  csvDelimiter=","
/>

    </div>
    </div>
    {props.data[0]} </div>
</div>
  )
}
