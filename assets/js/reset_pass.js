const btnReset = document.getElementById('submit-reset');
const errorMessage = document.querySelector('.invalid-feedback-email');
const successMessage = document.querySelector('.valid-feedback-resetPass');
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
let fetchInProgress = false;

function resetPasswordRequest(e) {
	e.preventDefault();

    if (valid_email() && !fetchInProgress) {
		const baseUrl = document.URL;
		function makeUrl(url, endpoint) {
			let newUrl = url.split('/');
		
			return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
		}
		const url = (makeUrl(baseUrl, 'resetPassRequest'));
		console.log(url)
		fetchInProgress = true;
		fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                resetPass: true,
                email: email.value
            })
        })
		.then(res => res.text())
		.then(addSuccessMessage)
		.catch(e => {
			console.log(e)
			fetchInProgress = false;
		});
	
	} else if (fetchInProgress) {
		return;
	} else {
		console.log('invalid')
		errorMessage.style.display = 'block';
		successMessage.style.display = 'none';
        setTimeout(function () {
            errorMessage.style.display = 'none';
        }, 2000);

	}
	
}

function addSuccessMessage (res) {
	console.log(res)
	successMessage.style.display = 'block';
	email.value = '';
	fetchInProgress = false;
	setTimeout(function () {
		successMessage.style.display = 'none';
	}, 2000);
}