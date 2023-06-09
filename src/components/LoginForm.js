function loginForm() {
    const loginFormHTML = `
        <form id="loginForm" class="login_form">
            <h2>Enter your username and password to enter the site.</h2>
            <div> 
                <label for="username">Username:</label>
                <input type="text" id="username" name="username" required placeholder="временный логин: admin">
            </div>
            <div> 
                <label for="password">Password:</label>
                <input type="password" id="password" name="password" required placeholder="временный пароль: admin">
            </div>            
            <button  type="submit">Login</button>
        </form>
    `;

    return loginFormHTML
}

export default loginForm;