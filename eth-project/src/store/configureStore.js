import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "react-router-redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import history from "../utils/history";
import thunk from "redux-thunk";
import promiseMiddleware from "redux-promise-middleware";

import rootReducer from "../reducers/rootReducer";

export default function configureStore(preloadedState) {

  const middlewares = [
    thunk,
    promiseMiddleware(),
    routerMiddleware(history)
  ];

  const middlewareEnhancer = applyMiddleware(...middlewares);

  const storeEnhancers = [middlewareEnhancer];

  const composedEnhancer = composeWithDevTools(...storeEnhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancer);

  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("../reducers/rootReducer", () => {
        const newRootReducer = require("../reducers/rootReducer").default;
        store.replaceReducer(newRootReducer);
      });
    }
  }

  return store;
}
