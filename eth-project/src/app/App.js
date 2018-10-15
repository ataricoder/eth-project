import React, { Component } from "react";
import "./App.css";
import Home from "./home/Home";
import About from "./about/About";
import Wallet from "./wallet/Wallet";
import Explore from "./explore/Explore";
import SingleItem from "./explore/SingleItem";
import Campaign from "./campaign/Campaign";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import history from "../utils/history";
import configureStore from "../store/configureStore";
import throttle from "lodash/throttle";

import { loadState, saveState } from "../utils/localStorage";

const presistedState = loadState();

const store = configureStore(presistedState);

store.subscribe(throttle(() => {
  saveState({
    auth: store.getState().auth
  })
}, 1000));

class App extends Component {
  render() {
    return <Provider store={store}>
        <div className="App">
          <ConnectedRouter history={history}>
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/explore" component={Explore} />
              <Route path="/explore/:id" component={SingleItem} />
              <Route path="/campaign" component={Campaign} />
              <Route path="/about" component={About} />
              <Route path="/wallet" component={Wallet} />
            </div>
          </ConnectedRouter>
        </div>
      </Provider>;}
}

export default App;
