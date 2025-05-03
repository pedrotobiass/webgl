import { handleError } from "./errorHandler.js";

class PageTemplateManager {
    construtor() {
        this.canvas = null
        this.gl = null
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        canvas.width = 512
        canvas.height = 512
        canvas.id = "maincanvas"

        const div = document.createElement('div')

        div.className = "center"
        div.appendChild(canvas)

        this.canvas = canvas

        document.body.appendChild(div)
    }

    createStyles() {
        const element = document.createElement('link')
        element.rel = "stylesheet"
        element.href = "./styles.css"

        document.head.appendChild(element)
    }

    createGL() {
        const gl = this.canvas.getContext('webgl2')
        this.gl = gl
    }

    emitTemplateLoaded() {
        const event = new CustomEvent("templateLoaded", {});

        document.dispatchEvent(event);

        globalThis.gl = this.gl
    }
}

async function main() {
    const manager = new PageTemplateManager()
    manager.createCanvas()
    manager.createStyles()
    manager.createGL()

    manager.emitTemplateLoaded()
}

try {
    window.addEventListener("DOMContentLoaded", async () => {
        await main();
    });
} catch (error) {
    handleError(error);
}
