// ===== checking name fileds =====

function checkNameField(element) {

  $(element).removeClass('is-valid is-invalid');

  if ($(element).val() === "") {
    // console.log('this is empty:', $(this));
    $(element).addClass('is-invalid');
    $('#email_invalid_message').text('Please fill thie field');
    return false;

  } else {
    $(element).addClass('is-valid');
    return true;

  }
}

$('.nameFields1').on('change', function () {
  checkNameField($(this));
});


$('.nameFields2').on('change', function () {
  checkNameField($(this));
});



// ===== checking email filed =====


function checkEmailFormat(emailValue) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(emailValue);
}

function checkEmail() {

  let emailField = $('#emailInput');
  let emailValue = emailField.val();
  let isEmailFormat;

  // 1) First remove all validation classes in case repeatly adding duplicated ones
  emailField.removeClass('is-invalid is-valid');

  // 2) Check if value is empty
  emailField.addClass('is-invalid');
  if (emailValue === "") {
    $('#email_invalid_message').text('Please fill this field');
    return false;
  }

  // 3) Check if format is correct
  isEmailFormat = checkEmailFormat(emailValue);
  if (!isEmailFormat) {
    $('#email_invalid_message').text('email format is incorrect');
    return false;
  }

  // 4) If 2) & 3) are cleared, reset to valid class and normal 
  emailField.removeClass('is-invalid').addClass('is-valid');
  return true;

}



let emailField = $('#emailInput');

emailField.on('change', function () {
  // console.log('clicked');
  // console.log('input fields', $(this).find('input'));
  checkEmail();
});



// ===== checking password fileds =====

function checkPasswordsMatch() {

  let passwordInput = $('#inputPassword').val();
  let passwordConfirm = $('#confirmInputPassword').val();

  // In case either of the password field is empty
  if (!passwordInput || !passwordConfirm) return false;

  if (passwordInput !== passwordConfirm) {
    showAlert($('.password_dont_match'));
    return false;
  }

  return true;
}



// ===== checking all fileds if any field is empty =====
// Using code:
// $('.needs-validation').on('submit', function (e) {
// to get all input fields under the form element with the class name "needs-validation"

function checkIsEmpty(element) {

  $(element).removeClass('is-valid is-invalid');

  if ($(element).val() === "") {
    // console.log('this is empty:', $(this));
    $(element).addClass('is-invalid');
    $('#email_invalid_message').text('Please fill thie field');
    return false;

  } else {

    $(element).addClass('is-valid');
    return true;

  }
}


function checkAllInput() {
  let checkArray = [];

  $('.needs-validation input').each(function () {

    let result = checkIsEmpty($(this));
    // console.log('checkArray', checkArray);
    checkArray.push(result);
  });

  if (checkArray.includes(false)) {
    return false;
  }
  return true;

}


$('.needs-validation').on('submit', function (e) {

  e.preventDefault();
  // console.log('clicked');
  // console.log('input fields', $(this).find('input'));

  let chkEmptyResult = checkAllInput();
  let chkEmailResult = checkEmail();
  let chkPassowordFormat1 = checkPWDformat($('#inputPassword'));
  let chkPassowordFormat2 = checkPWDformat($('#confirmInputPassword'));
  let chkPWareMatched = checkPasswordsMatch($());

  let checkResults = [
    chkEmptyResult,
    chkEmailResult,
    chkPassowordFormat1,
    chkPassowordFormat2,
    chkPWareMatched
  ];

  console.log(
    'check empty:', chkEmptyResult,
    'check chkEmailResult:', chkEmailResult,
    'check chkPWareMatched:', chkPWareMatched, "check chkPassowordFormat1", chkPassowordFormat1, "check chkPassowordFormat2", chkPassowordFormat2);

  console.log('If all above are true, it means is all clear')

  if (!checkResults.includes(false)) {

    //execute next step here

    return showAlert($('.signup_form_ok'));

  }
});


// ===== Dynamic check for password format =====
function isCorrectPWFormat(pwValue) {

  //ref: https://tinyurl.com/yyrljkoo
  let result = /(?=^.{6,}$)(?=.*[0-9])\w+/g.test(pwValue);
  //String is > 5 chars
  //Contains a digit

  // console.log('check format result', result);
  return result;
}


function checkPWDformat(element) {

  let pwdValue = element.val();
  let warningElement = element.next('.password-invalid-feedback');

  element.removeClass('is-valid is-invalid');
  element.addClass('is-invalid');

  if (pwdValue === "") {
    warningElement.text("Please fill thie field");

    return false;
  }



  if (!isCorrectPWFormat(pwdValue)) {
    warningElement.text("Incorrect format");

    return false;
  }

  $(element).removeClass('is-invalid').addClass('is-valid');
  return true;
}


$('#inputPassword').on('change', function () {
  checkPWDformat($(this));
});


$('#confirmInputPassword').on('change', function () {
  checkPWDformat($(this));
});