import React, { useState, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useNavigate } from "react-router-dom"
import  { database } from '../firebase'
import { ref, onValue } from "firebase/database";
import ReportsList from "./ReportsList"
// import ReportsList from "./ReportsList"

export default function Dashboard() {
const [reports,setReports] =useState('[]')
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const navigate = useNavigate();
  const [data, setdata] = useState()
  const [report, setReport] = useState('')

  async function handleLogout() {
    setError("")

    try {
      await logout()
      navigate("/login")
    } catch {
      setError("Failed to log out")
    }
  }
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
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <strong>Email:</strong> {currentUser.email}
          <Link to="/update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
          <Link to="/report-form" className="btn btn-primary w-100 mt-3">
            Create New Report
          </Link>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        
      </div>
      <div>
      <ReportsList data={reports} />
      </div>
      
    </>
  )
}