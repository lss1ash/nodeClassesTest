'use strict';

(function () {

  window.MyForm = {};

  var myForm = document.getElementById('myForm');
  window.MyForm.inputFields = {
    fio: myForm.querySelector('#fio'),
    email: myForm.querySelector('#email'),
    phone: myForm.querySelector('#phone')
  };

}());
