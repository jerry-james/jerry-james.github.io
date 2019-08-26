import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Loader} from "./loader";
import vshad from "./vshader.glsl";
import fshad from "./fshader.glsl";
import {Matrix4} from "./matrix";

interface Props {
    style: React.CSSProperties;
}

export class FireComponent extends React.Component<Props> {
    private readonly canvas: React.RefObject<HTMLCanvasElement>;
    private gl: WebGLRenderingContext | null;
    private readonly _loader: Loader;

    constructor(props : Props) {
        super(props);
        this.canvas = React.createRef();
        this.gl = null;
        this._loader = new Loader();
    }

    componentDidMount(): void {
        if(this.canvas.current) {
            this.gl = this.canvas.current.getContext("webgl");
            if(this.gl) {
                console.log(vshad)
                if (!this._loader.initShaders(this.gl, vshad, fshad)) {
                    console.log("Failed to init");
                } else {
                    this.renderWebgl();
                }

            }
        }
    }

    renderWebgl() {
        if(this.gl && this._loader.program) {
            let gl = this.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            let u_modelMatrix = gl.getUniformLocation(this._loader.program, 'u_ModelMatrix');
            let u_viewMatrix = gl.getUniformLocation(this._loader.program, 'u_ViewMatrix');
            let u_projMatrix = gl.getUniformLocation(this._loader.program, 'u_ProjMatrix');
            let viewMatrix = new Matrix4();

            viewMatrix.setLookAt(0.0,
                                 0.0,
                                 10.00,
                                 0, 0, 0,
                                 0 , 1, 0);
            gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);

            let modelMatrix = new Matrix4();
            modelMatrix.translate(0,0,-2);

            gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);

            let projMatrix = new Matrix4();
            projMatrix.setPerspective(30, 640.0/480.0, 1, 100);
            gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements);

            let u_Color = gl.getUniformLocation(this._loader.program, 'u_Color');
            gl.uniform4fv(u_Color, new Float32Array([1.0, 0.0, 0.0, 1.0]));


            let vertices = new Float32Array(
                [
                    0.0,0.0,0.0,
                    0.25, 0.25,0.0]);
            let vertexBuffer = gl.createBuffer();

            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            let a_Position = gl.getAttribLocation(this._loader.program, 'a_Position');
            gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);

            gl.drawArrays(gl.LINES, 0, 2);

        }
    }

    render() {

        return <>
            <div style={this.props.style}>
                <canvas width="640"
                        height="480"
                        ref={this.canvas}/>
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