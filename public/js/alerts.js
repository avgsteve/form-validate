

let alertMessage = $('.alert__test');

$('.show_alert').on('click', function () {
  alertMessage.fadeIn();
  closeAlertBox(alertMessage);
});


let alertMessag2 = $('.alert__test2');

$('.show_alert2').on('click', function () {
  alertMessag2.fadeIn();
  closeAlertBox(alertMessag2);
});



function showAlert(element) {
  element.fadeIn();
  closeAlertBox(element);
}


function closeAlertBox(element) {
  window.setTimeout(function () {
    element.fadeOut(300);
  }, 3000);
}


