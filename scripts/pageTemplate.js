import { handleError } from "./errorHandler"

function emitTemplateSucess(data) {
    const event = new CustomEvent('templateLoaded', {
        data
    })

    document.dispatchEvent(event)
}

async function main() {
    alert('Hello, World!')
}

try {
    window.addEventListener('DOMContentLoaded', async() => {
        await main()
    })
} catch(error) {
    handleError(error)
}