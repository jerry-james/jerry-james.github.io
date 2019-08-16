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
                <h2>Blog</h2>
            </div>
        </>;
    }
}



function mapDispatchToProps() {

}


function mapStateToProps(state: State) {
    return {
        style: state.style.main
    }
}

export const Blog = connect(
    mapStateToProps,
    mapDispatchToProps)(BlogComponent)