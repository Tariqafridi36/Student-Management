import { apiMiddleware } from "../Helper/middleware/api.middleware";

export const getStudentFamilyMembers = (id, onSuccess) => {
  const paylod = {
    url: `Students/${id}/FamilyMembers`,
    method: "GET",
    onSuccess: onSuccess,
  };
  apiMiddleware(paylod);
};

export const addFamilyMember = (data, onSuccess) => {
  const paylod = {
    url: `Students/${data.sid}/FamilyMembers`,
    data: data,
    method: "POST",
    onSuccess: onSuccess,
  };
  apiMiddleware(paylod);
};

export const updateDeleteFamilyMember = (data, onSuccess) => {
  const payload = {
    url: `familymembers/${data.ID}`,
    data: data,
    method: data.method,
    onSuccess: onSuccess,
  };
  apiMiddleware(payload);
};

export const updateFamilyMemberNationality = (data, onSuccess) => {
  const payload = {
    url: `familymembers/${data.ID}/Nationality/${data.nid}`,
    data: data,
    method: data.method,
    onSuccess: onSuccess,
  };
  apiMiddleware(payload);
};
