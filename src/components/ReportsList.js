import React, { useState } from 'react'
import './style/ReportList.css'
import Popup from './Popup';
import 'reactjs-popup/dist/index.css';
import { Button } from 'react-bootstrap';
import { database } from '../firebase';
import { ref,  remove } from "firebase/database";
import auth from '../firebase'
import { getAuth } from "firebase/auth";



export default function ReportsList(props) {

  const [show, setShow] = useState(false);
  const [fullscreen, setFullscreen] = useState(true);
  /***** Pdf parameters */
  const values = [true];
  function handleShow(breakpoint) {
    setFullscreen(breakpoint);
    setShow(true);
  }
  // Conversion props to array , rendering ui through object
  const arr = props.data

  // returning array from an object maping through arr
  const listItems = Object.keys(arr)
  const auth = getAuth();
  const user = auth.currentUser;
  const localUserId = user.uid



  function handleClick() {
    //console.log(index)
  }
  function handleDelete(report) {


  }
  return (
    <>

      <table className='position ' width="500" style={{ fontSize: "16px", border: "none", borderRadius: "60px" }}>

        <thead style={{ fontSize: "16px" }}>
          <th style={{ fontSize: "16px" }} width="1%">#</th>
          <th width="40%">company Name</th>
          <th width="30%" >Date</th>
          <th width="20%">Report</th>
        </thead>
        <tbody>
      

          {listItems.map((report, index) =>

            <tr className='elementl'>
              {(() => {
        if (arr[report].userId ==  localUserId) {
          return (
            <> 
            <td >{index + 1} </td>
            <td >
                {

              arr[report].companyName
              }</td>
               <td >{arr[report].date}</td>
               <td> 
                
                <Popup onClick={
                handleClick = () => {
              }} data={arr[report]} > 
                </Popup>

              <Button className='btn bg-danger border-0 ' 
              onClick={handleDelete = () => {
                remove(ref(database, "reports/" + report))
                  .then(() => {}).catch((error) => {})
              }}> Delete</Button>
              </td>

            </>
            
          )
        } 
      })()}
        
            </tr>
          )
          }


        </tbody>




      </table>

    </>
  )

}
