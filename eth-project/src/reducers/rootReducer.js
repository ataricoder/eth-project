import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import exploreReducer from "../app/explore/exploreReducer";
import formReducer from "../app/campaign/formReducer";
import userReducer from "../app/user/userReducer";
import authReducer from "../app/user/authReducer";
import web3Reducer from "../utils/web3/Web3Reducer";

const rootReducer = combineReducers({
  items: exploreReducer,
  form: formReducer,
  router: routerReducer,
  user: userReducer,
  web3: web3Reducer,
  auth: authReducer
});

export default rootReducer;
