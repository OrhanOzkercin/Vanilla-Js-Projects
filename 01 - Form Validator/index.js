const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

function showError(input, errorMessage) {
	const formControl = input.parentElement;
	formControl.className = 'form-control error';
	const small = formControl.querySelector('small');
	small.innerText = errorMessage;
}
function showSuccess(input) {
	const formControl = input.parentElement;
	formControl.className = 'form-control success';
}
function isValidEmail(input) {
	const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	re.test(input.value.trim())
		? showSuccess(input)
		: showError(input, "It's not valid");
}
function checkRequired(inputArr) {
	inputArr.forEach((element) => {
		if (!element.value.trim()) {
			showError(element, `${getFieldName(element)} is required`);
		} else {
			showSuccess(element);
		}
	});
}
function checkPasswordsMatch(pass, passConfirm) {
	if (pass != passConfirm) {
		showError(passConfirm, 'Passwords do not match');
	}
}
function checkLength(input, min, max) {
	input.value < min || input.value > max
		? showError(
				input,
				`${getFieldName(input)} length should be between ${min} - ${max}`
		  )
		: showSuccess(input);
}

function getFieldName(input) {
	return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

form.addEventListener('submit', function (e) {
	e.preventDefault();

	checkRequired([username, email, password, password2]);
	checkLength(username, 3, 15);
	checkLength(password, 6, 25);
	isValidEmail(email);
	checkPasswordsMatch(password, password2);
});
