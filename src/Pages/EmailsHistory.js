import React, { useState, useEffect } from "react";
import { onValue, ref, remove } from "firebase/database";
import { database } from "../firebase";
import Button from "react-bootstrap/Button";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
export default function EmailsHistory() {
  const ClientsRef = ref(database, "/emails");
  const postListRef = ref(database, "emails");
  const [emailsList, setEmailsList] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(async () => {
    await onValue(ClientsRef, (snapshot) => {
      const data = snapshot.val();
      const emailsArray = Object.entries(data);
      setEmailsList(emailsArray);
    });
  }, []);

  function handleDelete() {
    remove(ref(database, "emails/"))
      .then(() => {})
      .catch((error) => {});
    window.location.reload(false);
    setShow(false);
  }

  return (
    <>
      <Button
        variant="outline-danger"
        onClick={handleShow}
        style={{
          position: "absolute",
          width: "40%",
          left: "65%",
          top: "23%",
          zIndex: "2",
          width: "150px",
        }}
      >
        Delete History
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete History</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          After clicking Delete, the history of emails will be deleted
          permanently. <strong>We don't recommend deleting the history</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleDelete} variant="danger">
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
      <Header />
      <Menu />

      <Table
        striped
        bordered
        hover
        style={{ position: "absolute", width: "40%", left: "36%", top: "30%" }}
      >
        <thead>
          <th>#</th>
          <th>Client Email</th>
          <th>Subject</th>
          <th>Report</th>
        </thead>
        {emailsList.map((anObjectMapped, index) => {
          return (
            <>
              <tr
                style={{ borderTop: "none" }}
                key={`${anObjectMapped.receiver}_{anObjectMapped.clientEmail}`}
              >
                <td style={{ padding: "10px 8px" }}>{index + 1}</td>
                <td>{anObjectMapped[1].receiver}</td>
                <td>{anObjectMapped[1].subject}</td>
                <td>
                  <a href={anObjectMapped[1].link} target="_blank">
                    Download
                  </a>
                </td>
              </tr>
            </>
          );
        })}
      </Table>
    </>
  );
}
