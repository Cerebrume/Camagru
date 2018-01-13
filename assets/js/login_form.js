var mail_valid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var form = document.getElementById('form-login');
var email = document.getElementById('email');
var password = document.getElementById('passwd');
var login_btn = document.getElementById('submit');

email.addEventListener('blur', valid_email);
password.addEventListener('blur', valid_password);

var node_p3 = document.createElement('p');
node_p3.classList.add('arror_text');
var text3 = document.createTextNode("Email must be in following format: my@mail.com");
node_p3.appendChild(text3);
form.insertBefore(node_p3 , password);
node_p3.style.display = "none";

var node_p2 = document.createElement('p');
node_p2.classList.add('arror_text');
var text2 = document.createTextNode("Enter your password");
node_p2.appendChild(text2);
form.insertBefore(node_p2 , login_btn);
node_p2.style.display = "none";


function valid_password() {
	var value = password.value;

	if (value === "") {
		password.classList.add('input_error');
		node_p2.style.display = "block";
		return -1;
	}
	else {
		password.classList.remove('input_error');
		node_p2.style.display = "none";
		return 1;
	}
}

function valid_email() {
	var value = email.value;

	if (value === "" || mail_valid.test(value.toLowerCase()) != true || value.length > 28) {
		email.classList.add('input_error');
		node_p3.style.display = "block";
		return (-1);
	}
	else if (value !== "" && mail_valid.test(value.toLowerCase())) {
		email.classList.remove('input_error');
		node_p3.style.display = "none";
		return (1);
	}
}

form.addEventListener('submit', checkSubmit);

function checkSubmit(e) {
	
	if (valid_email() == -1 || valid_password() == -1) {
		e.preventDefault();
	}
}