import React from "react";
import ReactDOM from "react-dom";
import { Router, Route, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';
import App from "./components/App";
import Form from "./components/Form";
import MakePayment from "./components/MakePayment";
import AddCard from "./components/AddCard";
import PaymentForm from "./components/PaymentForm";
injectTapEventPlugin();


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}/>
    <Route path="/about" component={AddCard}/>
    
  </Router>
), document.getElementById('app'))

