import axios from 'axios';
const apiEndpoint = 'http://34.202.164.1';

const genSuccessResponse = (response) => {
  return {error: false, response};
};

const genFailureResponse = (err) => {
  return {error: true, err};
};

export const signUpApi = (data) => {
  return axios
    .post(`${apiEndpoint}/api/v1/users/register`, data)
    .then((response) => genSuccessResponse(response))
    .catch((err) => genFailureResponse(err));
};

export const loginApi = (data) => {
  return axios
    .post(`${apiEndpoint}/api/v1/users/login`, data)
    .then((response) => genSuccessResponse(response))
    .catch((err) => genFailureResponse(err));
};
