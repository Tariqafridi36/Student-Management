import { CommonConstant } from "../../Helper/constants/common.constant";
import { dispatcher } from "../../Helper/middleware/appDispatcher";
import {
  getNationality,
  Set_Get_StudentNationality,
} from "../../Services/common.service";

export const commonAction = {
  GetNationality: (req) => {
    getNationality(
      req,
      (res) => {
        dispatcher.dispatch({
          actionType: CommonConstant.NATIONALITY,
          data: res.data,
        });
      },
      null
    );
  },

  SetGetStudentNationality: (req) => {
    Set_Get_StudentNationality(
      req,
      (res) => {
        debugger;
        dispatcher.dispatch({
          actionType:
            req.method === "GET"
              ? CommonConstant.GETNATIONALITY
              : CommonConstant.SETNATIONALITY,
          data: res.data,
        });
      },
      null
    );
  },
};
