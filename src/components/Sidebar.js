import React, {useState} from 'react'
import { Button, Offcanvas } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import * as Icon from 'react-bootstrap-icons';
import { Link } from "react-router-dom"


export default function Sidebar() {
    const [show, setShow] = useState(false);
    const [error, setError] = useState("")
    const navigate = useNavigate();
    const { currentUser, logout } = useAuth()

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    async function handleLogout() {
        setError("")
        try {
          await logout()
          navigate("/login")
        } catch {
          setError("Failed to log out")
        }
      }
    return (
       
      <>
        <Button variant="primary" onClick={handleShow}>
          <Icon.List size={24}/>
        </Button>
  
        <Offcanvas show={show} onHide={handleClose}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
         
          <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
    }
