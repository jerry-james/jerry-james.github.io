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
        switch (this.props.content) {
            case 'Home':
                return <Home/>;
            case 'Blog':
                return <Blog/>;
            default:
                return <></>;
        }
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