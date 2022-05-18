import React, { useState, useEffect, useRef } from 'react'
import { onValue, ref, remove, push, set, update } from 'firebase/database';
import { database, auth } from "../firebase";
import './style/Clients.css'
import { Alert } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
export default function ClientsList() {
    const user = auth.currentUser;
    const localUserId = user.uid
    const [clients, setClients] = useState([])
    const [error, setError] = useState("")

    const [clientId, setClientId] = useState()
    // get reference for the reports in the database
    const ClientsRef = ref(database, '/clients');
    const postListRef = ref(database, 'clients');
    const newPostRef = push(postListRef);

    const clientNameRef = useRef()
    const clientEmailRef = useRef()
    const editClientNameRef = useRef()
    const editClientEmailRef = useRef()

    async function addClient(e) {

       
        const clientName = clientNameRef.current.value
        const clientEmail = clientEmailRef.current.value
        e.preventDefault()
        clientEmailsArray.includes(clientEmail) ? setError("Client Exist") : await set(newPostRef,

            {
                clientName,
                clientEmail
            },
            clientNameRef.current.value=" ",
            clientEmailRef.current.value=" "
        );
        
//        window.location.reload(false);
    }


    useEffect(async () => {
        await onValue(ClientsRef, (snapshot) => {
            const data = snapshot.val();
            const clientsArray = Object.entries(data)
            setClients(clientsArray)
        })
    }, [clients])
    let clientEmailsArray = []
    function checkClients(){
        clients.map((anObjectMapped) =>{
            let element = anObjectMapped[1].clientEmail
            clientEmailsArray.push(element)
        })
    }
    checkClients()

    function removeFromFirebase(i) {
        remove(ref(database, "clients/" + i[0]))
            .then(() => { }).catch((error) => { })
            window.location.reload(false);
    }

    function handleEditClient(i) {
        return clientId
    }

    function handleSubmitEditClient(i) {
        const newEmail = editClientEmailRef.current.value
        const newName = editClientNameRef.current.value
        const ClientRef = ref(database, '/clients/' + clientId);
        update(ClientRef, {
            clientName: newName,
            clientEmail: newEmail
        }).then(() => {
            console.log("Data updated");
        }).catch((e) => {
            console.log(e)
        })
    }
    function handleDelete() {

    }
    function handleEdit() {

    }

    return (
        <>
            <div>
                <form id='formulaire' enctype="multipart/form-data" method="post" onSubmit={addClient}>
                    <label>Client Name</label> <br />
                    <input className='text' ref={clientNameRef} type="text" required ></input> <br />
                    <label>Client Email</label> <br />
                    <input className='text' ref={clientEmailRef} type="email" required></input> <br />
                    <input className='addclientbtn' type="Submit" value="Add Client"></input>
                    {error && <Alert variant="danger" style={{width:"345px",position:"absolute",top:"150%"}}>{error}</Alert>}

                </form>
            </div>

            <div style={{ position: "absolute", top: "20%", left: "42.5%"}}>
                <table style={{width:"600px",textAlign:"center"}}>
                    <thead>
                        <th>
                            #
                        </th>
                        <th>
                            Client Name
                        </th>
                        <th>
                            Client Email
                        </th>
                        <th>
                            Actions
                        </th>
                    </thead>
                    {clients.map((anObjectMapped, index) => {
                        return (
                            <>

                                <tr key={`${anObjectMapped.clientName}_{anObjectMapped.clientEmail}`}>
                                    <td>{index + 1}</td>
                                    <td >

                                        {anObjectMapped[1].clientName}

                                    </td>
                                    <td>
                                        {anObjectMapped[1].clientEmail}
                                    </td>
                                    <td>
                                    <Button className='mx-2' variant='primary' onClick={handleEdit = () => {
                                            editClientEmailRef.current.value = anObjectMapped[1].clientEmail
                                            editClientNameRef.current.value = anObjectMapped[1].clientName
                                            const clientId = anObjectMapped[0]
                                            setClientId(clientId)
                                        }}>Edit Client</Button>
                                        <Button variant='outline-danger ' className='mx-2' onClick={handleDelete = () => {
                                            removeFromFirebase(anObjectMapped)
                                        }}>Delete Client</Button>
                                     
                                    </td>
                                </tr>


                            </>
                        );
                    })}
                </table>
            </div>


            <div className='edit-container'>
                <label>Client Name</label> <label className='label2'>Client Name</label> 
<br/>
                <input type="text" className='text' ref={editClientNameRef} required></input> 

                <input type="email" className='text' ref={editClientEmailRef} required></input> 
                <input type="submit" className='editclientbtn' onClick={handleSubmitEditClient} value="Edit"></input>

            </div>
        </>


    )
}