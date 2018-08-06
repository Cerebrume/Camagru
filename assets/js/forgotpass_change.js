const newPass = document.getElementById('newPasswd');
const newPassConfirm = document.getElementById('newPasswdConfirm');
var anUpperCase = /[A-Z]/;
var aLowerCase = /[a-z]/; 
var aNumber = /[0-9]/;
var numUpper = 0, numLower = 0, numNums = 0;
const btnChangePass = document.getElementById('submit-changePass');
const passwdErrorMessage = document.querySelector('.invalid-feedback-newPass');
let fetchInProgress = false;
btnChangePass.addEventListener('click', function (e) {
    e.preventDefault();
    
    if (valid_password(newPass) && newPass.value === newPassConfirm.value) {
        console.log('valid');
        const baseUrl = document.URL;
		function makeUrl(url, endpoint) {
			let newUrl = url.split('/');
		
			return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
		}
        const url = (makeUrl(baseUrl, 'restorePass'));
        fetchInProgress = true;
        fetch(url, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify({
                changePass: true,
                newPass: newPass.value
            })
        })
		.then(res => res.json())
		.then(successReset)
		.catch(e => {
			console.log(e)
			fetchInProgress = false;
		});
    } else {
        passwdErrorMessage.style.display = 'block';
    }
})

function successReset(res) {
    console.log(res)
    if (res.Changed) {
        const baseUrl = document.URL;
        function makeUrl(url, endpoint) {
			let newUrl = url.split('/');
		
			return `http://${newUrl[2]}/${newUrl[3]}/${newUrl[4]}/${endpoint}`
		}
        location.replace(makeUrl(baseUrl, ''))
    }
}

newPass.addEventListener('focus', () => {
    newPass.classList.remove('bg-danger');
    newPassConfirm.classList.remove('bg-danger');
    passwdErrorMessage.style.display = 'none'
})

function valid_password(password) {
	var value = password.value;
	if (value === "" || value.length < 8 || value.length > 28) {
		password.classList.add('bg-danger');
		newPassConfirm.classList.add('bg-danger');
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
            newPassConfirm.classList.add('bg-danger');
            passwdErrorMessage.style.display = 'block'
		}
		else {
            newPass.classList.remove('bg-danger');
            newPassConfirm.classList.remove('bg-danger');
            passwdErrorMessage.style.display = 'none'
			return true
		}
	}
	return false
}

