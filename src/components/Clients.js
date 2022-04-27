import React, {} from 'react'
import AddNewClient from './AddNewClient'
import ClientsList from './ClientsList'
import Header from './Header'
import Menu from './Menu'
import { Link } from "react-router-dom"

export default function Clients() {

    
  return (
    <div>
        
<Header/>
<Menu/>
<h5 style={{position:"absolute",left:"19%",top:"16%",zIndex:"1",backgroundColor:"#ededed",padding:"8px 16px",borderRadius:"5px"}}>Add Client</h5>

<div className='main'  style={{position:"absolute",top:"20%",left:"40%"}}>
<div>
<AddNewClient/>
<Link className='menu-element' to="/clients-list"  >Account Settings</Link>
</div>

</div>

    </div>
  )
}
