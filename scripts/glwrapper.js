export class Wrapper {
    constructor(gl) {
        this.gl = gl
    }

    createShader(type, data) {
        const gl = this.gl

        const types = {
            "vertex": gl.VERTEX_SHADER,
            "fragment": gl.FRAGMENT_SHADER,
        }

        const shader = gl.createShader(types[type])
        gl.shaderSource(shader, data)
        gl.compileShader(shader)

        const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if(sucess) {
            return shader
        }

        throw new Error(gl.getShaderInfoLog(shader))
    }

    createProgram(vertex, fragment) {
        const gl = this.gl
        const program = gl.createProgram()

        gl.attachShader(program, vertex)
        gl.attachShader(program, fragment)
        gl.linkProgram(program)

        const success = gl.getProgramParameter(program, gl.LINK_STATUS)
        if(success) {
            return program
        }

        throw new Error(gl.getShaderInfoLog(program))
    }

    allocAttributeLocation(program, variable, value) {
        const gl = this.gl
        const positionAttributeLocation = gl.getAttribLocation(program, variable);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(value), gl.STATIC_DRAW)
        this.vao = gl.createVertexArray();
        gl.enableVertexAttribArray(positionAttributeLocation)

        const size = 2;          // 2 components per iteration
        const type = gl.FLOAT;   // the data is 32bit floats
        const normalize = false; // don't normalize the data
        const stride = 0;        // 0 = move forward size * sizeof(type) each iteration to get the next position
        const offset = 0;        // start at the beginning of the buffer
        gl.vertexAttribPointer(
            positionAttributeLocation, size, type, normalize, stride, offset)
    }
    resize() {
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

    }

    clear() {
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
}