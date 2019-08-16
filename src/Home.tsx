import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";

interface Props {
    style:  React.CSSProperties;
}

export class HomeComponent extends React.Component<Props> {
    render() {
        return <>
            <div style={this.props.style}>
                <h2>Home!</h2>
            </div>
        </>;
    }
}



function mapDispatchToProps() {
    return {};
}


function mapStateToProps(state: State) {
    return {
        style: state.style.main
    }
}

export const Home = connect(
    mapStateToProps,
    mapDispatchToProps)(HomeComponent);