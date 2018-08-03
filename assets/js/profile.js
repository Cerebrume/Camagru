const newLoginInput = document.getElementById('newLogin');
const errorMessageNewLogin = document.getElementsByClassName('invalid-feedback-newLogin')[0];
const validMessageNewLogin = document.getElementsByClassName('valid-feedback-newLogin')[0];
const userNameDisplay = document.getElementsByClassName('profile__username')[0];
const yourLogin = document.getElementById('your_login');
let loginChangeRequestInProgress = false;

newLoginInput.addEventListener('focus', function() {
    errorMessageNewLogin.style.display = 'none';
    validMessageNewLogin.style.display = 'none';
})

function loginChangedSuccess(res) {
    console.log(res)
    loginChangeRequestInProgress = false;
    if ( res && res.Changed) {
        validMessageNewLogin.style.display = 'block';
        userNameDisplay.innerHTML = newLoginInput.value;
        yourLogin.innerHTML = newLoginInput.value;
        newLoginInput.value = '';
    }
}

function makeUrl(url, endpoint) {
    let newUrl = url.split('/');

    return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
}

function changeLogin() {
    const baseUrl = document.URL
    const url = makeUrl(baseUrl, 'changeLogin');
    const newLoginValue = newLoginInput.value;
    
    if (newLoginValue.length === 0 ||
        newLoginValue.length < 6 ||
        newLoginValue.length > 28 ||
        loginChangeRequestInProgress) {
        errorMessageNewLogin.style.display = 'block';
    } else {
        errorMessageNewLogin.style.display = 'none';
        loginChangeRequestInProgress = true;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/text'
            },
            mode: 'cors',
            body: JSON.stringify({
                changeLogin: true,
                newLogin: newLoginValue
            })
        })
        .then(res => res.json())
        .then(loginChangedSuccess)
        .catch(e => {
            console.log(e)
            errorMessageNewLogin.style.display = 'none';
            newLoginInput.value = '';
            loginChangeRequestInProgress = false;
        })
    }
}

/*
** Change email
*/

const newEmailInput = document.getElementById('newEmail');
const errorMessageNewEmail = document.getElementsByClassName('invalid-feedback-newEmail')[0];
const validMessageNewEmail = document.getElementsByClassName('valid-feedback-newEmail')[0];
const yourEmail = document.getElementById('your_email');
let emailChangeRequestInProgress = false;
var mail_valid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

newEmailInput.addEventListener('focus', function() {
    errorMessageNewEmail.style.display = 'none';
    validMessageNewEmail.style.display = 'none';
})



function emailChangedSuccess(res) {
    emailChangeRequestInProgress = false;
    if (res &&  res && res.Changed) {
        validMessageNewEmail.style.display = 'block';
        yourEmail.innerHTML = newEmailInput.value;
        newEmailInput.value = '';
    }
}

function changeEmail() {
    const baseUrl = document.URL
    const url = makeUrl(baseUrl, 'changeEmail');
    const newEmaiValue = newEmailInput.value;
    
    if (newEmailInput.length === 0 ||
        !mail_valid.test(newEmaiValue.toLowerCase()) ||
        newEmailInput.length > 256 ||
        emailChangeRequestInProgress) {
        errorMessageNewEmail.style.display = 'block';
    } else {
        errorMessageNewEmail.style.display = 'none';
        emailChangeRequestInProgress = true;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/text'
            },
            mode: 'cors',
            body: JSON.stringify({
                changeEmail: true,
                newEmail: newEmaiValue
            })
        })
        .then(res => res.json())
        .then(emailChangedSuccess)
        .catch(e => {
            console.log(e)
            errorMessageNewEmail.style.display = 'none';
            newEmaiValue.value = '';
            emailChangeRequestInProgress = false;
        })
    }
}

/*
** End of change email
*/


const currentPass = document.getElementById('currentPasswd');
const newPass = document.getElementById('newPasswd');
let passChangeRequestInProgress = false;
const errorMessageNewPass = document.getElementsByClassName('invalid-feedback invalid-feedback-newPass')[0];
const validMessageNewPass = document.getElementsByClassName('valid-feedback valid-feedback-newPass')[0];
const currentPassInput = document.getElementById('currentPasswd');
const newPassInput = document.getElementById('newPasswd');

currentPassInput.addEventListener('focus', function() {
    errorMessageNewPass.style.display = 'none';
    validMessageNewPass.style.display = 'none';
})

newPassInput.addEventListener('focus', function() {
    errorMessageNewPass.style.display = 'none';
    validMessageNewPass.style.display = 'none';
})

function valid_password(value) {
    var anUpperCase = /[A-Z]/;
    var aLowerCase = /[a-z]/; 
    var aNumber = /[0-9]/;
    var numUpper = 0, numLower = 0, numNums = 0;

	if (value === "" || value.length < 8 || value.length > 28) {
		return false
	}
	else if (value !== "") {
		for(var i = 0; i < value.length; i++){
			if(anUpperCase.test(value[i]))
				numUpper++;
			else if(aLowerCase.test(value[i]))
				numLower++;
			else if(aNumber.test(value[i]))
				numNums++;
		}
		if (numUpper < 3 || numLower < 3 || numNums < 3) {
            return false
		}
		else {
			return true
		}
	}
	return false
}

function changePass() {
    const baseUrl = document.URL
    const url = makeUrl(baseUrl, 'changePassword');
    const currentPassValue = currentPassInput.value;
    const newPassValue = newPassInput.value;
    
    if (currentPassValue.length === 0 ||
        !valid_password(newPassValue) ||
        passChangeRequestInProgress) {
        errorMessageNewPass.style.display = 'block';
    } else {
        errorMessageNewEmail.style.display = 'none';
        passChangeRequestInProgress = true;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/text'
            },
            mode: 'cors',
            body: JSON.stringify({
                changePassword: true,
                currentPassword: currentPassValue,
                newPassword: newPassValue
            })
        })
        .then(res => res.json())
        .then(passChangedSuccess)
        .catch(e => {
            console.log(e)
            errorMessageNewPass.style.display = 'none';
            newPassValue.value = '';
            currentPassValue.value = '';
            passChangeRequestInProgress = false;
        })
    }

}

function passChangedSuccess (res) {
    console.log(res)
    passChangeRequestInProgress = false;
    if ( res && res.Changed) {
        validMessageNewPass.style.display = 'block';
        newPassInput.value = '';
        currentPassInput.value = '';
    }
}

/*
** End of change password
*/



const checkBox = document.getElementById('notificaton');
const notifBtn = document.getElementById('cangeNotification');
const errorMessageNotif = document.querySelector('.invalid-feedback-notif');
const validMessageNotif = document.querySelector('.valid-feedback-notif');
let notifInProgress = false;

notifBtn.addEventListener('click', changeNotifSettings);


function changeNotifSettings (e) {
    console.log(checkBox.checked)
    const baseUrl = document.URL
    const url = makeUrl(baseUrl, 'changeNotif');

    console.log(errorMessageNotif, validMessageNotif)
    if (notifInProgress === false) {
        notifInProgress = true
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/text'
            },
            mode: 'cors',
            body: JSON.stringify({
                changeNotif: true,
                value: checkBox.checked,
            })
        })
        .then(res => res.json())
        .then(showSuccess)
        .catch(e => {
            console.log(e)
            notifInProgress = false

            errorMessageNotif.style.display = 'block';
            setTimeout(function () {
                errorMessageNotif.style.display = 'none';
            }, 2000)
        })
    }
    else {
        e.preventDefault();
    }

    function showSuccess(res) {
        console.log(res)
        validMessageNotif.style.display = 'block';
        setTimeout(function () {
            validMessageNotif.style.display = 'none';
        }, 2000)
        notifInProgress = false;
    }

}