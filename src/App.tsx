import React, {Component} from 'react';
import './App.css';
import {Navigation} from "./Navigation";
import {MainContent} from "./MainContent";


class App extends Component {
    render() {
        return <>
            <Navigation />
            <MainContent />
        </>;
    }
}

export default App;
