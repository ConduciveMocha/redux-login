import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { NO_ERROR } from './constants/NoError'
import { Provider } from "react-redux";
import { createStore,applyMiddleware } from "redux";
import rootReducer from './reducers'
import createSageMiddleWare from "redux-saga";
import rootSaga from "./sagas";

const sagaMiddleware = createSageMiddleWare();


const store = createStore(rootReducer, applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)

console.log(store.getState())

ReactDOM.render(
    <Provider store={store}> <App /></Provider>,
     document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
