import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Loader} from "./loader";
import vshad from "./vshader.glsl";
import fshad from "./fshader.glsl";
import {Matrix4, Vector3} from "./matrix";
import {Hexagon} from "./Hexagon";

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
        let v0 = new Vector3(0.0, 0.0, 0.0);
        let v1 = new Vector3(Math.cos(1*(Math.PI/3)), Math.sin(1*(Math.PI/3)), 0.0);
        let v2 = new Vector3(Math.cos(2*(Math.PI/3)), Math.sin(2*(Math.PI/3)), 0.0);
        let v3 = new Vector3(Math.cos(3*(Math.PI/3)), Math.sin(3*(Math.PI/3)), 0.0);
        let v4 = new Vector3(Math.cos(4*(Math.PI/3)), Math.sin(4*(Math.PI/3)), 0.0);
        let v5 = new Vector3(Math.cos(5*(Math.PI/3)), Math.sin(5*(Math.PI/3)), 0.0);
        let v6 = new Vector3(Math.cos(6*(Math.PI/3)), Math.sin(6*(Math.PI/3)), 0.0);
        let v7 = new Vector3(Math.cos(7*(Math.PI/3)), Math.sin(7*(Math.PI/3)), 0.0);

        let vertices = new Float32Array(
            [
                ...v0.elements(),
                ...v1.elements(),
                ...v2.elements(),
                ...v3.elements(),
                ...v4.elements(),
                ...v5.elements(),
                ...v6.elements(),
                ...v7.elements()
            ]);
        let viewMatrix = new Matrix4();
        viewMatrix.setLookAt(0.0,
                             0.0,
                             50.00,
                             0, 0, 0,
                             0 , 1, 0);



        let projMatrix = new Matrix4();
        projMatrix.setPerspective(30, 640.0/480.0, 1, 1000);

        if(this.gl && this._loader.program) {
            let gl = this.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            let u_modelMatrix = gl.getUniformLocation(this._loader.program, 'u_ModelMatrix');
            let u_viewMatrix = gl.getUniformLocation(this._loader.program, 'u_ViewMatrix');
            let u_projMatrix = gl.getUniformLocation(this._loader.program, 'u_ProjMatrix');

            //viewMatrix.rotate(30,0,0,1);

            gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements);
            gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);

            let HEX_BASIS = new Matrix4().set(new Float32Array(
                [
                    -1.5,Math.sqrt(3/4),0,0,
                    +1.5,Math.sqrt(3/4),0,0,
                    0,0,1,0,
                    0,0,0,1]));

            let vertexBuffer = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            let a_Position = gl.getAttribLocation(this._loader.program, 'a_Position');
            gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(a_Position);

            let hexagons : Hexagon[] = [
                new Hexagon(0, 0  ,[1.0, 0.0, 0.0, 1.0]),
                new Hexagon(0, 1  ,[0.0, 1.0, 0.0, 1.0]),
                new Hexagon(-1, 0 ,[0.0, 0.0, 1.0, 1.0]),
                new Hexagon(-1, -1,[0.5, 0.2, 0.5, 1.0]),
                new Hexagon(0, -1 ,[0.0, 1.0, 1.0, 1.0]),
                new Hexagon(1, 0  ,[1.0, 0.0, 1.0, 1.0]),
                new Hexagon(1, 1  ,[1.0, 1.0, 0.0, 1.0]),
            ];
            if(u_modelMatrix) {
                for(let h of hexagons) {
                    this.renderHexagonCell(HEX_BASIS, new Vector3(h.x1, h.x2, 0),gl, u_modelMatrix,
                                           h.color);
                }
            }

        }
    }

    private renderHexagonCell(HEX_BASIS : Matrix4, position : Vector3, gl : WebGLRenderingContext,
                      u_modelMatrix : WebGLUniformLocation, color : number[]) {
        let translation = HEX_BASIS.mulv3(position);
        let modelMatrix = new Matrix4().translate(translation.x, translation.y, -2);
        if (this._loader.program) {
            gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
            let u_Color = gl.getUniformLocation(this._loader.program, 'u_Color');
            gl.uniform4fv(u_Color, new Float32Array(color));
            gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
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