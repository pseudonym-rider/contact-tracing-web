import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';

import reportWebVitals from './reportWebVitals';
import store from "./common/store";
import SiteMain from './main/container/SiteMain';
import LoginMain from './login/container/LoginMain';
import SignupMain from './login/container/SignupMain';
import LookupMain from './lookup/container/LookupMain';

import 'bootstrap/dist/css/bootstrap.min.css'; 
import './css/index.css';

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'; // react-bootstrap-table-next

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SiteMain} />
            <Route path="/login" component={LoginMain} />
            <Route path="/signup" component={SignupMain} />
            <Route path="/lookup" component={LookupMain} />
            {/* <Route path="/lookup" component={FriendMain} /> */}
            {/* <LoginMain />
            <LookupMain /> */}
          </Switch>
        </BrowserRouter>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
