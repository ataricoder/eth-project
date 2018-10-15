const initialState = {
  token: "",
  isLogin: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case "USER_LOGIN_SUCCESS":
      return {
        token: action.payload.token, 
        isLogin: true,
        userInfo: {
          userId: action.payload.user.id,
          firstName: action.payload.user.firstName,
          lastName: action.payload.user.lastName
        }
      };
    case "USER_LOGOUT":
      return {
        token: "", 
        isLogin: false
      };
    default:
      return state;
  }
}
