function loginButton(bool) {
    const LoginHTML = `
        <a href="${bool ? `#logout` : `#login`}" class="login_button" > 
            <div>${bool ? `Logout` : `Login`}</div>
            <img src="./src/img/exit.png"/ alt="exit">
        </a>
    `;

    return LoginHTML
}

export default loginButton;