function notAuthorize() {
    const notAuthorizeHTML = `
        <div class="not_authorize">
            <img src="./src/img/error.png" />
            <h2>Oops, you're not logged in yet! To get access to the weather, log in to your personal account!</h2>
        </div>
    `;

    return notAuthorizeHTML
}

export default notAuthorize;