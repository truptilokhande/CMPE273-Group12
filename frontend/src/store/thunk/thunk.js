/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from "axios";

import connection from "../../config.json";
import {
  signupSuccess,
  signinsuccess,
  getAllTagsSuccess,
  getUserSuccess,
  // setUser,
} from "../actions/actions";

export const signup = (newUser) => (dispatch) =>
  new Promise(async (resolve, reject) => {
    axios
      .post(`${connection.connectionURL}/api/user/register`, newUser)
      .then((res) => {
        resolve();
        // set the jwt token
        localStorage.setItem("token", res.data.data.token);
        // store user details into the store
        dispatch(signupSuccess(res.data.data));
        // redirect to homepage
        window.location.href = "/homepage";
      })
      .catch((err) => {
        document.querySelector(".sign-up-error").style.display = "block";
        reject(err);
      });
  });

export const signin = (user) => (dispatch) => {
  new Promise(async (resolve, reject) => {
    axios.defaults.withCredentials = true;
    axios
      .post(`${connection.connectionURL}/api/user/login`, user)
      .then((res) => {
        resolve();
        // storing user id and authentication status in local storage
        localStorage.setItem("token", res.data.data.token);

        dispatch(signinsuccess(res.data.data));
        // redirect to homepage
        window.location.href = "/homepage";
      })
      .catch((err) => {
        document.querySelector(".sign-in-error").style.display = "block";
        reject(err);
      });
  });
};

export const getTags = () => (dispatch) => {
  const token = localStorage.getItem("token");
  axios.defaults.withCredentials = true;
  axios
    .get(`${connection.connectionURL}/api/tag/getAlltags`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch(getAllTagsSuccess(res.data.tags));
    })
    .catch((err) => {
      throw err;
    });
};

export const getUser = (id) => (dispatch) => {
  const token = localStorage.getItem("token");
  axios.defaults.withCredentials = true;
  axios
    .get(`${connection.connectionURL}/api/user/getUser/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      dispatch(getUserSuccess(res.data.user));
    })
    .catch((err) => {
      throw err;
    });
};
