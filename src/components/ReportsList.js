import React, { useState } from 'react'
import './style/ReportList.css'
import Pdf2 from "./Pdf2";
import { Button } from 'bootstrap';
import { Table } from 'react-bootstrap';
export default function ReportsList(props) {
  const [showPdf, setPdf] = useState('')
  const arr = props.data
  const [state, setState] = useState()
  const listItems = Object.keys(arr)
  function handleClick() {
    //console.log(index)
  }

  return (
    <>
      <table>
    
          <thead>
            <th style={{width:"25px"}}>#</th>
            <th>company Name</th>
            <th>Date</th>
          </thead>
      

         
         
          {listItems.map((report) =>
       
         <tr className='elementl' onClick={handleClick = () => {
          const element = arr[report]
          setState(element)
          setPdf(true)
        }}>
            <td>{report} </td>
            <td >{arr[report].companyName}</td>
            <td >{arr[report].date}</td>
            </tr>
     


            )
          }
  
     




      </table>
      <div>
        {showPdf ? <Pdf2 data={state} /> : null}
      </div>
    </>
  )

}
