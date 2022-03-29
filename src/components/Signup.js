import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { Link, useNavigate  } from "react-router-dom"
import './style/Signup.css'
import { useAuth } from "../contexts/AuthContext"

export default function Signup() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      navigate('/');


    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  return (
     <div className="main-container">
       <div className="left">
       <h1 >Create Reports in Seconds ! </h1>
<h2>Create New account </h2>
       <div className="card" style={{width:" 400px", marginLeft:"150px", marginTop: "50px", marginRight:"150px"}}>
        <div className="card-body">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required style={{width:"370px"}} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required style={{width:"370px"}} />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required style={{width:"370px"}} />
            </Form.Group>
            <Button disabled={loading} className="w-150 mt-4 " type="submit" style={{width:"370px"}}>
              Sign Up
            </Button>
          </Form>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/Login">Sign In </Link>
      </div>
    </div>
      <div className="right">
        <img src="https://images.unsplash.com/photo-1471970394675-613138e45da3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"></img>
      </div>
     </div>
    
  )
}