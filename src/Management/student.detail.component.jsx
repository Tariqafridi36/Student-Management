import React, { useEffect, useState } from 'react'
import { Col, Container, Form, InputGroup, Modal, Row } from 'react-bootstrap'
import { studentAction } from '../Flux/_actions/student.action'
import { commonAction } from '../Flux/_actions/common.action'
import FamilyMember from './family.member.component'
import { Button, IconButton } from '@mui/material'
import { AddCircle, Close, Edit, Save } from '@material-ui/icons'
import { Stack } from '@mui/system'

export const StudentDetail = ({ setModelData, modelData }) => {
  const rowData = modelData?.rowData
  const [studentModel, setStudentModel] = useState({
    sid: rowData ? rowData.ID : 0,
    firstName: rowData ? rowData.firstName : '',
    lastName: rowData ? rowData.lastName : '',
    dob: rowData ? rowData.dateOfBirth : new Date(),
    nationality: rowData ? rowData.nationality : '',
    nationalities: [],
    validated: false,
  })

  const getStudentData = () => {
    const allNationalities = new Promise((resolve, reject) => {
      commonAction.GetNationality(null, (res) => {
        resolve(res)
      })
    })

    const studentNationality = new Promise((resolve, reject) => {
      commonAction.SetGetStudentNationality(
        { sid: rowData?.ID ?? 1, nid: 1, method: 'GET' },
        (res) => {
          resolve(res)
        },
      )
    })

    Promise.allSettled([allNationalities, studentNationality]).then((res) => {
      
      setStudentModel({
        ...studentModel,
        nationalities: res[0].value.data,
        nationality: res[1].value?.data?.nationality?.ID,
      })
    })
  }

  useEffect(() => {
    getStudentData()
  }, [])

  const onFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    setStudentModel({ ...studentModel, validated: true })
    if (form.checkValidity()) {
      studentAction.AddUpdateStudent(
        {
          ID: !rowData ? null : rowData.ID,
          firstName: studentModel.firstName,
          lastName: studentModel.lastName,
          dateOfBirth: studentModel.dob,
        },
        (res) => { 
          commonAction.SetGetStudentNationality(
            {
              method: 'PUT',
              sid: res.data.ID,
              nid: studentModel.nationality,
            },
            (res1) => {
              debugger
              studentAction.getStudent(null, (res) => {
                setModelData({
                  ...modelData,
                  studentData: res.data,
                  add: false,
                })
              })
            },
          )
        },
      )
    }
  }

  return (
    <div>
      <Modal
        size="lg"
        show={true}
        aria-labelledby="contained-modal-title-vcenter"
      >
        <Form
          noValidate
          validated={studentModel.validated}
          onSubmit={onFormSubmit}
        >
          <Modal.Header
            closeButton
            onClick={() => {
              setModelData({ ...modelData, add: false })
            }}
          >
            <Modal.Title id="contained-modal-title-vcenter">
              {!rowData ? 'Add new Student' : 'Student Detail'}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <div className="row">
                <div className="col-6">
                  <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      autoFocus
                      required
                      value={studentModel.firstName}
                      type="text"
                      className="form-control"
                      onChange={(e) =>
                        setStudentModel({
                          ...studentModel,
                          firstName: e.target.value,
                        })
                      }
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
                      value={studentModel.lastName}
                      required
                      className="form-control"
                      onChange={(e) =>
                        setStudentModel({
                          ...studentModel,
                          lastName: e.target.value,
                        })
                      }
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
                      value={studentModel.dob}
                      className="form-control"
                      onChange={(e) =>
                        setStudentModel({
                          ...studentModel,
                          dob: e.target.value,
                        })
                      }
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
                      required
                      as="select"
                      value={studentModel.nationality}
                      aria-describedby="basic-addon2"
                      onChange={(e) => {
                        setStudentModel({
                          ...studentModel,
                          nationality: e.target.value,
                        })
                      }}
                    >
                      {studentModel.nationalities &&
                        studentModel.nationalities.map((item, index) => (
                          <option
                            selected={studentModel.nationality === item.ID}
                            value={item.ID}
                          >
                            {item.Title}
                          </option>
                        ))}
                    </Form.Control>
                    <Form.Control.Feedback type="invalid" role="alert">
                      Nationality is required!
                    </Form.Control.Feedback>
                  </InputGroup>
                </div>
              </div>

              <FamilyMember data={rowData} />
            </Container>
          </Modal.Body>

          <Modal.Footer>
            <Stack direction="row" spacing={2}>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  setModelData({ ...modelData, add: false })
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
