import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";

interface Props {
    style:  React.CSSProperties;
}

export class HomeComponent extends React.Component<Props, {time: number}> {

    constructor(props : Props) {
        super(props);
        this.interval = 0;
        this.state = {time: 0};
    }

    timer = () => {
        this.setState({time: Date.now()});
    };

    private interval: number;


    componentDidMount(): void {
        this.interval = window.setInterval(this.timer, 500);
    }
    componentWillUnmount(): void {
        window.clearInterval(this.interval)
    }

    render() {
        return <div></div>
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

export const Home: React.ComponentClass<JSX.LibraryManagedAttributes<HomeComponent, any & {}>> & any & { WrappedComponent: HomeComponent } = connect(
    mapStateToProps,
    mapDispatchToProps)(HomeComponent);