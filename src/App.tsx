import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Action} from "redux";
import {Home} from "./Home";
import {Blog} from "./Blog";
import {Math} from "./Math"
import './App.css';


export type NavigationState = string;
interface NavigationAction extends Action<string> { target: string };

const content = {
    Home: <Home/>,
    Bloard: <Blog/>,
    Math: <Math/>
};

interface Props {
    style:  React.CSSProperties;
    onClick: (event :React.MouseEvent<HTMLButtonElement>)  => void;
    navigationState: NavigationState;
    content: {[index: string]: any};
}


const AppComponent = (props: Props) => <>
    <div style={props.style}>
        <h2 className="title">jerry.fyi</h2>
        <div className="navigation">
            {Object.keys(props.content).map((value, index) => {
                return <button key={index} onClick={props.onClick}>{value}</button>;
            })}
        </div>
    </div>
    {props.content[props.navigationState]}
</>;

export const navigationReducer =
    (state: NavigationState | undefined = Object.keys(content)[0],
     action: NavigationAction) : NavigationState => {
        return action.type === 'NAVIGATE' ? action.target : state;
};


function mapStateToProps(state: State) {
    return {
        style: state.style.navigation,
        navigationState: state.nav.toString(),
        content: content
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