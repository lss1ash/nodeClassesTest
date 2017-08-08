'use strict';

(function (app) {

  var FIO_WORDS_COUNT = 3;
  var PHONE_SUM = 30;

  var errorFields;

  var isBasicallyValid = function (input) {
    if (!input.validity.valid) {
      errorFields.push(input.name);
      return false;
    }
    return true;
  };

  var isSpeciallyValidFio = function () {
    var fioWords = app.inputFields.fio.value.trim().split(' ').filter(function (word) {
      return word.length > 0;
    }).length;
    if (fioWords !== FIO_WORDS_COUNT) {
      errorFields.push(app.inputFields.fio.name);
      return false;
    }
    return true;
  };

  var isSpeciallyValidPhone = function () {
    var phoneSum = app.inputFields.phone.value.replace(/\D/g, '').split('').reduce(function (sum, value) {
      return +sum + +value;
    }, 0);
    if (phoneSum > PHONE_SUM) {
      errorFields.push(app.inputFields.phone.name);
      return false;
    }
    return true;
  };

  app.validate = function () {
    errorFields = [];

    var fioValid = isBasicallyValid(app.inputFields.fio) && isSpeciallyValidFio();
    var emailValid = isBasicallyValid(app.inputFields.email);
    var phoneValid = isBasicallyValid(app.inputFields.phone) && isSpeciallyValidPhone();

    return {
      isValid: fioValid && emailValid && phoneValid,
      errorFields: errorFields
    };
  };

}(window.MyForm));
