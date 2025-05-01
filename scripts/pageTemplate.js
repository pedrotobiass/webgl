import { handleError } from "./errorHandler.js";

class PageTemplateManager {
    construtor() {
        this.canvas = null
        this.gl = null
    }

    createCanvas() {
        const element = document.createElement('canvas')
        element.width = 512
        element.height = 512
        element.id = "maincanvas"

        document.body.appendChild(element)

        this.canvas = element
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
        const event = new CustomEvent("templateLoaded", {
            gl: this.gl,
        });

        document.dispatchEvent(event);
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
