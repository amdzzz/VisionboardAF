import React from "react";
import ReactDOM from "react-dom";


import createStore from "./app/store";
import App from './app/App';

const app = document.getElementById('app');
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)

ReactDOM.render(
  <App store={store}/>
,app);
