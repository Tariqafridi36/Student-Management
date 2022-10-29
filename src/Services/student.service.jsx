import axios from "axios";
import { apiMiddleware } from "../Helper/middleware/api.middleware";

export const getStudentData = (data, onSuccess, onError) => {
  const payload = {
    url: "students",
    data: data,
    method: "GET",
    onSuccess: onSuccess,
  };
  apiMiddleware(payload);
};

export const addUpdateStudent = (data, onSuccess, onError) => {
  const methodType = data.ID > 0 ? "PUT" : "POST";
  const url = data.ID > 0 ? `students/${data.ID}` : "students";
  const payload = {
    url: url,
    data: data,
    method: methodType,
    onSuccess: onSuccess,
  };
  apiMiddleware(payload);
};
