import {
  getStudentData,
  addUpdateStudent,
} from "../../Services/student.service";
import { dispatcher } from "../../Helper/middleware/appDispatcher";
import { StudentConstant } from "../../Helper/constants/student.constanct";
import {
  addFamilyMember,
  getStudentFamilyMembers,
  updateDeleteFamilyMember,
  updateFamilyMemberNationality,
} from "../../Services/familymember.service";

export const studentAction = {
  getStudent: (req) => {
    getStudentData(
      req,
      (res) => {
        dispatcher.dispatch({
          actionType: StudentConstant.GET,
          data: res.data,
        });
      },
      null
    );
  },

  AddUpdateStudent: (req) => {
    addUpdateStudent(
      req,
      (res) => {
        dispatcher.dispatch({
          actionType: req.ID > 0 ? StudentConstant.UPDATE : StudentConstant.ADD,
          data: res.data,
        });
      },
      null
    );
  },

  GetStudentFamilyMembers: (id) => {
    getStudentFamilyMembers(
      id,
      (res) => {
        dispatcher.dispatch({
          actionType: StudentConstant.GETFAMILYMEMBERS,
          data: res.data,
        });
      },
      null
    );
  },

  addFamilyMember: (req) => {
    addFamilyMember(
      req,
      (res) => {
        dispatcher.dispatch({
          actionType: StudentConstant.ADDFAMILYMEMBER,
          data: res.data,
        });
      },
      null
    );
  },

  UpdateDeleteFamilyMember: (req) => {
    updateDeleteFamilyMember(req, (res) => {
      dispatcher.dispatch({
        actionType:
          req.method === "PUT"
            ? StudentConstant.UPDATEFAMILYMEMBER
            : StudentConstant.DELETEFAMILYMEMBER,
        data: res.data,
      });
    });
  },
  UpdateFamilyMemberNationality: (req) => {
    updateFamilyMemberNationality(req, (res) => {
      dispatcher.dispatch({
        actionType: StudentConstant.UPDATEFAMILYMEMBERNATIONALITY,
        data: res.data,
      });
    });
  },
};
