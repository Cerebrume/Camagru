const newLoginInput = document.getElementById('newLogin');
const errorMessageNewLogin = document.getElementsByClassName('invalid-feedback-newLogin')[0];
const validMessageNewLogin = document.getElementsByClassName('valid-feedback-newLogin')[0];
const userNameDisplay = document.getElementsByClassName('profile__username')[0];
let loginChangeRequestInProgress = false;
console.log(errorMessageNewLogin);
newLoginInput.addEventListener('focus', function() {
    errorMessageNewLogin.style.display = 'none';
    validMessageNewLogin.style.display = 'none';
})

function loginChangedSuccess(res) {
    console.log('SUCCESS', res);
    if (res.Changed) {
        validMessageNewLogin.style.display = 'block';
        userNameDisplay.innerHTML = newLoginInput.value;
        newLoginInput.value = '';
    }
}

function makeUrl(url) {
    let newUrl = url.split('/');

    console.log(newUrl)
    return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/changeLogin`
}

function changeLogin(e) {
    const baseUrl = document.URL
    const url = makeUrl(baseUrl);
    console.log(url);
    const newLoginValue = newLoginInput.value;
    
    if (newLoginValue.length < 6 && newLoginValue.length > 28 && !loginChangeRequestInProgress) {
        errorMessageNewLogin.style.display = 'block';
    } else {
        errorMessageNewLogin.style.display = 'none';
        loginChangeRequestInProgress = true;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                changeLogin: true,
                newLogin: newLoginValue
            })
        })
        .then(res => res.json())
	    .then(loginChangedSuccess)
    }
}