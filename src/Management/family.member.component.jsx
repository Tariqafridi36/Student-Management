import { Modal } from 'react-bootstrap'
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
import store from '../Flux/store/student.store'
import { Grid } from '@mui/material'
import { AddCircle, Close, Edit } from '@material-ui/icons'
import { Stack } from '@mui/system'
import { Button, IconButton } from '@mui/material'
import commonStore from '../Flux/store/common.store'

const familyTypes = [
  { ID: 1, Name: 'Parent' },
  { ID: 2, Name: 'Sibling' },
  { ID: 3, Name: 'Spouse' },
]

const FamilyMember = ({data}) => {
  debugger
  const [familyModel, setFamilyModel] = useState({
    list: [],
    nationalities: [],
    id: 0,
    firstname: '',
    lastname: '',
    dob: new Date(),
    relationship: '',
    nationality: '',
    isModel: false,
    validated: false,
  })

  useEffect(() => {
    //commonStore.addChangeListener(onChange)
    store.addChangeListener(onStoreChange)
    const members = store.getFamilyMembers()
    const nation = commonStore.getData()
    setFamilyModel({ ...familyModel, list: members, nationalities: nation })
    return () => {
      //commonStore.removeChangeListener(onChange)
      // store.removeChangeListener(onStoreChange)
    }
  }, [])

  function onStoreChange() {
    const members = store.getFamilyMembers()
    setFamilyModel({ ...familyModel, list: members })
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
    })
  }

  const onCloseHandle = () => {
    setFamilyModel({ ...familyModel, isModel: !familyModel.isModel })
  }

  const onFamilyFormSubmit = (event) => {
    const form = event.currentTarget
    event.preventDefault()
    event.stopPropagation()
    setFamilyModel({ ...familyModel, validated: !familyModel.validated })
    debugger
    if (form.checkValidity()) {
      if (familyModel.id > 0) {
        studentAction.UpdateDeleteFamilyMember({
          ID: familyModel.id,
          firstName: familyModel.firstname,
          lastName: familyModel.lastname,
          dateOfBirth: familyModel.dob,
          relationship: familyModel.relationship,
          method: 'PUT',
        })
      } else {
        studentAction.addFamilyMember({
          sid: data.ID,
          firstName: familyModel.firstname,
          lastName: familyModel.lastname,
          dateOfBirth: familyModel.dob,
          relationship: familyModel.relationship,
        })
      }

      setFamilyModel({
        ...familyModel,
        isModel: false,
      })
    }
  }

  return (
    <React.Fragment>
      <div className="main-pannel">
        <div className="pannel-title">Family Members</div>

        {familyModel.list.map((row, index) => {
          return (
            <div className="mb-3">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Family Member # {index + 1}</Typography>
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
                      <Grid item xs={6}>
                        <input
                          type={'text'}
                          className="form-control"
                          value={row.relationship}
                        ></input>
                      </Grid>
                      <Grid item xs={6}>
                        <Stack direction="row" spacing={2}>
                          <button type={'button'} className="btn btn-danger">
                            <Close /> Delete
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
                </InputGroup>
              </div>
            </div>
            <div className="row">
              <div className="col-6">
                <Form.Group>
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control as="select">
                    {familyModel.nationalities &&
                      familyModel.nationalities.map((item, index) => {
                        return <option value={item.ID}>{item.Title}</option>
                      })}
                  </Form.Control>
                </Form.Group>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseHandle}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </React.Fragment>
  )
}

export default FamilyMember
