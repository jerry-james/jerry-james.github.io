import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Action} from "redux";
import {Home} from "./Home";
import {Blog} from "./Blog";
import {Math} from "./Math"


export type NavigationState = string;
interface NavigationAction extends Action<string> { target: string };
const type = 'NAVIGATE';

interface Props {
    style:  React.CSSProperties;
    onClick: (event :React.MouseEvent<HTMLButtonElement>)  => void;
    navigationState: NavigationState;
}

const content : {
    [index: string]: any
} = {
    Home: <Home />,
    Blog: <Blog />,
    Math: <Math />
};

const defaultNavigationState = Object.keys(content)[0];

const MainContent = (props: { navigationState: string }) => content[props.navigationState];

export class NavigationComponent extends React.Component<Props> {
    render() {
        return <>
            <div style={this.props.style}>
                <h2>Navigation</h2>
                {Object.keys(content).map((value, index) => {
                    return <>
                        <button key={index} onClick={this.props.onClick}>{value}</button>
                        <br/>
                    </>;
                })}
            </div>
            <MainContent navigationState={this.props.navigationState}/>
        </>;
    }
}


export const navigationReducer =
    (state: NavigationState | undefined = defaultNavigationState,
     action: NavigationAction) => {
    return action.type === type ? action.target : state;
};

function mapStateToProps(state: State) {
    return {
        style: state.style.navigation,
        navigationState: state.nav.toString()
    }
}

function makeAction(target: string): NavigationAction {
    return {type: type, target: target};
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