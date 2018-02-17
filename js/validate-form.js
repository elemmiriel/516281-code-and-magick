'use strict';

(function () {
  window.userNameInput.addEventListener('invalid', function () {
    if (window.userNameInput.validity.tooShort) {
      window.userNameInput.setCustomValidity('Имя волшебника должно состоять минимум из 2-х символов');
    } else if (window.userNameInput.validity.tooLong) {
      window.userNameInput.setCustomValidity('Имя волшебника не должно превышать 25-ти символов');
    } else if (window.userNameInput.validity.valueMissing) {
      window.userNameInput.setCustomValidity('У волшебника должно быть имя!');
    } else {
      window.userNameInput.setCustomValidity('');
    }
  });

  window.userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя волшебника должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
})();
