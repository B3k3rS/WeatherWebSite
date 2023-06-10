import errorPage from './src/components/ErrorPage.js';
import LoginButton from './src/components/LoginButton.js';
import loginForm from './src/components/LoginForm.js';
import myPossitionWeather from './src/components/MyPossitionWeather.js';
import notifyWindow from './src/components/NotifyWindow.js';

// initial application
const app = document.getElementById('app')
let defaultPage = ``

// load page
async function reloadPage() {
    defaultPage  = `
        ${LoginButton(!!localStorage.getItem('is-logged'))}
        <div class="notify_window">    
        </div>
        <main class="page_main">
        </main>

    `
    app.innerHTML = defaultPage;
}

// render visual notify
function notifyRender(html) {
    let notify = document.querySelector('.notify_window')
    notify.style.width = "180px"
    notify.innerHTML = html
    notify.style.transition = "0.3s"
    notify.style.padding = "0 5px"

    setTimeout(()=>{
        notify.style.width = "0px"
        notify.innerHTML = ``
        notify.style.padding = "0"
    },5000)
}

// load main block content
async function loadContent(hash) {
    const mainBlock = document.querySelector(".page_main");
    // routing on hash address
    if (hash == '') {
        if (!!localStorage.getItem('is-logged')) {
            // load page
            const weatherContent = await myPossitionWeather(true);
            mainBlock.innerHTML = weatherContent;

            // Listener on Search Button
            const findButton = document.getElementById('#findweather')
            findButton.addEventListener('click', async () => {
                const city = document.getElementById('search_city').value
                window.location.hash = `#findcity?city=${encodeURIComponent(city)}`;
            })
        } else {
            mainBlock.innerHTML = errorPage(`Oops, you're not logged in yet! To get access to the weather, log in to your personal account!`);
        }
    }
    else if (hash.split('?')[0] == '#login') {
        mainBlock.innerHTML = loginForm();

        document.getElementById('loginForm').addEventListener('submit', (e) => {
            // cancel reload
            e.preventDefault();
            
            // get authorization input
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;

            // gag until the server appears
            if (username == "admin" && password == "admin"){
                localStorage.setItem('is-logged','logged');

                // redirect web-site/
                reloadPage();
                window.location.hash = ""
                notifyRender(notifyWindow('complite','Successful login'))
            }
            else {
                notifyRender(notifyWindow('error','Authorisation error'))
            }
        })
    }
    else if (hash.split('?')[0] == '#logout') {
        localStorage.removeItem('is-logged')
        
        reloadPage();
        window.location.hash = ""
        notifyRender(notifyWindow('complite','Successful logout'))
    }
    else if (hash.split('?')[0] == '#findcity') {
        if (!!localStorage.getItem('is-logged')) {

            // split hash, save params
            const hash = window.location.hash;
            const match = hash.match(/#findcity\?city=(.*)/);
            const cityParam = match ? decodeURIComponent(match[1]) : null;

            // render searched city
            const weatherContent = await myPossitionWeather(false,cityParam);
            mainBlock.innerHTML = weatherContent;

            // listen new searsh
            const findButton = document.getElementById('#findweather')
            findButton.addEventListener('click', async () => {
                let city = document.getElementById('search_city').value
                window.location.hash = `#findcity?city=${encodeURIComponent(city)}`;
            })
        } else {
            mainBlock.innerHTML = errorPage(`Oops, you're not logged in yet! To get access to the weather, log in to your personal account!`);
        }
    }
    else {
        // Error hash adress
        mainBlock.innerHTML = errorPage(`This page does not exist. You will be redirected to the grave page within 5 seconds!`)
        setTimeout(()=> {
            window.location.hash = ``
        },5000)
    }
}


// first page load
reloadPage()
.then(()=> {
    loadContent(window.location.hash);
})

// detect change web-site hash adress, update page 
window.addEventListener('hashchange', function() {
    let hash = window.location.hash;
    loadContent(hash)
});

