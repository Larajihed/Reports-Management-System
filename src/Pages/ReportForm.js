import React, { useRef, useState, useEffect } from "react";
import { Form, Card } from "react-bootstrap";
import { database } from "../firebase";
// import { useNavigate } from "react-router-dom"
import { ref, push, set, onValue } from "firebase/database";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
//import 'reactjs-popup/dist/index.css';
import auth from "../firebase";
import { getAuth } from "firebase/auth";
import PopupTest from "../Components/PopupTest";

export default function ReportForm() {
  const projectsNumberRef = useRef();
  const ResearchHoursRef = useRef();
  const usersNumberRef = useRef();
  const peakHoursRef = useRef();
  const dateRef = useRef();
  const dataRef = useRef();
  const [clients, setClients] = useState([]);
  const ClientsRef = ref(database, "/clients");
  const [selectedValue, setSelectedValue] = useState("");
  useEffect(() => {
    async function fetchData() {
      await onValue(ClientsRef, (snapshot) => {
        const data = snapshot.val();
        const clientsArray = Object.entries(data);
        setClients(clientsArray);
      });
    }
    fetchData();
  }, []);
  const [show, setShow] = useState(false);
  const postListRef = ref(database, "reports");
  const newPostRef = push(postListRef);
  const [arr, setdata] = useState("");
  const auth = getAuth();
  const user = auth.currentUser;
  async function handleSubmit(e) {
    e.preventDefault();
    var today = new Date();
    var addDate =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    const projectsNumber = projectsNumberRef.current.value;
    const ResearchHours = ResearchHoursRef.current.value;
    const usersNumber = usersNumberRef.current.value;
    const peakHours = peakHoursRef.current.value;
    const date = dateRef.current.value;
    const variabless = [
      projectsNumber,
      ResearchHours,
      usersNumber,
      peakHours,
      date,
    ];
    const userId = user.uid;
    await set(newPostRef, {
      userId,
      projectsNumber,
      ResearchHours,
      usersNumber,
      selectedValue,
      peakHours,
      date,
      addDate,
    });
    setShowPopup(!showPopup);
    setdata(variabless);
  }

  const [showPopup, setShowPopup] = useState(false);

  function togglePopup() {
    //setShowPopup(false)
  }
  var today = new Date();
  function handleChange(e) {
    setSelectedValue(e.target.value);
  }
  return (
    <>
      <Header></Header>
      <Menu></Menu>

      <Card
        style={{
          width: "400px",
          left: "45%",
          position: "absolute",
          top: "20%",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Report Details</h2>
          <form onSubmit={handleSubmit}>
            <Form.Group id="companyName">
              <label for="receiver">Client</label>
              <br />
              <select
                value={selectedValue}
                name="receiver"
                onChange={handleChange}
                required
              >
                <option value="">Choose Client</option>
                {clients.map((anObjectMapped) => {
                  return (
                    <>
                      <option value={anObjectMapped[1].clientName}>
                        {anObjectMapped[1].clientName}
                      </option>
                    </>
                  );
                })}
              </select>
              <br />
            </Form.Group>
            <Form.Group id="date">
              <Form.Label>Report Date*</Form.Label>
              <Form.Control
                type="month"
                ref={dateRef}
                required
                style={{ width: "370px" }}
              />
            </Form.Group>
            <Form.Group id="projectsNumber">
              <Form.Label>Number of Projects*</Form.Label>
              <Form.Control
                type="number"
                ref={projectsNumberRef}
                required
                style={{ width: "370px" }}
              />
            </Form.Group>
            <Form.Group id="researchHours">
              <Form.Label>Research Hours*</Form.Label>
              <Form.Control
                type="number"
                ref={ResearchHoursRef}
                required
                style={{ width: "370px" }}
              />
            </Form.Group>
            <Form.Group id="usersNumber">
              <Form.Label>Number of Users*</Form.Label>
              <Form.Control
                type="number"
                ref={usersNumberRef}
                required
                style={{ width: "370px" }}
              />
            </Form.Group>
            <Form.Group id="peakHours">
              <Form.Label>Peak man hours*</Form.Label>
              <Form.Control
                type="number"
                ref={peakHoursRef}
                required
                style={{ width: "370px" }}
              />
            </Form.Group>

            <button onClick={togglePopup}>Send</button>
          </form>
        </Card.Body>
      </Card>
      <div>
        {showPopup ? (
          <PopupTest
            projectsNumber={projectsNumberRef.current.value}
            ResearchHours={ResearchHoursRef.current.value}
            usersNumber={usersNumberRef.current.value}
            peakHours={peakHoursRef.current.value}
            date={dateRef.current.value}
            selectedValue={selectedValue}
            addDate={
              today.getFullYear() +
              "-" +
              (today.getMonth() + 1) +
              "-" +
              today.getDate()
            }
            text="Close Me"
            closePopup={togglePopup}
          />
        ) : null}
      </div>
    </>
  );
}
