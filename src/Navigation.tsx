import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import { Action } from "redux";

interface NavigationState {

}
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

export const navigationReducer = (state: NavigationState | undefined = {},
                             action: Action) => {
    console.log(action);
    return state;
};

function mapStateToProps(state: State) {
    return {
        style: state.style.navigation
    }
}

const mapDispatchToProps = (dispatch : any) => {
    return {
        onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            let target: string = (event.target as HTMLButtonElement).innerText;

            dispatch({type: 'NAVIGATE', target: target});
        }
    }
};

export const Navigation = connect(
    mapStateToProps,
    mapDispatchToProps)(NavigationComponent);