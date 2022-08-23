import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Menu from "../Components/Menu";
import Toast from "react-bootstrap/Toast";

export default function UpdateProfile() {
  const emailRef = useRef();
  const [showA, setShowA] = useState(false);

  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { currentUser, updatePassword, updateEmail } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const toggleShowA = () => setShowA(!showA);

  function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        toggleShowA();
      })
      .catch(() => {
        setError("Failed to update account", error);
      })
      .finally(() => {
        setLoading(false);
        toggleShowA();
      });
  }

  return (
    <>
      <Header></Header>
      <Menu />

      <div
        className="card"
        style={{
          position: "absolute",
          marginLeft: "450px",
          width: "500px",
          top: "20%",
        }}
      >
        <Card.Body>
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              {" "}
              Update{" "}
            </Button>
            <Link to="/">Cancel</Link>
          </Form>
        </Card.Body>
      </div>

      {showA && (
        <Toast
          onClose={toggleShowA}
          style={{
            position: "absolute",
            right: "2%",
            bottom: "2%",
            backgroundColor: "#DAFFD4",
            color: "green",
          }}
        >
          <Toast.Header style={{ backgroundColor: "#DAFFD4", color: "green" }}>
            <strong className="me-auto">Changes made</strong>
            <small>Now</small>
          </Toast.Header>
          <Toast.Body>The changes have been made</Toast.Body>
        </Toast>
      )}
    </>
  );
}