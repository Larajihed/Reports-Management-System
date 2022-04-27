import { onValue,ref,remove } from 'firebase/database';
import React, {useState,useEffect} from 'react'
import { database } from "../firebase";
import { Button } from 'react-bootstrap';
import { auth } from '../firebase';
import Header from './Header';
import Menu from './Menu';
export default function ClientsList() {
    const user = auth.currentUser;
    const localUserId = user.uid
    const [clients,setClients]=useState([])
                    // get reference for the reports in the database
                    const ClientsRef = ref(database,'/clients');

                    useEffect(async ()=>{
                    await onValue(ClientsRef,(snapshot)=>{
                        const data=snapshot.val();
                        const clientsArray = Object.entries(data)
                        setClients(clientsArray)
                      
                    })
                }, [])
                

function removeFromFirebase (i){
console.log(i)
remove(ref(database, "clients/" + i[0]))
.then(() => {}).catch((error) => {})
}

function handleEditClient (i){
    console.log(i)
}
        
                function handleDelete (){
                
                }
            function handleEdit (){
                
            }
 return (
<>
<Header/>
<Menu/>
<h5 style={{position:"absolute",left:"19%",top:"16%",zIndex:"1",backgroundColor:"#ededed",padding:"8px 16px",borderRadius:"5px"}}>Add Client > Clients List</h5>

<div style={{position:"absolute",top:"20%",left:"40%"}}>
    {clients.map((anObjectMapped, index) => {
                    return (
                       <>
                        <p key={`${anObjectMapped.clientName}_{anObjectMapped.clientEmail}`}>
                        

                            {anObjectMapped[1].clientName} - {anObjectMapped[1].clientEmail}
                        </p>
                        <button onClick={ handleDelete = ()=>{
                          removeFromFirebase(anObjectMapped)
                         

                        }}>Delete Client</button>
                        <button onClick={handleEdit=()=>{
                            handleEditClient(anObjectMapped)
                        }}>Edit Client</button>
                        </>
                    );
                })}
</div>
</>


 )
 }