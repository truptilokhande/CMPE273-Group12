/* eslint-disable camelcase */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import connection from "../../config.json";
import {
  signupSuccess,
  signinsuccess,
  getAllTagsSuccess,
  // setUser,
} from "../actions/actions";

export const signup = (newUser) => (dispatch) =>
  axios
    .post(`${connection.connectionURL}/api/user/register`, newUser)
    .then((res) => {
      // set the jwt token
      localStorage.setItem("token", res.data.data.token);
      // store user details into the store
      dispatch(signupSuccess(res.data.data));
      // redirect to homepage
      window.location.href = "/homepage";
    })
    .catch((err) => {
      throw err;
    });

export const signin = (user) => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .post(`${connection.connectionURL}/api/user/login`, user)
    .then((res) => {
      // storing user id and authentication status in local storage
      localStorage.setItem("token", res.data.data.token);

      dispatch(signinsuccess(res.data.data));
      // redirect to homepage
      window.location.href = "/homepage";
    })
    .catch((err) => {
      throw err;
    });
};

export const getTags = () => (dispatch) => {
  axios.defaults.withCredentials = true;
  axios
    .get(`${connection.connectionURL}/api/tag/getAlltags`)
    .then((res) => {
      dispatch(getAllTagsSuccess(res.data.result));
    })
    .catch((err) => {
      throw err;
    });
};
