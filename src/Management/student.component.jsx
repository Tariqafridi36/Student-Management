import React, { useEffect, useState } from "react";
import { studentAction } from "../Flux/_actions/student.action";
import store from "../Flux/store/student.store";
import { StudentDetail } from "./student.detail.component";
import { commonAction } from "../Flux/_actions/common.action";
import { Form } from "react-bootstrap";

export const ManageStudent = () => {
  const [userId, setUserId] = useState(1);
  const [studentData, setStudentData] = React.useState([]);
  const [selectedRow, setSelectedRow] = useState([]);
  const [addNew, setAddNew] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  useEffect(() => {
    store.addChangeListener(onChange);
    if (store.getStudentData().length === 0)
      studentAction.getStudent(null, null);
    return () => store.removeChangeListener(onChange);
  }, [studentData]);

  function onChange() {
    const data = store.getStudentData();
    setStudentData([]);
    setStudentData(data);
  }

  const onRowClick = (row) => {
    debugger
    commonAction.SetGetStudentNationality({
      method: "GET",
      sid: parseInt(row.ID || 0),
      nid: 1,
    });
    studentAction.GetStudentFamilyMembers(row.ID);
    setSelectedRow(row);
    setModalShow(true);
    setAddNew(false);
  };

  return (
    <React.Fragment>
      <div className="container mt-5">
        <div className="row mb-5">
          <div className="col-2">
            <Form.Group>
              <Form.Control
                as="select"
                onChange={(e) => setUserId(parseInt(e.target.value || 0))}
              >
                <option value="1">Admin</option>;
                <option value="2">Registrar</option>;
              </Form.Control>
            </Form.Group>
          </div>
          <div className="col-8"></div>
          <div className="col-2">
            <div className="float-end">
              {userId === 1 && (
                <button
                  className="btn btn-primary"
                  onClick={() => {
                    setAddNew(true);
                    setModalShow(true);
                  }}
                >
                  Add Student
                </button>
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
                {studentData?.length > 0 &&
                  studentData.map((row, index) => {
                    return (
                      <React.Fragment>
                        <tr
                          key={index}
                          onClick={() => {
                            if (userId === 2) onRowClick(row);
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
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalShow && (
        <StudentDetail
          user={userId}
          isNew={addNew}
          show={modalShow}
          rowData={selectedRow}
          close={() => setModalShow(false)}
        />
      )}
    </React.Fragment>
  );
};
