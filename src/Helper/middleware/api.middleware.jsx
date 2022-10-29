import axios from "axios";

export const apiMiddleware = (props) => {
  const { data, onSuccess, url, method } = props;

  axios({
    method: method,
    url: `http://localhost:8088/api/${url}`,
    data: data ? data : null,
  })
    .then((response) => {
      if (response.data) onSuccess(response);
    })
    .catch((error) => {
      if (!error?.response) console.warn(error);
      else {
      }
    });
};
