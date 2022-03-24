import React , {useState} from 'react'
import './style/ReportList.css'
import PDF from "./PDF";
import { Button } from 'bootstrap';

export default function ReportsList(props) {
  const [showPdf, setPdf] = useState(false)

  console.log(props)
  const arr = props.data
  console.log(typeof arr)
 
const listItems = Object.keys(arr) 
 function handleClick() {
setPdf(true)

}


  return (
    <div>
      { listItems.map((report) =>
  // <li>{number.ResearchHours}</li>
  <div className='element'>
    <img className='pdf-logo' src="https://www.svgrepo.com/show/66745/pdf.svg"  />
  <button onClick={handleClick}>{arr[report].ResearchHours}</button>
 
    </div>
    
)
}
  <div>
            { showPdf ?  <PDF data={arr}/> : null }

            </div>
    </div>
  )
  
}
