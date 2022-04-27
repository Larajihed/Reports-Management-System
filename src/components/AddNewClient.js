import React,{useRef} from 'react'
import { ref, push, set  } from "firebase/database";
import { database } from "../firebase";

export default function AddNewClient() {

    const clientNameRef=useRef()
    const clientEmailRef=useRef()

    const postListRef = ref(database, 'clients');
    const newPostRef = push(postListRef);


    async function addClient  (e){
        e.preventDefault()
          const clientName= clientNameRef.current.value
          const clientEmail= clientEmailRef.current.value
          await set(newPostRef, 
      
            {

                 clientName,
                 clientEmail
                
          },
          );
        console.log("Client Added")
    }
  return (
    <div>
            <form id='formulaire' enctype="multipart/form-data"  method="post" onSubmit={addClient}>
                <label>Client Name</label> <br/>
                <input ref={clientNameRef} type="text" required ></input> <br/>
                <label>Client Email</label> <br/>
                <input ref={clientEmailRef} type="email" required></input> <br/>
        <input type="Submit" value="Submit"></input>
    </form>
    </div>
  )
}
