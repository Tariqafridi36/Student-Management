import React, { useEffect, useState } from 'react'
import { Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { studentAction } from '../Flux/_actions/student.action'
import { commonAction } from '../Flux/_actions/common.action'
import commonStore from '../Flux/store/common.store'
import store from '../Flux/store/student.store'
import FamilyMember from './family.member.component'
import { Button, IconButton } from '@mui/material'
import { AddCircle, Close, Edit, Save } from '@material-ui/icons'
import { Stack } from '@mui/system'

const familyTypes = [
  { ID: 1, Name: 'Parent' },
  { ID: 2, Name: 'Sibling' },
  { ID: 3, Name: 'Spouse' },
]

export const StudentDetail = (props) => {
  const { show, rowData, close, isNew, user } = props

  const [isEdit, setIsEdit] = useState(false)
  const [familyModalShow, setFamilyModalShow] = useState(false)
  const [isNewS, setIsNewS] = useState(isNew)
  const [onValidated, setOnValidated] = useState(false)
  const [onFamilyValidated, setOnFamilyValidated] = useState(false)
  const [firstName, setFirstName] = useState(rowData.firstName)
  const [lastName, setLastName] = useState(rowData.lastName)
  const [dob, setDob] = useState(rowData.dateOfBirth)
  const [nationality, setNationality] = useState(commonStore.getData())
  const [familyMembers, setFamilyMembers] = useState([])
  const [nationalityId, setNationalityId] = useState(1)
  const [isFamilyId, setIsFamilyId] = useState(null)
  const [nationalityTitle, setNationalityTitle] = useState(null)

  const [familyFirstName, setFamilyFirstName] = useState('')
  const [familylastName, setFamilylastName] = useState('')
  const [familyDob, setFamilyDob] = useState('')
  const [familyRelatioship, setFamilyRelatioship] = useState('')

  useEffect(() => {
    commonStore.addChangeListener(onChange)
    store.addChangeListener(onStoreChange)
    if (commonStore.getData().length === 0) commonAction.GetNationality(null)

    setTimeout(() => {
      const obj = commonStore.getSelectedNationality().nationality
      setNationalityTitle(obj?.Title)
      setNationalityId(obj?.ID)
    }, 100)

    return () => {
      commonStore.removeChangeListener(onChange)
      store.removeChangeListener(onChange)
    }
  }, [nationality, familyMembers, rowData])

  function onChange() {
    setNationality(commonStore.getData())
  }

  function onStoreChange() {
    setFamilyMembers([])
    const members = store.getFamilyMembers()
    setFamilyMembers(members)
  }

  const onFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    setOnValidated(true)
    if (form.checkValidity()) {
      studentAction.AddUpdateStudent({
        ID: isNew ? null : rowData.ID,
        firstName: firstName,
        lastName: lastName,
        dateOfBirth: dob,
      })

      commonAction.SetGetStudentNationality({
        method: 'PUT',
        sid: rowData.ID,
        nid: parseInt(nationalityId || 0),
      })

      close(false)
      studentAction.getStudent()
    }
  }

  const onEdithandler = () => {
    setIsEdit(true)
    setIsNewS(true)
  }

  return (
    <div>
      <Modal
        size="lg"
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Form noValidate validated={onValidated} onSubmit={onFormSubmit}>
          <Modal.Header closeButton onClick={() => close(false)}>
            <Modal.Title id="contained-modal-title-vcenter">
              {isNew ? 'Add new Student' : 'Student Detail'}
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            {!isNewS && (
              <Container>
                <div className="float-end">
                  <Button variant="light" onClick={onEdithandler}>
                    Edit
                  </Button>
                </div>
                <Row>
                  <Col md={2}></Col>
                  <Col xs={12} md={7}>
                    <p>
                      First Name: <b> {rowData.firstName}</b>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}></Col>
                  <Col xs={12} md={7}>
                    <p>
                      Last Name: <b> {rowData.lastName}</b>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}></Col>
                  <Col xs={12} md={7}>
                    <p>
                      Date of Birth:{' '}
                      <b>
                        {new Date(rowData.dateOfBirth).toLocaleDateString()}
                      </b>
                    </p>
                  </Col>
                </Row>
                <Row>
                  <Col md={2}></Col>
                  <Col xs={12} md={7}>
                    <p>
                      Nationality: <b>{nationalityTitle}</b>
                    </p>
                  </Col>
                </Row>
              </Container>
            )}
            {isNew && (
              <Container>
                <div className="row">
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      type="text"
                      className="form-control"
                      onChange={(e) => setFirstName(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid" role="alert">
                      First Name is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      required
                      className="form-control"
                      onChange={(e) => setLastName(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid" role="alert">
                      Last Name is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
                <div className="row">
                  <Form.Group>
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      required
                      className="form-control"
                      onChange={(e) => setDob(e.target.value)}
                    ></Form.Control>
                    <Form.Control.Feedback type="invalid" role="alert">
                      Date of Birth is required!
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Container>
            )}
            {isEdit && (
              <Container>
                <div className="row">
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        autoFocus
                        required
                        value={firstName}
                        type="text"
                        className="form-control"
                        onChange={(e) => setFirstName(e.target.value)}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid" role="alert">
                        First Name is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={lastName}
                        required
                        className="form-control"
                        onChange={(e) => setLastName(e.target.value)}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid" role="alert">
                        Last Name is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <Form.Group>
                      <Form.Label>Date of Birth</Form.Label>
                      <Form.Control
                        type="date"
                        required
                        value={dob}
                        className="form-control"
                        onChange={(e) => setDob(e.target.value)}
                      ></Form.Control>
                      <Form.Control.Feedback type="invalid" role="alert">
                        Date of Birth is required!
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className="col-6">
                    <Form.Label>Nationality</Form.Label>
                    <InputGroup className="mb-3">
                      <Form.Control
                        as="select"
                        aria-describedby="basic-addon2"
                        onChange={(e) => {
                          setNationalityId(e.target.value)
                        }}
                      >
                        {nationality &&
                          nationality.map((item, index) => (
                            <option
                              selected={nationalityId === item.ID}
                              value={item.ID}
                            >
                              {item.Title}
                            </option>
                          ))}
                      </Form.Control>
                    </InputGroup>
                  </div>
                </div>

                <FamilyMember data={rowData} />
              </Container>
            )}

            
          </Modal.Body>

          <Modal.Footer>
            <Stack direction="row" spacing={2}>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  close(false)
                }}
              >
                <Close /> Cancel
              </Button>

              <Button type="submit" variant="contained" color="success">
                <Save /> Save
              </Button>
            </Stack>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  )
}
