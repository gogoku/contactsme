import axios from 'axios';
const apiEndpoint = 'http://34.202.164.1';
import {ToastAndroid} from 'react-native';

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  }
};

const genSuccessResponse = (response) => {
  return {error: false, response};
};

const genFailureResponse = (err) => {
  ToastAndroid.show('Failed Request', ToastAndroid.SHORT);
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

export const fetchContacts = (range) => {
  return axios
    .get(`${apiEndpoint}/api/v1/contacts/contact/timeline/${range}`)
    .then((response) => genSuccessResponse(response))
    .catch((err) => genFailureResponse(err));
};

export const addContact = (data) => {
  return axios
    .post(`${apiEndpoint}/api/v1/contacts/contact`, data)
    .then((response) => genSuccessResponse(response))
    .catch((err) => genFailureResponse(err));
};
