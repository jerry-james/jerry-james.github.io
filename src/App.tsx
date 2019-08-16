import React, {Component} from 'react';
import './App.css';
import {Navigation} from "./Navigation";
import {MainContent} from "./MainContent";
import {Home} from "./Home";
import {Blog} from "./Blog";


class App extends Component {
    render() {
        return <>
            <Navigation />
            <MainContent />
        </>;
    }
}

export default App;
