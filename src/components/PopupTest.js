import React from 'react'
import './style/PopupTest.css'
import './style/PDF.css'
import ReactToPdf from 'react-to-pdf'
import { CsvToHtmlTable } from 'react-csv-to-table';
import vector from '../assets/svg/Vector.png'
export default function PopupTest(props) {
  console.log("props " + props.projectsNumberRef)
  const ref = React.createRef();

  return (

    <div className='popup-container'>
      <div className='popup'>
        <h1>{props.text}</h1>

        <button onClick={props.closePopup} style={{border:"none",backgroundColor:"white",fontSize:"32px",position:"absolute",right:"10%",top:"5%",fontWeight:"bold"}} >X</button>
        <div className='main' style={{ width: 800, height: 1390 }} ref={ref}>
          <div className="info-container">

            <div className="infos">
              <p className="title">{props.companyName }</p>
              <p className="date">{ props.date}</p>

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
                In the past month, your company got <span class="bold"> { props.ResearchHours/8} business days back*</span> and saved <span className="bold">${props.ResearchHours*125 } ** </span> by using Wonder for
                your research needs.

              </li>
              <li>
                Your company's peak* throughput in a 24-hour period was <span className="bold">  {props.peakHours }  hours ***</span> of research.
              </li>

            </div>
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
            <div className="definitions-container">
              <p>
                * Business Days Back = hours of research done across a given time period, divided by 9 hours in a business
                day<br />** Dollars Saved = Dollar amount it would take a client to perform requisite research (assuming a flat rate
                of $125 per hour) over a given time period minus dollar amount it would take for Wonder to perform the same
                amount of requisite research
                <br />
                *** Peak Man Hours = The most hours researched in a given day
              </p>
              <CsvToHtmlTable
                data={props.csvData}
                csvDelimiter=","
              />
            </div>
          </div>
          <div className='right-section'>
            <img style={{marginTop:"20px"}} src={vector}></img>
            <h4 style={{marginTop:"16px"}}>Report Generated on <br></br> {props.addDate}</h4>
          <ReactToPdf targetRef={ref} filename="Report" x={.5} y={.5}>
            {({ toPdf }) => (
              <button style={{marginTop:"8px",border:"none",padding:"8px 16px",borderRadius:"6px",backgroundColor:"#3A9F5D",color:"white"}} variant='primary' onClick={toPdf}>Generate pdf  </button>
            )}
          </ReactToPdf>
      </div>
        
        </div>

      </div>
      
    </div>
  )
}
