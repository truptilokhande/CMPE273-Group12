export const signupSuccess = (value) => ({
  type: "SIGN_UP_SUCCESS",
  payload: value,
});

export const signinsuccess = (value) => ({
  type: "SIGN_IN_SUCCESS",
  payload: value,
});

export const setUser = (value) => ({
  type: "SET_USER",
  payload: value,
});

export const getAllTagsSuccess = (value) => ({
  type: "SET_TAGS_IN_STORE",
  payload: value,
});

export const getUserSuccess = (value) => ({
  type: "SET_USER_IN_STORE",
  payload: value,
});

export const increasereputation = (value) => ({
  type: "INCREMENT_REPUTATION",
  payload: value,
});

export const decrementreputation = (value) => ({
  type: "DECREMENT_REPUTATION",
  payload: value,
});