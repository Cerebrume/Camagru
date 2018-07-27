"use strict"

var register_btn = document.getElementById('submit-register');
var register_form = document.getElementById('form-register');
var login = document.getElementById('login');
var email = document.getElementById('email');
var password = document.getElementById('passwd');
var mail_valid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var anUpperCase = /[A-Z]/;
var aLowerCase = /[a-z]/; 
var aNumber = /[0-9]/;
var numUpper = 0, numLower = 0, numNums = 0;
const loginErrorMessage = document.querySelector('.invalid-feedback-login');
const emailErrorMessage = document.querySelector('.invalid-feedback-email');
const passwdErrorMessage = document.querySelector('.invalid-feedback-password');

login.addEventListener('blur', valid_login);
login.addEventListener('focus', () => {
	loginErrorMessage.style.display = 'none'
	login.classList.remove('bg-danger');
});

email.addEventListener('blur', valid_email);
email.addEventListener('focus', () => {
	emailErrorMessage.style.display = 'none'
	email.classList.remove('bg-danger');
});
password.addEventListener('blur', valid_password);
password.addEventListener('focus', () => {
	passwdErrorMessage.style.display = 'none'
	password.classList.remove('bg-danger');
});
register_form.addEventListener('submit', submition);


function valid_login() {
	var value = login.value;

	if (value === "" || value.length < 6 || value.length > 28) {
		login.classList.add('bg-danger');
		loginErrorMessage.style.display = 'block'
	}
	else if (value !== "" && value.length >= 6 && value.length < 28) {
		login.classList.remove('bg-danger');
		loginErrorMessage.style.display = 'none'
		return true
	}
	return false
}

function valid_email() {
	var value = email.value;

	if (value === "" || mail_valid.test(value.toLowerCase()) != true || value.length > 28) {
		email.classList.add('bg-danger');
		emailErrorMessage.style.display = 'block'
	}
	else if (value !== "" && mail_valid.test(value.toLowerCase())) {
		email.classList.remove('bg-danger');
		emailErrorMessage.style.display = 'none'
		return true
	}
	return false
}

function valid_password() {
	var value = password.value;
	if (value === "" || value.length < 8 || value.length > 28) {
		password.classList.add('bg-danger');
		passwdErrorMessage.style.display = 'block'
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
			password.classList.add('bg-danger');
			passwdErrorMessage.style.display = 'block'
		}
		else {
			password.classList.remove('bg-danger');
			passwdErrorMessage.style.display = 'none'
			return true
		}
	}
	return false
}

function submition(e) {
	if(valid_login() && valid_email() && valid_password()) {
		fetch('', {
			method: 'POST',
			headers: {
				'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
				'Content-Type': 'application/json'
			},
			mode: 'cors',
			body: JSON.stringify({
				submit: true,
				login: login.value,
				email: email.value,
				password: password.value
			})
		})
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(e => console.log(e))
	} else {
		e.preventDefault();
	}
}
