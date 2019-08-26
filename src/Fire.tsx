import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Loader} from "./loader";
import vshad from "./vshader.glsl";
import fshad from "./fshader.glsl";

interface Props {
    style: React.CSSProperties;
}

export class FireComponent extends React.Component<Props> {
    private readonly canvas: React.RefObject<HTMLCanvasElement>;
    private gl: WebGLRenderingContext | null;
    private readonly loader: Loader;

    constructor(props : Props) {
        super(props);
        this.canvas = React.createRef();
        this.gl = null;
        this.loader = new Loader();
    }

    componentDidMount(): void {
        if(this.canvas.current) {
            this.gl = this.canvas.current.getContext("webgl");
            if(this.gl) {
                console.log(vshad)
                if (!this.loader.initShaders(this.gl, vshad, fshad)) {
                    console.log("Failed to init");
                }
            }
        }
    }

    render() {

        return <>
            <div style={this.props.style}>
                <canvas ref={this.canvas}/>
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

export const Fire = connect(
    mapStateToProps,
    mapDispatchToProps)(FireComponent);