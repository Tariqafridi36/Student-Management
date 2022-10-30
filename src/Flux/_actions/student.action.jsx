import {
  getStudentData,
  addUpdateStudent,
} from '../../Services/student.service'
import { dispatcher } from '../../Helper/middleware/appDispatcher'
import { StudentConstant } from '../../Helper/constants/student.constanct'
import {
  addFamilyMember,
  getStudentFamilyMembers,
  updateDeleteFamilyMember,
  updateFamilyMemberNationality,
} from '../../Services/familymember.service'

export const studentAction = {
  getStudent: (req, callback) => {
    getStudentData(
      req,
      (res) => {
        callback(res)
        // dispatcher.dispatch({
        //   actionType: StudentConstant.GET,
        //   data: res.data,
        // })
      },
      null,
    )
  },

  AddUpdateStudent: (req, callback) => {
    addUpdateStudent(
      req,
      (res) => {
        // dispatcher.dispatch({
        //   actionType: req.ID > 0 ? StudentConstant.UPDATE : StudentConstant.ADD,
        //   data: res.data,
        // })
        callback(res)
      },
      null,
    )
  },

  GetStudentFamilyMembers: (id, callback) => {
    getStudentFamilyMembers(
      id,
      (res) => {
        // dispatcher.dispatch({
        //   actionType: StudentConstant.GETFAMILYMEMBERS,
        //   data: res.data,
        // }) 
        callback(res)
      },
      null,
    )
  },

  addFamilyMember: (req, callback) => {
    addFamilyMember(
      req,
      (res) => {
        // dispatcher.dispatch({
        //   actionType: StudentConstant.ADDFAMILYMEMBER,
        //   data: res.data,
        // })
        callback(res)
      },
      null,
    )
  },

  UpdateDeleteFamilyMember: (req, callback) => {
    updateDeleteFamilyMember(req, (res) => {
      // dispatcher.dispatch({
      //   actionType:
      //     req.method === 'PUT'
      //       ? StudentConstant.UPDATEFAMILYMEMBER
      //       : StudentConstant.DELETEFAMILYMEMBER,
      //   data: res.data,
      // })
      callback(res)
    })
  },
  UpdateFamilyMemberNationality: (req) => {
    updateFamilyMemberNationality(req, (res) => {
      dispatcher.dispatch({
        actionType: StudentConstant.UPDATEFAMILYMEMBERNATIONALITY,
        data: res.data,
      })
    })
  },
}
