import { Modal, Row } from 'react-bootstrap'
import React, { useState } from 'react'
import { Form, InputGroup } from 'react-bootstrap'
import { studentAction } from '../Flux/_actions/student.action'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import './style.css'
import { useEffect } from 'react' 
import { Avatar, Grid } from '@mui/material'
import { AddCircle, Close, Delete, Edit, Save } from '@material-ui/icons'
import { Stack } from '@mui/system'
import { Button, IconButton } from '@mui/material'
import commonStore from '../Flux/store/common.store'

const familyTypes = [
  { ID: '', Name: '' },
  { ID: 1, Name: 'Parent' },
  { ID: 2, Name: 'Sibling' },
  { ID: 3, Name: 'Spouse' },
]

const FamilyMember = ({ data }) => {
  const [familyModel, setFamilyModel] = useState({
    list: [],
    nationalities: commonStore.getData(),
    id: 0,
    firstname: '',
    lastname: '',
    dob: new Date(),
    relationship: '',
    nationality: '',
    isModel: false,
    validated: false,
  })

  const getFamilyMemberData = () => {
    studentAction.GetStudentFamilyMembers(data?.ID, (res) => {
      setFamilyModel({
        ...familyModel,
        list: res.data,
        isModel: false
      })
    })
  }

  useEffect(() => {
    getFamilyMemberData()
  }, [])

  const onDeleteHandle = (ID) => {
    studentAction.UpdateDeleteFamilyMember(
      {
        method: 'delete',
        ID: ID,
      },
      (res) => {
        getFamilyMemberData()
      },
    )
  }

  const onEditHandle = (row) => {
    setFamilyModel({
      ...familyModel,
      id: row.ID,
      firstname: row.firstName,
      lastname: row.lastName,
      dob: row.dateOfBirth,
      relationship: row.relationship,
      isModel: !familyModel.isModel,
      expanded: false,
    })
  }

  const onCloseHandle = () => {
    setFamilyModel({ ...familyModel, isModel: !familyModel.isModel })
  }

  const onFamilyFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    setFamilyModel({ ...familyModel, validated: true })

    if (form.checkValidity()) {
      if (familyModel.id > 0) {
        studentAction.UpdateDeleteFamilyMember({
          ID: familyModel.id,
          firstName: familyModel.firstname,
          lastName: familyModel.lastname,
          dateOfBirth: familyModel.dob,
          relationship: familyModel.relationship,
          method: 'PUT',
        }, (res) =>{
          getFamilyMemberData()
        })
      } else {
        studentAction.addFamilyMember({
          sid: data.ID,
          firstName: familyModel.firstname,
          lastName: familyModel.lastname,
          dateOfBirth: familyModel.dob,
          relationship: familyModel.relationship,
        }, (res) =>{
          getFamilyMemberData()
        })
      }

       
    }
  }

  function stringAvatar(name) {
    return {
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    }
  }

  const AccordianRow = ({ row, index }) => {
    const [expanded, setExpanded] = useState(false)
    const fullname = row.firstName + ' ' + row.lastName
    return (
      <Accordion
        onChange={(e, expand) => {
          setExpanded(expand)
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="d-flex">
            {!expanded ? (
              <>
                <Avatar {...stringAvatar(fullname)} /> &nbsp;&nbsp;
                <div className="ml-2">
                  {fullname}
                  <p className="small text-muted">{row.relationship}</p>
                </div>
              </>
            ) : (
              <>
                <Avatar>{index + 1}</Avatar>
                &nbsp;
                <div className="mt-2">Family Member # {index + 1}</div>
              </>
            )}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <input
                  type={'text'}
                  className="form-control"
                  value={row.firstName}
                ></input>
              </Grid>
              <Grid item xs={6}>
                <input
                  type={'text'}
                  className="form-control"
                  value={row.lastName}
                ></input>
              </Grid>
              <Grid item xs={6}>
                <input
                  type={'text'}
                  className="form-control"
                  value={row.dateOfBirth}
                ></input>
              </Grid>
              <Grid item xs={6}>
                <input
                  type={'text'}
                  className="form-control"
                  value={row.relationship}
                ></input>
              </Grid>
              <Grid item xs={6}></Grid>
              <Grid item xs={6}>
                <Stack direction="row" spacing={2}>
                  <button
                    type={'button'}
                    className="btn btn-danger"
                    onClick={() => onDeleteHandle(row.ID)}
                  >
                    <Delete /> Delete
                  </button>
                  <button
                    type={'button'}
                    className="btn btn-primary"
                    onClick={() => onEditHandle(row)}
                  >
                    <Edit /> Edit
                  </button>
                </Stack>
              </Grid>
            </Grid>
          </Typography>
        </AccordionDetails>
      </Accordion>
    )
  }

  return (
    <React.Fragment>
      <div className="main-pannel">
        <div className="pannel-title">Family Members</div>

        {familyModel.list.map((row, index) => {
          return (
            <div className="mb-3">
              <AccordianRow row={row} index={index} />
            </div>
          )
        })}
        <Button
          variant="contained"
          color="primary"
          onClick={() =>
            setFamilyModel({
              ...familyModel,
              isModel: !familyModel.isModel,
              firstname: '',
              lastname: '',
              dob: '',
              id: 0,
            })
          }
        >
          <AddCircle /> &nbsp; Add Family Member
        </Button>
      </div>

      <Modal show={familyModel.isModel} onHide={onCloseHandle} animation={true}>
        <Form
          noValidate
          validated={familyModel.validated}
          onSubmit={onFamilyFormSubmit}
        >
          <Modal.Header closeButton>
            <Modal.Title>Family Member</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="row">
              <div className="col-6">
                <Form.Group>
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    autoFocus
                    required
                    value={familyModel.firstname}
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setFamilyModel({
                        ...familyModel,
                        firstname: e.target.value,
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
                    autoFocus
                    required
                    value={familyModel.lastname}
                    type="text"
                    className="form-control"
                    onChange={(e) =>
                      setFamilyModel({
                        ...familyModel,
                        lastname: e.target.value,
                      })
                    }
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid" role="alert">
                    First Name is required!
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
                    value={familyModel.dob}
                    className="form-control"
                    onChange={(e) =>
                      setFamilyModel({ ...familyModel, dob: e.target.value })
                    }
                  ></Form.Control>
                  <Form.Control.Feedback type="invalid" role="alert">
                    Date of Birth is required!
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col-6">
                <Form.Label>Member Type</Form.Label>
                <InputGroup className="mb-3">
                  <Form.Control
                    required
                    as="select"
                    aria-describedby="basic-addon2"
                    onChange={(e) => {
                      setFamilyModel({
                        ...familyModel,
                        relationship: e.target.value,
                      })
                    }}
                  >
                    {familyTypes &&
                      familyTypes.map((item, index) => (
                        <option
                          selected={familyModel.relationship === item.Name}
                          value={item.Name}
                        >
                          {item.Name}
                        </option>
                      ))}
                  </Form.Control>

                  <Form.Control.Feedback
                    type="invalid"
                    role="alert"
                    class="invalid-feedback"
                  >
                    Relationship is required!
                  </Form.Control.Feedback>
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-6"></div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="error" onClick={onCloseHandle}>
                <Close /> Cancel
              </Button>
              <Button type="submit" color="info" variant="contained">
                <Save /> Save
              </Button>
            </Stack>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default FamilyMember
