const btnReset = document.getElementById('submit-reset');
const errorMessage = document.querySelector('.invalid-feedback-email');
const mail_valid = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
const email = document.getElementById('email');


function valid_email() {
	var value = email.value;

	if (value === "" || mail_valid.test(value.toLowerCase()) != true || value.length > 28) {
		email.classList.add('bg-danger');
		errorMessage.style.display = "block";
		return false;
	}
	else if (value !== "" && mail_valid.test(value.toLowerCase())) {
		email.classList.remove('bg-danger');
		errorMessage.style.display = "none";
		return true;
	}
}

const form = document.getElementById('form-forgot');

form.addEventListener('submit', resetPasswordRequest)

function resetPasswordRequest(e) {
    
    if (valid_email()) {
        console.log('valid')
    } else {
        e.preventDefault();
        errorMessage.style.display = 'block';
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 2000);
    }
}