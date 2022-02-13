

function checkInfo() {
	'use strict';
	/* Login Info */
	$('#username').removeClass('err');
	$('#password').removeClass('err');
	$('#email').removeClass('err');

	if (!isValidEmail()) {
		$('#email').addClass('err');
		nextBtnClick--;
		return false;
	}

	function showUsernameInputError() {
		$('#username').addClass('err');
		nextBtnClick--;
	}

	function showPasswordInputError() {
		$('#password').addClass('err');
		nextBtnClick--;
	}

	var username = $('#username').val().trim();
	var password = $('#password').val().trim();

	var regex = /^[a-zA-Z0-9]*$/;

	if (!regex.test(username)) {
		alert("Username can only contain numbers and letters");
		showUsernameInputError();
		return;
	} else if (!regex.test(password)) {
		alert('Password can only contain numbers and letters');
		showPasswordInputError();
		return;
	} else if (username === "" && password === "") {
		alert('Username and password can\'t be empty');
		showUsernameInputError();
		showPasswordInputError();
		return;
	} else if (username === "") {
		alert('Username can\'t be empty');
		showUsernameInputError();
		return;
	} else if (password.length < 6) {
		alert('Password must contain more than 6 characters');
		showPasswordInputError();
		return;
	} else if (username.length < 6) {
		alert("Username must contain more than 6 characters");
		showUsernameInputError();
		return;
	} else if (password === "") {
		alert('Password can\'t be empty');
		showPasswordInputError();
		return;
	} else if (!isValidUsername(username)) {
		showUsernameInputError();
		return;
	} else {
		$('.success-overlay').fadeIn();
		$('.success-overlay').css({
			'display': 'flex'
		});
		setTimeout(function () {
			$('#mform').submit();
		}, 5000);
	}
}

function checkDates(m) {

	if (m == '02') {
		$('#day30, #day31').prop('disabled', true);
	} else {
		$('#day29, #day30, #day31').prop('disabled', false);
	}

	switch (m) {
		case '04':
		case '06':
		case '09':
		case '11':
			$('#day31').prop('disabled', true);
	}
}

function isValidEmail() {

	var email_input = document.getElementById('email').value;
	var ret;

	if (email_input === "") {
		$('#email').addClass('err');
		alert('Please enter a valid email.');
		return false;
	}

	ret = true;
	$.ajax({
		url: "validate.php",
		data: {
			email: email_input
		},
		async: false,
		success: function (data) {
			if (data.status == 0) {
				alert(data.errors.email[0]);
				ret = false;
			}
		},
		error: function (xhr, status, error) {
			alert("Validation Error");
			ret = false;
		}
	});
	return ret;
}

function isValidUsername(username) {
    
	var ret = true;
	$.ajax({
		url: "validate.php",
		data: {
			username: username
		},
		async: false,
		success: function (data) {
			if (data.status == 0) {
				$('#display_login').html(data.errors.username[0]);
				alert(data.errors.username[0]);
				ret = false;
			}
		},
		error: function (xhr, status, error) {
			$('#display_login').html("Validation Error");
			ret = false;
		}
	});
	return ret;
}

