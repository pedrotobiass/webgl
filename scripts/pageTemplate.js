import { handleError } from "./errorHandler.js";
import { DebugManager } from "./debug.js";

class PageTemplateManager {
    construtor() {
        this.canvas = null
        this.gl = null

        debugManager.debug("Instantiated template")
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

        debugManager.debug('Created canvas')
    }

    createStyles() {
        const element = document.createElement('link')
        element.rel = "stylesheet"
        element.href = "./styles.css"

        document.head.appendChild(element)

        debugManager.debug('Loaded styles')
    }

    createGL() {
        const gl = this.canvas.getContext('webgl2')
        this.gl = gl

        debugManager.debug('Loaded Graphics Library webgl2')
    }

    emitTemplateLoaded() {
        const event = new CustomEvent("templateLoaded", {});

        document.dispatchEvent(event);

        globalThis.gl = this.gl

        debugManager.debug('loaded template')
    }
}

async function main() {
    globalThis.debugManager = new DebugManager()

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
