'use strict';

(function () {

  var ERROR_CLASS = 'error';
  var FIO_WORDS_COUNT = 3;
  var PHONE_SUM = 30;

  var myForm = document.getElementById('myForm');
  var inputField = {
    fio: myForm.querySelector('#fio'),
    email: myForm.querySelector('#email'),
    phone: myForm.querySelector('#phone')
  };

  var errorFields;

  // var submitButton = myForm.querySelector('#submitButton');
  // var resultContainer = myForm.querySelector('#resultContainer');

  var isBasicallyValid = function (input) {
    if (!input.validity.valid) {
      errorFields.push(input.name);
      return false;
    }
    return true;
  };

  var isSpeciallyValid = function () {
    var inputError = false;
    if (!errorFields.includes('fio')) {
      var fioWords = inputField.fio.value.trim().split(' ').filter(function (word) {
        return word.length > 0;
      }).length;
      if (fioWords !== FIO_WORDS_COUNT) {
        errorFields.push(inputField.fio.name);
        inputError = true;
      }
    }

    if (!errorFields.includes('phone')) {
      var phoneSum = inputField.phone.value.replace(/\D/g, '').split('').reduce(function (sum, value) {
        return sum + value;
      }, 0);
      if (phoneSum > PHONE_SUM) {
        errorFields.push(inputField.phone.name);
        inputError = true;
      }
    }
    return inputError;
  };

  var clearInvalid = function () {
    [inputField.fio, inputField.email, inputField.phone].forEach(function (field) {
      if (field.classList.contains(ERROR_CLASS)) {
        field.classList.remove(ERROR_CLASS);
      }
    });
  };

  var markInvalid = function () {
    errorFields.forEach(function (fieldName) {
      myForm.querySelector('input[name="' + fieldName + '"]').classList.add(ERROR_CLASS);
    });
  };

  var validateForm = function (e) {
    errorFields = [];
    clearInvalid();
    var fullyValid = isBasicallyValid(inputField.fio) &
                isBasicallyValid(inputField.email) &
                isBasicallyValid(inputField.phone) &
                isSpeciallyValid();
    if (!fullyValid) {
      markInvalid();
      e.preventDefault();
    }
  };

  myForm.addEventListener('submit', validateForm);

}());
