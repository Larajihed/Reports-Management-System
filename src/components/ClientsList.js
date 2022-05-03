import React, { useState, useEffect, useRef } from 'react'
import { onValue, ref, remove, push, set, update } from 'firebase/database';
import { database, auth } from "../firebase";
import './style/Clients.css'
export default function ClientsList() {
    const user = auth.currentUser;
    const localUserId = user.uid
    const [clients, setClients] = useState([])
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

        await set(newPostRef,

            {
                clientName,
                clientEmail
            },


        );
          window.location.reload(false);
    }


    useEffect(async () => {
        await onValue(ClientsRef, (snapshot) => {
            const data = snapshot.val();
            const clientsArray = Object.entries(data)
            setClients(clientsArray)
        })
    }, [])


    function removeFromFirebase(i) {
        console.log(i)
        remove(ref(database, "clients/" + i[0]))
            .then(() => { }).catch((error) => { })
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
                </form>
            </div>

            <div style={{ position: "absolute", top: "20%", left: "40%" }}>
                <table>
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

                                        <button onClick={handleDelete = () => {
                                            removeFromFirebase(anObjectMapped)
                                        }}>Delete Client</button>
                                        <button onClick={handleEdit = () => {
                                            editClientEmailRef.current.value = anObjectMapped[1].clientEmail
                                            editClientNameRef.current.value = anObjectMapped[1].clientName
                                            const clientId = anObjectMapped[0]
                                            setClientId(clientId)
                                        }}>Edit Client</button>
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
                <input type="submit" className='editclientbtn' onClick={handleSubmitEditClient}></input>

            </div>
        </>


    )
}