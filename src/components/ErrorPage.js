function errorPage(msg) {
    let errorPageHTML = `
        <div class="error_page">
            <img src="./src/img/error.png" />
            <h2>${msg}</h2>
        </div>
    `

    return errorPageHTML
}

export default errorPage

