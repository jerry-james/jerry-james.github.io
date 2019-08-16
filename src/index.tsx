import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import {State} from "./State";
import {rootReducer} from "./RootReducer";

const sideBar : React.CSSProperties = {
    position: "fixed",
    zIndex:1000,
    top:"0",
    left:"0",
    width:160
};

const mainBar : React.CSSProperties = {
    marginLeft:160
};

const preloadedState : State = {
    style: {
        navigation: sideBar,
        main: mainBar
    }
};
const store = createStore(rootReducer, preloadedState);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
