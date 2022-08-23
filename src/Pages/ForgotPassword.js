import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link,  } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState()

  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

   

    try {
        setMessage('')
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage('Check your inbox for further instructions')

    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
  <div style={{display:"flex"}}>
  <div>
  <h1 >Reset your Password ! </h1>
<h2>Reset your account's password </h2>
   <Card style={{width:" 400px", marginLeft:"150px", marginTop: "50px", marginRight:"150px", padding:"25px"}}>
        <Card.Body>
          <h2 className="text-center mb-4">Forgot Password</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            
            
            <Button disabled={loading} className="w-100 mt-4" type="submit">
                Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/login">Login </Link>
          </div>
        </Card.Body>
        <div className="w-100 text-center mt-2">
       Need an account ? <Link to="/signup">Sign Up </Link>
      </div>
      </Card>
     
   </div>
      <div className="right">
  <img style={{  height:" 649px",width:" 666px"}}  src="https://images.unsplash.com/photo-1529539795054-3c162aab037a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"></img>
</div>
  </div>
    
    </>
  )
}