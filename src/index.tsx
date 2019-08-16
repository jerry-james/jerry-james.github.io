import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from 'redux';
import {Provider} from "react-redux";
import {State} from "./State";
import {rootReducer} from "./RootReducer";

function getStyle(marginLeft: number): {
    navigation: React.CSSProperties;
    main: React.CSSProperties
} {
    return {
        navigation: {
            position: "fixed",
            zIndex: 1000,
            top: "0",
            left: "0",
            width: marginLeft
        },
        main: {
            marginLeft: marginLeft
        }
    };
}

const preloadedState : State = {
    style: getStyle(200)
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
