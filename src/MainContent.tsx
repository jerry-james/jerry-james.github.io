import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";

interface Props {
    style:  React.CSSProperties;
    content: string;
}

export class MainContentComponent extends React.Component<Props> {
    render() {
        return <>
            <div style={this.props.style}>
                <h2>{this.props.content}</h2>
            </div>
        </>;
    }
}

function mapDispatchToProps() {
    return {};
}

function mapStateToProps(state: State) {
    return {
        style: state.style.main,
        content: state.nav.toString()
    }
}

export const MainContent = connect(
    mapStateToProps,
    mapDispatchToProps)(MainContentComponent);