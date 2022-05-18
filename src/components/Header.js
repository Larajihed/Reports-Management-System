import React from 'react'
import * as Icon from 'react-bootstrap-icons';
import DocumentPDF from './DocumentPDF';
import { Link} from "react-router-dom"

export default function Header() {
  return (
    
    <div className='main-container' style={{ display: "flex",padding: "16px", width: "1349px", borderBottom: "1px solid #C7D1DC",position:"fixed",zIndex:"1",backgroundColor:"white"}}>
      <div style={{display:"flex"}}>
  
        <div className='logo-container' style={{paddingLeft: "24px", paddingTop: "4px"}}>
          <img src='https://askwonder.com/assets/images/logo.blue.png' alt='Wonder Logo' style={{  width: "39px",height: "25px"}}></img>       

        </div>
      </div>
        <Link to="/update-profile" className="btn btn-primary light-blue" style={{  backgroundColor:"#d5e3f8" ,color:"#0A58CA",border: "none"}}>
        <Icon.Gear/> Update Profile
          </Link>
      

    </div>
  )
}
