export class DebugManager {
    constructor() {
        this.createElement()
        this.appendBody()
        this.debug("Hello, World!")
        this.i = -1;
    }

    createElement() {
        const div = document.createElement('div')
        this.parentElement = div
    }

    appendBody() {
        document.body.appendBody(this.parentElement)
    }

    debug(info, id) {
        const p = document.createElement('p')
        p.id = id || String(this.i++)
        p.innerText = `[${p.id}] : ${JSON.stringify(info)}`

        this.parentElement.appendChild(p)
    }
}