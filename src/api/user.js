import axios from "axios";

const URL = import.meta.env.VITE_APP_BACKEND;
export const getUser = (userid) => {
   return axios.get(`${URL}/${userid}`);
};
export const postUser = (body) => {
   return axios.post(URL, body);
};
export const delUser = (userid) => {
   return axios.delete(`${URL}/${userid}`);
};
