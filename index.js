'use strict';

(function (app) {

  var ERROR_CLASS = 'error';

  // var submitButton = myForm.querySelector('#submitButton');
  // var resultContainer = myForm.querySelector('#resultContainer');

  var clearInvalid = function () {
    [app.inputFields.fio, app.inputFields.email, app.inputFields.phone].forEach(function (field) {
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

  var submitForm = function (e) {
    e.preventDefault();
    clearInvalid();
    var validity = app.validate();
    if (!validity.isValid) {
      markInvalid(validity.errorFields);
    }
  };

  var myForm = document.getElementById('myForm');
  myForm.addEventListener('submit', submitForm);

}(window.MyForm));
