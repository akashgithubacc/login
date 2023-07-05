import axios from "axios";
const url = "http://localhost:5000";

export const sendSigninData = (signInData) => {
  return axios.post(`${url}/signin`, { signInData });
};

export const sendLoginData = (logInData) => {
  return axios.post(`${url}/login`, { logInData });
};

export const sendCustomerData = (customerData) => {
  return axios.post(`${url}/customers`, { customerData });
};

export const getAdminData = () => {
  return axios.get(`${url}/admin`);
};
