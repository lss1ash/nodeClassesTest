'use strict';

(function () {

  var inputField = {
    fio: document.getElementById('fio'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone')
  };
  var submitButton = document.getElementById('submitButton');
  var resultContainer = document.getElementById('resultContainer');



  submitButton.addEventListener('click', validateForm);
  submitButton.addEventListener('keydown', submitKeydownHandler);

}());
