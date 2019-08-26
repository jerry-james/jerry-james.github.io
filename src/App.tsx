import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Action} from "redux";
import {Home} from "./Home";
import {Blog} from "./Blog";
import {Math} from "./Math"
import './App.css';
import {Fire} from "./Fire";


export type NavigationState = string;
interface NavigationAction extends Action<string> { target: string };

const contents : {
    [index : string] : any
} = {
    Fire: <Fire />,
    Home: <Home />,
    Blog: <Blog />,
    Math: <Math />
};

interface Props {
    style:  React.CSSProperties;
    onClick: (event :React.MouseEvent<HTMLButtonElement>)  => void;
    navigationState: NavigationState;
    navContent: string[];
    mainContent: React.Component;
}

const AppComponent = (props: Props) => {
    return <>
        <div style={props.style}>
            <h2 className="title">jerry.fyi</h2>
            <div className="navigation">
                {props.navContent
                      .map((value, index) => {
                          return <button key={index}
                                         onClick={props.onClick}>{value}</button>;
                      })
                }
            </div>
        </div>
        {
            props.mainContent
        }
    </>;
};

export const navigationReducer =
    (state: NavigationState | undefined = Object.keys(contents)[0],
     action: NavigationAction) : NavigationState => {
        return action.type === 'NAVIGATE' ? action.target : state;
};


function mapStateToProps(state: State) {
    return {
        style: state.style.navigation,
        navigationState: state.nav.toString(),
        navContent: Object.keys(contents),
        mainContent: contents[state.nav.toString()],
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            dispatch({type: 'NAVIGATE', target: (event.target as HTMLButtonElement).innerText});
        }
    }
};

export const App = connect(
    mapStateToProps,
    mapDispatchToProps)(AppComponent);