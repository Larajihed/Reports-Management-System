import React from 'react'
import Calendar from './Calendar'
import Header from './Header'
import Menu from './Menu'

export default function Reminders() {
  return (
    <>
    <Header/>
    <Menu/>
   <div style={{position:"absolute", top:"20%",left:"30%",width:"650px"}}>
   <Calendar/>

   </div>
    </>
  )
}
