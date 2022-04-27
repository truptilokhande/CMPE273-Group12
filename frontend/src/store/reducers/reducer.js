/* eslint-disable default-param-last */
const initialState = {
  user: null,
  isAuthenticated: false,
  tags: null,
};

const reducer = (state = initialState, action) => {
  if (action.type === "SIGN_UP_SUCCESS") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload,
    };
  }
  if (action.type === "SIGN_IN_SUCCESS") {
    return {
      ...state,
      isAuthenticated: true,
      user: action.payload,
    };
  }

  if (action.type === "SET_USER") {
    return {
      ...state,
      user: action.payload,
    };
  }

  if (action.type === "SET_TAGS_IN_STORE") {
    return {
      ...state,
      tags: action.payload,
    };
  }
  if (action.type === "SET_USER_IN_STORE") {
    return {
      ...state,
      tags: action.payload,
    };
  }

  return state;
};

export default reducer;
