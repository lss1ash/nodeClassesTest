'use strict';

(function (app) {

  var ERROR_CLASS = 'error';

  var FIO_WORDS_COUNT = 3;
  var PHONE_SUM = 30;

  var HTTP_SUCCESS = 200;

  var errorFields;
  app = {};

  var myForm = document.getElementById('myForm');
  var inputFields = {
    fio: myForm.querySelector('#fio'),
    email: myForm.querySelector('#email'),
    phone: myForm.querySelector('#phone')
  };
  var submitButton = myForm.querySelector('#submitButton');
  var resultContainer = myForm.querySelector('#resultContainer');

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

// AJAX-запрос

  var sendAjax = function (url, data, successCallback, errorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.onload = function () {
      if (xhr.status === HTTP_SUCCESS) {
        successCallback(xhr.response);
      } else {
        errorCallback('Что-то пошло не так :(');
      }
    };
    xhr.onerror = function () {
      errorCallback('Произошла ошибка соединения с сервером. Попробуйте позднее...');
    };
    xhr.ontimeout = function () {
      errorCallback('Произошла ошибка соединения с сервером. Время ожидания ответа на запрос истекло...');
    };

    xhr.open('GET', url + '?' + data + '&time=' + (new Date()).getTime(), true);
    xhr.send();
    // xhr.open('POST', url, true);
    // xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
    // xhr.send(data);
  };

  var writeMessage = function (message) {
    resultContainer.classList.remove('success');
    resultContainer.classList.remove('error');
    resultContainer.classList.remove('progress');

    if (typeof message === 'object') {
      switch (message.status) {
        case 'success': resultContainer.textContent = 'Success';
          resultContainer.classList.add('success');
          submitButton.disabled = false;
          break;
        case 'error': resultContainer.textContent = message.reason;
          resultContainer.classList.add('error');
          submitButton.disabled = false;
          break;
        case 'progress': resultContainer.textContent = 'Progress';
          resultContainer.classList.add('progress');
          setTimeout(app.submit, message.timeout);
          break;
        default: resultContainer.textContent = 'Получен неизвестный ответ...';
          resultContainer.classList.add('error');
          submitButton.disabled = false;
      }
    } else {
      resultContainer.textContent = message;
      resultContainer.classList.add('error');
      submitButton.disabled = false;
    }
  };

// validate() => { isValid: Boolean, errorFields: String[] }

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

// submit() => undefined

  app.submit = function () {
    clearInvalid();
    var validity = app.validate();
    if (!validity.isValid) {
      markInvalid(validity.errorFields);
    } else {
      submitButton.disabled = true;
      var formData = 'fio=' + encodeURIComponent(inputFields.fio.value) +
        '&email=' + encodeURIComponent(inputFields.email.value) +
        '&phone=' + encodeURIComponent(inputFields.phone.value);
      sendAjax(myForm.action, formData, writeMessage, writeMessage);
    }
  };

  // getData() => Object

  app.getData = function () {
    return {
      fio: inputFields.fio.value,
      email: inputFields.email.value,
      phone: inputFields.phone.value
    };
  };

  // setData(Object) => undefined

  app.setData = function (fields) {
    if (typeof fields === 'object') {
      if (fields.fio) {
        inputFields.fio.value = fields.fio;
      }
      if (fields.email) {
        inputFields.email.value = fields.email;
      }
      if (fields.phone) {
        inputFields.phone.value = fields.phone;
      }
    }
  };

  myForm.addEventListener('submit', function (e) {
    e.preventDefault();
    app.submit();
  });

}(window.MyForm));
