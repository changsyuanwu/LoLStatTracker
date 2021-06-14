import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { createStore } from 'redux';
import roots from './Components/Fields/states';

const state_reducer = createStore(roots);

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
      <Provider store={state_reducer}>
        <App />
        </Provider>
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
