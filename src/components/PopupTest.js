import React from 'react'
import { Link } from "react-router-dom"

import './style/PopupTest.css'
import './style/PDF.css'
import ReactToPdf from 'react-to-pdf'
import { CsvToHtmlTable } from 'react-csv-to-table';
import vector from '../assets/svg/Vector.png'
import MyDocument from './DocumentPDF'
import DocumentPDF from './DocumentPDF'
import { useNavigate } from "react-router-dom";

export default function PopupTest(props) {
  const ref = React.createRef();
  let reportName = props.selectedValue + " " + props.date
  let navigate = useNavigate();

  function naviagteToHome(){
navigate('/')

  }
  return (

    <div className='popup-container'>
      <div className='popup'>
        <h1>Report: {reportName}</h1>

        <button onClick={naviagteToHome} style={{border:"none",backgroundColor:"white",fontSize:"32px",position:"absolute",right:"10%",top:"5%",fontWeight:"bold"}} >X</button>
        <div className='main' style={{ width: 800, height: 1390 }} ref={ref}>
          <div className="info-container">

            <div className="infos">
              <p className="title">{props.selectedValue }</p>
              <p className="date">{ props.date}</p>

            </div>

          </div>
          <div className="general-container">
            <p className="section-title"> Overview</p>
          </div>
          
          <div className="metrics-container">
            <div className="metric-row row2">
              <div className="metrics-element ">
                <div className="metric-title">
                  <p>REASEARCH HOURS</p>
                  <p className='metric-value'>{props.ResearchHours }</p>
                </div>

              </div>
              <div className="metrics-element ">
                <div className="metric-title">
                  <p>NUMBER OF PROJECTS</p>
                  <p className='metric-value'>{props.projectsNumber }</p>
                </div>

              </div>
              <div className="metrics-element ">
                <div className="metric-title">
                  <p>NUMBER OF USERS</p>
                  <p className='metric-value'>{ props.usersNumber}</p>

                </div>

              </div>
              <div className="metrics-element">
                <div className="metric-title">
                  <p>TOTAL SPENT</p>
                  <p className='metric-value'>${props.ResearchHours*125 }</p>
                </div>
                </div>
              </div>
          <div className="numbers-container">
            <div className="title-container">
              <p className="bold">
                By the numbers
              </p>
            </div>
            <div className="notes-container">
              <li>
                In the past month, your company got <span class="bold"> { props.ResearchHours/8} business days back*</span> and saved <span className="bold">${props.ResearchHours*125 } ** </span> by using Wonder for
                your research needs.
              </li>
              <li>
                Your company's peak* throughput in a 24-hour period was <span className="bold">  {props.peakHours }  hours ***</span> of research.
              </li>
              <li>
              We know your team was hard at work this month using that extra time to drive forward other
key initiatives, here are some other interesting ways to put those 453 hours into perspective:
              </li>

            </div>
          </div>


            </div>
            <div className="definitions-container">
              <p>
                * Business Days Back = hours of research done across a given time period, divided by 9 hours in a business
                day<br />** Dollars Saved = Dollar amount it would take a client to perform requisite research (assuming a flat rate
                of $125 per hour) over a given time period minus dollar amount it would take for Wonder to perform the same
                amount of requisite research
                <br />
                *** Peak Man Hours = The most hours researched in a given day
              </p>
             <div style={{position:"absolute",width:"160px",top:"32%",left:"72%",zIndex:"1"}}>
             <DocumentPDF  props={props}/>

             </div>
            </div>
          
          <div className='right-section' >
            <img style={{marginTop:"20px"}} src={vector}></img>
            <h4 style={{marginTop:"16px", marginBottom:"48px"}}>Report Generated on <br></br> {props.addDate}</h4>
        <br></br>
          <Link to="/reminders"> Delete From Calendar</Link>

      </div>
        
        </div>

      </div>
      
    </div>
  )
}
