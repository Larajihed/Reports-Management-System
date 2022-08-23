import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";

import "../style/PDF.css";

import vector from "../assets/svg/Vector.png";

import DocumentPDFView from "../Pages/DocumentPDFView";
export default function Popup(props) {
  const ref = React.createRef();

  const values = [true];
  const [fullscreen, setFullscreen] = useState(true);
  const [show, setShow] = useState(false);

  const arr = props.data;
  //console.log(arr)
  //const listItems = Object.keys(arr)
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }

  return (
    <>
      {values.map((v) => (
        <Button className="me-2 " onClick={() => handleShow(v)}>
          View
        </Button>
      ))}
      <Modal show={show} fullscreen={fullscreen} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Pdf Report</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="scaled">
            <div className="right-section">
              <img style={{ marginTop: "20px" }} src={vector}></img>
              <h4 style={{ marginTop: "16px" }}>
                Report Generated on <br></br> {arr.addDate}
              </h4>
              <DocumentPDFView props={arr} style={{ marginTop: "25px" }} />
            </div>
            <div
              className="main"
              style={{ width: 800, height: 1390 }}
              ref={ref}
            >
              <div className="info-container">
                <div className="infos">
                  <p className="title">{arr.selectedValue}</p>
                  <p className="date">{arr.date}</p>
                </div>
              </div>
              <div className="general-container">
                <p className="section-title"> overview</p>
              </div>
              <div className="numbers-container">
                <div className="title-container">
                  <p className="bold">By the numbers</p>
                </div>
                <div className="notes-container">
                  <li>
                    In the past month, your company got{" "}
                    <span class="bold">
                      {" "}
                      {arr.ResearchHours / 8} business days back*
                    </span>{" "}
                    and saved{" "}
                    <span className="bold">
                      {arr.ResearchHours * 125} dollars**{" "}
                    </span>{" "}
                    by using Wonder for your research needs.
                  </li>
                  <li>
                    Your company's peak* throughput in a 24 hour period was{" "}
                    <span className="bold"> {arr.peakHours} hours ***</span> of
                    research.
                  </li>
                </div>
              </div>

              <div className="metrics-container">
                <div className="metric-row row2">
                  <div className="metrics-element ">
                    <div className="metric-title">
                      <p>REASEARCH HOURS</p>
                      <p className="metric-value">{arr.ResearchHours}</p>
                    </div>
                  </div>
                  <div className="metrics-element ">
                    <div className="metric-title">
                      <p>NUMBER OF PROJECTS</p>
                      <p className="metric-value">{arr.projectsNumber}</p>
                    </div>
                  </div>
                  <div className="metrics-element ">
                    <div className="metric-title">
                      <p>NUMBER OF USERS</p>
                      <p className="metric-value">{arr.usersNumber}</p>
                    </div>
                  </div>
                  <div className="metrics-element">
                    <div className="metric-title">
                      <p>TOTAL SPENT</p>
                      <p className="metric-value">{arr.ResearchHours * 125}</p>
                    </div>
                  </div>
                </div>
                <div className="definitions-container">
                  <p>
                    * Business Days Back = hours of research done across a given
                    time period, divided by 9 hours in a business day
                    <br />
                    ** Dollars Saved = Dollar amount it would take a client to
                    perform requisite research (assuming a flat rate of $125 per
                    hour) over a given time period minus dollar amount it would
                    take for Wownder to perform the same amount of requisite
                    research
                    <br />
                    *** Peak Man Hours = The most hours researched in a given
                    day
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
