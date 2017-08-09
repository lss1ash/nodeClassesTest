'use strict';

(function (app) {

  var ERROR_CLASS = 'error';
  var FIO_WORDS_COUNT = 3;
  var PHONE_SUM = 30;

  var errorFields;
  app = {};

  // var submitButton = myForm.querySelector('#submitButton');
  // var resultContainer = myForm.querySelector('#resultContainer');

  var myForm = document.getElementById('myForm');
  var inputFields = {
    fio: myForm.querySelector('#fio'),
    email: myForm.querySelector('#email'),
    phone: myForm.querySelector('#phone')
  };

// Визуальное выделение невалидных полей //

  var clearInvalid = function () {
    [inputFields.fio, inputFields.email, inputFields.phone].forEach(function (field) {
      if (field.classList.contains(ERROR_CLASS)) {
        field.classList.remove(ERROR_CLASS);
      }
    });
  };

  var markInvalid = function (fields) {
    fields.forEach(function (fieldName) {
      myForm.querySelector('input[name="' + fieldName + '"]').classList.add(ERROR_CLASS);
    });
  };

// Валидация

  var isBasicallyValid = function (input) {
    if (!input.validity.valid) {
      errorFields.push(input.name);
      return false;
    }
    return true;
  };

  var isSpeciallyValidFio = function () {
    var fioWords = inputFields.fio.value.trim().split(' ').filter(function (word) {
      return word.length > 0;
    }).length;
    if (fioWords !== FIO_WORDS_COUNT) {
      errorFields.push(inputFields.fio.name);
      return false;
    }
    return true;
  };

  var isSpeciallyValidPhone = function () {
    var phoneSum = inputFields.phone.value.replace(/\D/g, '').split('').reduce(function (sum, value) {
      return +sum + +value;
    }, 0);
    if (phoneSum > PHONE_SUM) {
      errorFields.push(inputFields.phone.name);
      return false;
    }
    return true;
  };

// validate в шлобальную область

  app.validate = function () {
    errorFields = [];

    var fioValid = isBasicallyValid(inputFields.fio) && isSpeciallyValidFio();
    var emailValid = isBasicallyValid(inputFields.email);
    var phoneValid = isBasicallyValid(inputFields.phone) && isSpeciallyValidPhone();

    return {
      isValid: fioValid && emailValid && phoneValid,
      errorFields: errorFields
    };
  };

  app.submit = function (e) {
    e.preventDefault();
    clearInvalid();
    var validity = app.validate();
    if (!validity.isValid) {
      markInvalid(validity.errorFields);
    }
  };

  myForm.addEventListener('submit', app.submit);

}(window.MyForm));
