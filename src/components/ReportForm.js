import React, { useRef, useState } from "react"

import { Form, Button, Card, Alert } from "react-bootstrap"

export default function ReportForm() {

  const projectsNumberRef =useRef()
  const ResearchHoursRef =useRef()
  const usersNumberRef =useRef()
  const peakHoursRef =useRef()
  const [loading, setLoading] = useState(false)
  async function handleSubmit(e) {
    e.preventDefault() }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='text-center mb-4'>Report infos</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="projectsNumber">
              <Form.Label>Number of Projects</Form.Label>
              <Form.Control type="number" ref={projectsNumberRef} required />
            </Form.Group>
            <Form.Group id="researchHours">
              <Form.Label>Research Hours</Form.Label>
              <Form.Control type="number" ref={ResearchHoursRef} required />
            </Form.Group>
            <Form.Group id="usersNumber">
              <Form.Label>Number of Users</Form.Label>
              <Form.Control type="number" ref={usersNumberRef} required />
            </Form.Group>
            <Form.Group id="peakHours">
              <Form.Label>Peak man hours</Form.Label>
              <Form.Control type="number" ref={peakHoursRef} required />
            </Form.Group>
            <Form.Group id="clientlogo">
              <Form.Label>Client Logo</Form.Label>
              <Form.Control type="file" ref={peakHoursRef} required />
            </Form.Group>
            
            
            
            <Button disabled={loading} className="w-100 mt-4" type="submit">
                Generate Report
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  )
}
