import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Home} from "./Home";
import {Blog} from "./Blog";

interface Props {
    style:  React.CSSProperties;
    content: string;
}

export class MainContentComponent extends React.Component<Props> {
    render() {
        if(this.props.content === 'Home') {
            return <Home/>
        }
        if(this.props.content === 'Blog') {
            return <Blog/>
        }
        return <>
            <div style={this.props.style}>
                hmm...
            </div>
        </>;
    }
}

function mapDispatchToProps() {
    return {};
}

function mapStateToProps(state: State) : Props {
    return {
        style: state.style.main,
        content: state.nav.toString()
    }
}

export const MainContent = connect(
    mapStateToProps,
    mapDispatchToProps)(MainContentComponent);