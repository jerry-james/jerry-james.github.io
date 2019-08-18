import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";

interface Props {
    style:  React.CSSProperties;
}

export class BlogComponent extends React.Component<Props> {
    render() {
        return <>
            <div style={this.props.style}>
            <h1>it's saturdayn ight baby!</h1>
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

export const Blog = connect(
    mapStateToProps,
    mapDispatchToProps)(BlogComponent);