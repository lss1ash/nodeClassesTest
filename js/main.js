'use strict';

(function () {

  var myForm = document.getElementById('myForm');
  var inputField = {
    fio: myForm.querySelector('#fio'),
    email: myForm.querySelector('#email'),
    phone: myForm.querySelector('#phone')
  };
  var submitButton = myForm.querySelector('#submitButton');
  var resultContainer = myForm.querySelector('#resultContainer');

  // var validateForm = function () {
  //   var result = true;
  //   [].forEach.call(noticeForm, function (item) {
  //     if (!item.validity.valid) {
  //       item.classList.add('field--invalid');
  //       result = false;
  //     } else {
  //       item.classList.remove('field--invalid');
  //     }
  //   });
  //   return result;
  // };
  //

  //
  // var submitKeydownHandler = function (e) {
  //   if (e.keyCode === KEYCODE_ENTER) {
  //     validateForm();
  //   }
  // };

  var validateForm = function (e) {
    // if (inputField.email.validity.typeMismatch) {
    //   inputField.email.setCustomValidity('I expect an e-mail, darling!');
    // } else {
    //   inputField.email.setCustomValidity('');
    // }
    if (inputField.fio === '123') {
      inputField.fio.setCustomValidity('Test custom validity!');
      return false;
      // inputField.fio
    }
    return true;
  };

  var submitFormHandler = function (e) {
    if (!validateForm()) {
      e.preventDefault();
    }
    // // myForm.reset();
  };

  myForm.addEventListener('submit', submitFormHandler);
  submitButton.addEventListener('click', validateForm);
  // submitButton.addEventListener('keydown', submitKeydownHandler);

}());
