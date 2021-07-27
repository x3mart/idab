import React from "react";
import ReactDOM from "react-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./index.css";
import App from "./App";
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';


const customHistory = createBrowserHistory();

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router history={customHistory}>
    <App />
  </Router>,
  document.getElementById('root'));

registerServiceWorker();