import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Action} from "redux";
import {Home} from "./Home";
import {Blog} from "./Blog";
import {Math} from "./Math"


export type NavigationState = string;
interface NavigationAction extends Action<string> { target: string };

interface Props {
    style:  React.CSSProperties;
    onClick: (event :React.MouseEvent<HTMLButtonElement>)  => void;
    navigationState: NavigationState;
    content: {[index: string]: any};
}

export class NavigationComponent extends React.Component<Props> {
    render() {
        return <>
            <div style={this.props.style}>
                <h2>Navigation</h2>
                {Object.keys(this.props.content).map((value, index) => {
                    return <button key={index} onClick={this.props.onClick}>{value}</button>;               })}
            </div>
            {this.props.content[this.props.navigationState]}
        </>;
    }
}

export const navigationReducer =
    (state: NavigationState | undefined = 'Home',
     action: NavigationAction) => {
    return action.type === 'NAVIGATE' ? action.target : state;
};

function makeAction(target: string): NavigationAction {
    return {type: 'NAVIGATE', target: target};
}

function mapStateToProps(state: State) {
    return {
        style: state.style.navigation,
        navigationState: state.nav.toString(),
        content: {
            Home: <Home/>,
            Blog: <Blog/>,
            Math: <Math/>
        }
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            dispatch(makeAction((event.target as HTMLButtonElement).innerText));
        }
    }
};

export const Navigation = connect(
    mapStateToProps,
    mapDispatchToProps)(NavigationComponent);