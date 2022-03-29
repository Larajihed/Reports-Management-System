import React , {useState} from 'react'
import './style/ReportList.css'
import Pdf2 from "./Pdf2";
import { Button } from 'bootstrap';

export default function ReportsList(props) {
  const [showPdf, setPdf] = useState('')
  const arr = props.data
  const [state,setState]=useState()
const listItems = Object.keys(arr) 
function handleClick() {
//console.log(index)
}

  return (
    <div>
      { listItems.map((report,index) =>
  // <li>{number.ResearchHours}</li>
  <button  className='element' onClick={handleClick=()=>{
    const element=arr[report]
   // console.log(element)
   setState(element)
   setPdf(true)
}}>
  
    <img className='pdf-logo' src="https://www.svgrepo.com/show/66745/pdf.svg"  />
    <p >{arr[report].companyName}</p>
  </button>
  )
}

  <div>
    <button  >Uest</button>
  { showPdf ?  <Pdf2 data={state}/> : null }
            </div>
    </div>
  )
  
}
