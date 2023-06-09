function loginButton(bool) {
    const LoginHTML = `
        <a href="${bool ? `#logout` : `#login`}" class="login_button" > 
            <div>${bool ? `Logout` : `Login`}</div>
            <img src="./src/img/exit.png"/>
        </a>
    `;

    return LoginHTML
}

export default loginButton;