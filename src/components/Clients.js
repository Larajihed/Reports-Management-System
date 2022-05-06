import React, { } from 'react'
import AddNewClient from './AddNewClient'
import ClientsList from './ClientsList'
import Header from './Header'
import Menu from './Menu'
import { Link } from "react-router-dom"
import './style/Clients.css'
export default function Clients() {


  return (
    <div>

      <Header />
      <Menu />
      <h5 style={{ position: "absolute", left: "19%", top: "16%", zIndex: "1", backgroundColor: "#ededed", padding: "8px 16px", borderRadius: "5px" }}>Add Client</h5>

      <div className='main' style={{ position: "absolute", top: "20%", left: "18%" }}>
        <div>
          <AddNewClient />
        </div>
      </div>
      <div className='right-container'>
      <ClientsList/>

</div>

    </div>
  )
}
