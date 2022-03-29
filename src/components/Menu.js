
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Button, Offcanvas } from 'react-bootstrap';
import React , {useState} from 'react'

export default function Menu() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate();

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
    <Dropdown.Menu show style={{marginLeft:"16px"}}>
  <Dropdown.Header>Menu</Dropdown.Header>
  <Dropdown.Item eventKey="2">
  <Link to="/">Dashboard</Link>
  </Dropdown.Item>
  <Dropdown.Item eventKey="3">
  <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </Dropdown.Item>
</Dropdown.Menu>
  )
}
