import React, { useEffect, useState } from 'react'
import { studentAction } from '../Flux/_actions/student.action'
import store from '../Flux/store/student.store'
import { StudentDetail } from './student.detail.component'
import { commonAction } from '../Flux/_actions/common.action'
import { Form } from 'react-bootstrap'
import { Button } from '@mui/material'
import { Add } from '@material-ui/icons'

export const ManageStudent = () => {
  const [modelData, setModelData] = useState({
    studentData: [],
    add: false,
    rowData: null,
    userid: 1,
  })

  useEffect(() => {
    studentAction.getStudent(null, (res) => { 
      setModelData({ ...modelData, studentData: res.data });
    })
  }, []) 

  const onRowClick = (row) => {
    // commonAction.GetNationality({})
    // commonAction.SetGetStudentNationality({
    //   method: 'GET',
    //   sid: parseInt(row.ID || 0),
    //   nid: 1,
    // })
    setModelData({ ...modelData, add: true, rowData: row })
  }

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-2">
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) =>
                  setModelData({ ...modelData, userid: +e.target.value })
                }
              >
                <option value="1">Admin</option>;
                <option value="2">Registrar</option>;
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            <div className="float-end">
              {modelData.userid === 1 && (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    setModelData({ ...modelData, add: true, rowData: null })
                  }}
                >
                  <Add /> Add Student
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <table className="table table-border table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Date of Birth</th>
                </tr>
              </thead>
              <tbody>
                {modelData.studentData?.length > 0 &&
                  modelData.studentData.map((row, index) => {
                    return (
                      <React.Fragment>
                        <tr
                          key={row.ID.toString()}
                          onClick={() => {
                            if (modelData.userid === 2) onRowClick(row)
                          }}
                        >
                          <td>{row.ID}</td>
                          <td>{row.firstName}</td>
                          <td>{row.lastName}</td>
                          <td>
                            {new Date(row.dateOfBirth).toLocaleDateString()}
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modelData.add && (
        <StudentDetail modelData={modelData} setModelData={setModelData} />
      )}
    </React.Fragment>
  )
}
