import { handleError } from "./errorHandler.js";
import { Wrapper } from "./glwrapper.js";

const attribute = "a_position";
const positions = [0, 0, 0, 0.5, 0.7, 0];

async function main(gl) {
    const wrap = new Wrapper(gl);

    const vertexFile = await fetch("../vertex.glsl");
    const fragmentFile = await fetch("../fragment.glsl");

    const vertex = await vertexFile.text();
    const fragment = await fragmentFile.text();

    const vertexShader = wrap.createShader("vertex", vertex);
    const fragmentShader = wrap.createShader("fragment", fragment);

    const program = wrap.createProgram(vertexShader, fragmentShader);

    wrap.allocAttributeLocation(program, attribute, positions);
    wrap.resize();
    wrap.clear();

    gl.useProgram(program);

    gl.bindVertexArray(vao);

    const primitiveType = gl.TRIANGLES;
    const offset = 0;
    const count = 3;
    gl.drawArrays(primitiveType, offset, count);
}

try {
    if (!globalThis.gl) {
        document.addEventListener("templateLoaded", async () => {
            await main(gl);
        });
    } else {
        await main(gl);
    }
} catch (error) {
    handleError(error);
}