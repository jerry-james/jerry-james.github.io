import * as React from "react";
import {connect} from "react-redux";
import {State} from "./State";
import {Loader} from "./loader";
import vshad from "./vshader.glsl";
import fshad from "./fshader.glsl";
import {Matrix4, Vector3} from "./matrix";
import {Hexagon} from "./Hexagon";

let WIDTH = 1200;
let HEIGHT = 800;
interface Props {
    style: React.CSSProperties;
    hexagons: Hexagon[];
    reset: () => void;
    step: () => void;
}


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
let yy = 150;
let xx = -5;
viewMatrix.setLookAt(xx,
                     yy,
                     650.00,
                     xx, yy, 0,
                     0 , 1, 0);



let projMatrix = new Matrix4();
projMatrix.setPerspective(30, WIDTH/HEIGHT, 1, 1000);

let HEX_BASIS = new Matrix4().set(new Float32Array(
    [
        -1.5,Math.sqrt(3/4),0,0,
        +1.5,Math.sqrt(3/4),0,0,
        0,0,1,0,
        0,0,0,1]));


export class FireComponent extends React.Component<Props> {
    private readonly canvas: React.RefObject<HTMLCanvasElement>;
    private gl: WebGLRenderingContext | null;
    private readonly _loader: Loader;
    private interval: number | undefined;


    constructor(props : Props) {
        super(props);
        this.canvas = React.createRef();
        this.gl = null;
        this._loader = new Loader();
    }

    intervalHandler = () => {
        this.props.step();
    };

    componentDidMount(): void {
        this.interval = window.setInterval(this.intervalHandler, 10);
        if(this.canvas.current) {
            this.gl = this.canvas.current.getContext("webgl");
            if(this.gl) {
                console.log(vshad)
                if (!this._loader.initShaders(this.gl, vshad, fshad)) {
                    console.log("Failed to init");
                } else {
                    let gl = this.gl;
                    if(this._loader.program) {
                        let u_viewMatrix = gl.getUniformLocation(this._loader.program, 'u_ViewMatrix');
                        let u_projMatrix = gl.getUniformLocation(this._loader.program, 'u_ProjMatrix');

                        gl.uniformMatrix4fv(u_projMatrix, false, projMatrix.elements);
                        gl.uniformMatrix4fv(u_viewMatrix, false, viewMatrix.elements);

                        let vertexBuffer = gl.createBuffer();
                        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
                        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
                        let a_Position = gl.getAttribLocation(this._loader.program, 'a_Position');
                        gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);
                        gl.enableVertexAttribArray(a_Position);
                    }
                    this.renderWebgl();
                }

            }
        }
    }

    shouldComponentUpdate(nextProps: Readonly<Props>, nextState: Readonly<{}>, nextContext: any): boolean {
        return true;
    }

    componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
        this.renderWebgl();
    }

    componentWillUnmount(): void {
        window.clearInterval(this.interval)
    }

    renderWebgl() {
        if(this.gl && this._loader.program) {
            let gl = this.gl;
            gl.enable(gl.DEPTH_TEST);
            gl.clear(gl.DEPTH_BUFFER_BIT);
            gl.clearColor(1.0, 1.0, 1.0, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            let u_modelMatrix = gl.getUniformLocation(this._loader.program, 'u_ModelMatrix');

            if(u_modelMatrix) {
                for(let h of this.props.hexagons) {
                    let modelMatrix = new Matrix4()
                        .translatev3(HEX_BASIS.mulv3(new Vector3(h.x1, h.x2, -2)));
                    gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
                    let u_Color = gl.getUniformLocation(this._loader.program, 'u_Color');
                    gl.uniform4fv(u_Color, new Float32Array(h.color));
                    gl.drawArrays(gl.TRIANGLE_FAN, 0, 8);
                }
            }

        }
    }

    render() {
        return <>
            <div style={this.props.style}>
                <button onClick={this.props.reset}>reset</button>
                <br/>
                <canvas width={WIDTH}
                        height={HEIGHT}
                        ref={this.canvas}/>

            </div>
        </>;
    }
}


function mapDispatchToProps(dispatch : (p:any) => void) {
    return {
        reset: () => {
            dispatch({type: 'RESET'});
        },
        step: () => {
            dispatch({type: 'STEP'});
        }
    };
}


function mapStateToProps(state: State) {
    return {
        hexagons: state.hexagons,
        style: state.style.main
    }
}

export const Fire = connect(
    mapStateToProps,
    mapDispatchToProps)(FireComponent);