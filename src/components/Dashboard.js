import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import  { database } from '../firebase'
import { ref, onValue } from "firebase/database";
import ReportsList from "./ReportsList"
import welcome from '../assets/svg/welcome.svg'
// import ReportsList from "./ReportsList"
import Header from './Header'
import Menu from "./Menu"
import './style/Dashboard.css'

export default function Dashboard() {
const [reports,setReports] =useState('[]')
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();




  let tab=[]

  useEffect(()=>{
    // get reference for the reports in the database
    const reportsRef= ref(database,'reports/')
    onValue(reportsRef,(snapshot)=>{
      const data=snapshot.val()
      
              /* Map into array */

      Object.keys(data).map((key)=> {

        //const one = data[key]
        //tab.push(one)
        
     



     }) 
              

      setReports(data)
      /* Map into array */
    })  
  }, [])

 
  return (
    <>
        <Header/>
        <Menu ></Menu>
        
        <div className="welcomeimgcontainer">
            <img className="welcomeimg" src={welcome}></img>
          </div>

        <div className="maincontainer" >
          
      <div >
      <strong>Current User : </strong> {currentUser.email}
        <Link  to="/report-form" className="btn btn-primary " style={{marginLeft:"175px"}} >
            Create New Report
          </Link>
      </div>
         <div> <ReportsList data={reports} /></div>
        </div>
       
    </>
  )
}