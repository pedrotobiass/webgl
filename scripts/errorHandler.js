export function handleError(error) {
    const p = document.createElement('p')
    p.innerText = typeof error == "string" ? error : JSON.stringify(error)

    document.body.appendChild(p)
}