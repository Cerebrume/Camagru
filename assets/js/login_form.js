var mail_valid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var form = document.getElementById('form-login');
var email = document.getElementById('email');
var password = document.getElementById('passwd');
var login_btn = document.getElementById('submit');
const emailErrorMessage = document.querySelector('.invalid-feedback-email');
const passwdErrorMessage = document.querySelector('.invalid-feedback-password');

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

function valid_password() {
	var value = password.value;

	if (value === "") {
		password.classList.add('bg-danger');
		passwdErrorMessage.style.display = 'block';
		return false;
	}
	else {
		password.classList.remove('bg-danger');
		passwdErrorMessage.style.display = 'none';
		return true;
	}
}

function valid_email() {
	var value = email.value;

	if (value === "" || mail_valid.test(value.toLowerCase()) != true || value.length > 28) {
		email.classList.add('bg-danger');
		passwdErrorMessage.style.display = "block";
		return false;
	}
	else if (value !== "" && mail_valid.test(value.toLowerCase())) {
		email.classList.remove('bg-danger');
		passwdErrorMessage.style.display = "none";
		return true;
	}
}

form.addEventListener('submit', checkSubmit);

function checkSubmit(e) {
	if (!valid_email() && !valid_password()) {
		e.preventDefault();
	}
}