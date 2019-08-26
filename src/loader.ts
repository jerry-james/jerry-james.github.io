export class Loader {
    constructor() {
        this._program = null;
    }
    get program(): WebGLProgram | null {
        return this._program;
    }
    private _program: WebGLProgram | null;
    public initShaders(gl : WebGLRenderingContext, vshader: string, fshader : string) {
        let program = this.createProgram(gl, vshader, fshader);
        if (!program) {
            console.log('Failed to create program');
            return false;
        }

        gl.useProgram(program);
        this._program = program;

        return true;
    }
    /**
     * Create a shader object
     * @param gl GL context
     * @param type the type of the shader object to be created
     * @param source shader program (string)
     * @return created shader object, or null if the creation has failed.
     */
    public loadShader(gl : WebGLRenderingContext,
                      type : GLenum,
                      source : string) {
        let shader = gl.createShader(type);
        if (shader == null) {
            console.log('unable to create shader');
            return null;
        }

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        let compiled = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!compiled) {
            let error = gl.getShaderInfoLog(shader);
            console.log('Failed to compile shader: ' + error);
            gl.deleteShader(shader);
            throw new Error();
        }

        return shader;
    }

    /**
     * Create the linked program object
     * @param gl GL context
     * @param vshader a vertex shader program (string)
     * @param fshader a fragment shader program (string)
     * @return created program object, or null if the creation has failed
     */
    public createProgram(gl : WebGLRenderingContext, vshader : string, fshader : string) {
        // Create shader object
        let vertexShader = this.loadShader(gl, gl.VERTEX_SHADER, vshader);
        let fragmentShader = this.loadShader(gl, gl.FRAGMENT_SHADER, fshader);
        if (!vertexShader || !fragmentShader) {
            return null;
        }

        // Create a program object
        let program = gl.createProgram();
        if (!program) {
            return null;
        }

        // Attach the shader objects
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);

        // Link the program object
        gl.linkProgram(program);

        // Check the result of linking
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
            var error = gl.getProgramInfoLog(program);
            console.log('Failed to link program: ' + error);
            gl.deleteProgram(program);
            gl.deleteShader(fragmentShader);
            gl.deleteShader(vertexShader);
            return null;
        }
        return program;
    }

}
