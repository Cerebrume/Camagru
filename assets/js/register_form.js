"use strict"

var register_btn = document.getElementById('submit');
var register_form = document.getElementById('form-register');
var login = document.getElementById('login');
var email = document.getElementById('email');
var password = document.getElementById('passwd');
var validate_login = false;
var validate_email = false;
var valid_pass = false;
var mail_valid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var anUpperCase = /[A-Z]/;
var aLowerCase = /[a-z]/; 
var aNumber = /[0-9]/;
var numUpper = 0, numLower = 0, numNums = 0;


login.addEventListener('blur', valid_login);
email.addEventListener('blur', valid_email);
password.addEventListener('blur', valid_password);
register_form.addEventListener('submit', submition);

var node_p = document.createElement('p');
node_p.classList.add('arror_text');
var text = document.createTextNode("Login must be at least 6 characters");
node_p.appendChild(text);
register_form.insertBefore(node_p , email);
node_p.style.display = "none";

var node_p2 = document.createElement('p');
node_p2.classList.add('arror_text');
var text2 = document.createTextNode("Password must contain at least 3 lowercase, 3 uppercase letters and 3 digits");
node_p2.appendChild(text2);
register_form.insertBefore(node_p2 , register_btn);
node_p2.style.display = "none";

var node_p3 = document.createElement('p');
node_p3.classList.add('arror_text');
var text3 = document.createTextNode("Email must be in following format: my@mail.com");
node_p3.appendChild(text3);
register_form.insertBefore(node_p3 , password);
node_p3.style.display = "none";


function valid_login() {
	var value = login.value;

	if (value === "" && value.length < 6 && value.length > 28) {
		login.classList.add('input_error');
		validate_login = false;
	
		node_p.style.display = "block";
		register_btn.setAttribute('disabled', 'disabled');
		check_submit_ready()
	}
	else if (value !== "" && value.length >= 6 && value.length < 28) {
		login.classList.remove('input_error');
		validate_login = true;
		node_p.style.display = "none";
		check_submit_ready()
	}


}

function valid_email() {
	var value = email.value;

	if (value === "" || mail_valid.test(value.toLowerCase()) != true || value.length > 28) {
		email.classList.add('input_error');
		validate_email = false;
		node_p3.style.display = "block";
	}
	else if (value !== "" && mail_valid.test(value.toLowerCase())) {
		email.classList.remove('input_error');
		validate_email = true;
		node_p3.style.display = "none";
	}
}

function valid_password() {
	var value = password.value;
	if (value === "" || value.length < 9 || value.length > 28) {
		password.classList.add('input_error');
		valid_pass = false;
		node_p2.style.display = "block";
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
			password.classList.add('input_error');
			valid_pass = false;
		}
		else {
			password.classList.remove('input_error');
			valid_pass = true;
			node_p2.style.display = "none";
		}

	}
}

function submition() {
	valid_login();
	valid_email();
	valid_password();
}