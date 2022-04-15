
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"
import { Button, Offcanvas } from 'react-bootstrap';
import React , {useState} from 'react'
import './style/Menu.css'
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
    <Dropdown.Menu show style={{ diplay:"flex", paddingRight:"10px", paddingBottom:"450px",paddingTop:"16px", border:"none", background: "#FFFFFF",boxShadow: "2px 7px 35px rgba(221, 225, 229, 0.6)", position:"fixed", zIndex:"0",marginTop:"69px"}}>
   
  <div style={{display: "grid"}}>
  
  <Link className='menu-element' to="/"  >Dashboard</Link>
  

  <Link className='menu-element' to="/update-profile"  >Account Settings</Link>
  <Link className='menu-element' to="/reminders"  >Manage Reminders</Link>
  </div>
  <div>
    
  <button className='logout-btn ' onClick={handleLogout}>
  <i class="bi bi-speedometer2"></i>
  Log Out
        </button>
  </div>
      
</Dropdown.Menu>
  )
}
