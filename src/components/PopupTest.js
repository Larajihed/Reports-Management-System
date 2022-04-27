
import React from 'react'

export default function PopupTest(props) {
    console.log("props " + props.dataRef)
  return (
    <div className='popup' style={{width:"1000px",height:"800px",backgroundColor:"#fff"}}>
    <div className='popup_inner'>
      <h1>{props.text}</h1>
      
    <button onClick={props.closePopup}>close me</button>
    </div>
  </div>
  )
}
