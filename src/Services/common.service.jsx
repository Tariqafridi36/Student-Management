import { apiMiddleware } from "../Helper/middleware/api.middleware";

export const getNationality = (data, onSuccess) => {
  const paylod = {
    url: "Nationalities",
    data: data,
    method: "GET",
    onSuccess: onSuccess,
  };
  apiMiddleware(paylod);
};

export const Set_Get_StudentNationality = (data, onSuccess) => {
  const url =
    data.method === "GET"
      ? `Students/${data.sid}/Nationality`
      : `Students/${data.sid}/Nationality/${data.nid}`;
  const paylod = {
    url: url,
    data: data,
    method: data.method,
    onSuccess: onSuccess,
  };
  apiMiddleware(paylod);
};
