import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Action} from "redux";

export type NavigationState = string;
interface NavigationAction extends Action<string> { target: string };

interface Props {
    style:  React.CSSProperties;
    onClick: (event :React.MouseEvent<HTMLButtonElement>)  => void;
}

export class NavigationComponent extends React.Component<Props> {
    render() {
        return <>
            <div style={this.props.style}>
                <h2>Navigation</h2>
                <button onClick={this.props.onClick}>Home</button>
                <button onClick={this.props.onClick}>Blog</button>
            </div>
        </>;
    }
}

export const navigationReducer = (state: NavigationState | undefined = 'Home',
                             action: NavigationAction) => {
    if(action.type === 'NAVIGATE') {
        return action.target;
    } else {
        return state;
    }
};

function mapStateToProps(state: State) {
    return {
        style: state.style.navigation
    }
}



function makeAction(target: string): NavigationAction {
    return {type: 'NAVIGATE', target: target};
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