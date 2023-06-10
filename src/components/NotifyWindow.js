function returnImg(type) {
    if (type == 'error') {
        return `<img src="./src/img/error_notify.png" alt="error" />`
    }
    else if (type == 'complite') {
        return `<img src="./src/img/complite_notify.png" alt="complite" />`
    }

}

function notifyWindow(type,message) {
    const notifyWindowHTML = `
        ${returnImg(type)}
        ${message}
    `;
    return notifyWindowHTML
}

export default notifyWindow;