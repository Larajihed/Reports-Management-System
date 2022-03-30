import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import  { database } from '../firebase'
import { ref, onValue } from "firebase/database";
import ReportsList from "./ReportsList"
import Popup from './Popup';
import 'reactjs-popup/dist/index.css';

// import ReportsList from "./ReportsList"
import Header from './Header'
import Menu from "./Menu"
import './style/Dashboard.css'
export default function Dashboard() {
const [reports,setReports] =useState('[]')
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();
  const [data, setdata] = useState()
  const [report, setReport] = useState('')
  const [show, setShow] = useState(false);



  let tab=[]

  useEffect(()=>{
    const reportsRef= ref(database,'reports/')
    onValue(reportsRef,(snapshot)=>{
      const data=snapshot.val()
      Object.keys(data).map((key,index)=> {
        const one = data[key]
        tab.push(one)

      })
      setReports(tab)
      
    })  
  }, [])
//console.log(reports)
//for (var key in data) {
//  if (data.hasOwnProperty(key)) {
 // const one = data[key] ;
 // setReport(one)

  //console.log("onnnnnne" + one)
  //}
//}

 
  return (
    <>
        <Header/>
        <Menu/>
        <div style={{paddingLeft: "200px"}}>
        <strong>Current User : </strong> {currentUser.email}
        <Link to="/report-form" className="btn btn-primary  mt-3" style={{}}>
            Create New Report
          </Link>
      
        </div>
        <Popup data={reports} >

  </Popup>
      <div className="card">
        <div >
          {error && <Alert variant="danger">{error}</Alert>}
          <div >
      <ReportsList data={reports} />
      </div>
      
        </div>
      </div>
      
 
      
    </>
  )
}