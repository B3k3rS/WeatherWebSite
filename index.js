import LoginButton from './src/components/LoginButton.js';
import loginForm from './src/components/LoginForm.js';
import notAuthorize from './src/components/NotAuthorize.js';
import myPossitionWeather from './src/components/MyPossitionWeather.js';

// initial application
const app = document.getElementById('app')
let defaultPage = ``

// load page
async function reloadPage() {
    defaultPage  = `
        ${LoginButton(!!localStorage.getItem('is-logged'))}
        <main class="page_main">
        </main>
    `
    app.innerHTML = defaultPage;
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
            mainBlock.innerHTML = notAuthorize();
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
                // there should be a notify window here, but laziness stole it ._.

                // redirect web-site/
                reloadPage();
                window.location.hash = ""
            }
            else {
                // there should be a notify window here, but laziness stole it ._.
                alert(`Error authorization`)
            }
        })
    }
    else if (hash.split('?')[0] == '#logout') {
        localStorage.removeItem('is-logged')
        // there should be a notify window here, but laziness stole it ._.
        reloadPage();
        window.location.hash = ""
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
                const city = document.getElementById('search_city').value
                window.location.hash = `#findcity?city=${encodeURIComponent(city)}`;
            })
        } else {
            mainBlock.innerHTML = notAuthorize();
        }
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

