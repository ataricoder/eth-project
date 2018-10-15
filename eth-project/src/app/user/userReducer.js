const initialState = {
  message: null,
  success: null
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_SIGNUP_SUCCESS":
      return { ...state, message: action.payload.message, success: action.payload.success };
    case "USER_SIGNUP_FAILURE":
      return { ...state, message: action.payload, success: action.success };
    case "USER_LOGIN_SUCCESS":
      return { ...state, message: action.payload.message, success: action.payload.success };
    case "USER_LOGIN_FAILURE":
      return { ...state, message: action.payload, success: action.success };
    default:
      return state;
  }
}
