'use strict';

(function () {
  var ENTER_KEY = 13;
  var ESCAPE_KEY = 27;

  var setup = document.querySelector('.setup');
  window.userNameInput = setup.querySelector('.setup-user-name');

  var setupOpen = document.querySelector('.setup-open-icon');
  var setupClose = document.querySelector('.setup-close');

  var setupSimilarBlock = document.querySelector('.setup-similar');
  setupSimilarBlock.classList.remove('hidden');

  var showWindow = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onWindowEscPress);
  };
  var hideWindow = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onWindowEscPress);
  };

  var onWindowEscPress = function (evt) {
    if ((evt.keyCode === ESCAPE_KEY) && (document.querySelector(':focus') !== window.userNameInput)) {
      hideWindow();
    }
  };

  setupOpen.addEventListener('click', function () {
    showWindow();
  });
  setupClose.addEventListener('click', function () {
    hideWindow();
  });

  // События для управления с клавы
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      showWindow();
    }
  });
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEY) {
      hideWindow();
    }
  });
})();
