import React, { useRef, useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import './style/login.css'

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault()

   

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      navigate('/');
    } catch {
      setError("Wrong Login Information")
    }

    setLoading(false)
  }
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  return (
    <div className="main-container">

<div className="left">
<h1 >Create Reports in Seconds ! </h1>
<h2>Login to access your account </h2>
<div className="card " style={{width:" 400px", marginLeft:"150px", marginTop: "30px", marginRight:"150px"}}>

        <div className="card-body" >
          <h2 className="text-center mb-4">Login</h2>
          {error && <Alert variant="danger" style={{width:"370px"}}>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required style={{width:"370px"}} />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type={passwordShown ? "text" : "password"} ref={passwordRef} required style={{width:"370px"}} />
              <a onClick={togglePassword} style={{float:"right",fontSize:"12px",cursor:"pointer",marginTop:"8px"}}>{passwordShown ? "hide password" : "show password"}</a>
            </Form.Group>
            
            <Button disabled={loading} className=" mt-4" type="submit" style={{width:"370px"}} >
                Login
            </Button>
          </Form>
          <div className="w-100 text-center mt-2">
            <Link to="/forgot-password">Forgot Password ? </Link>
          </div>
        </div>
      </div>
      <div className="w-100 text-center mt-2">
       Need an account ? <Link to="/signup">Sign Up </Link>
      </div>
</div>
<div className="right">
  <img  src="https://images.unsplash.com/photo-1471970394675-613138e45da3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80"></img>
</div>
    </div>
  )
}