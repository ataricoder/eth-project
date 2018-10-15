import { userSignup, userLogin } from "../../utils/data/API";

export function signup(user) {
  return dispatch => {
    return userSignup(user)
      .then(response => {
        dispatch(signupSuccess(response.data));
      })
      .catch(error => {
        console.log(error.response.data.errors)
        dispatch(signupError(error.response.data.errors))
      })
  };
}

export function login(user) {
  return dispatch => {
    return userLogin(user)
      .then(response => {
        dispatch(loginSuccess(response.data));
      })
      .catch(error => {
        dispatch(loginError(error.response.data))
      });
  };
}

export const signupSuccess = data => ({
    type: "USER_SIGNUP_SUCCESS",
    payload: data,
});

export const signupError = error => ({
    type: "USER_SIGNUP_FAILURE",
    payload: error,
    success: false
});

export const loginSuccess = data => ({
    type: "USER_LOGIN_SUCCESS",
    payload: data,
});

export const loginError = error => ({
    type: "USER_LOGIN_FAILURE",
    payload: error,
    success: false
});

export const logout = () => ({
    type: "USER_LOGOUT"
});
