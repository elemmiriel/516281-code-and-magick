'use strict';

var FIRST_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

var LAST_NAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

var COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161))',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

var EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

var FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

var ENTER_KEY = 13;
var ESCAPE_KEY = 27;

// Получить случайное число ДО параметра max включительно
var getRandomTo = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

var generateWizards = function () {
  var getName = function () {
    var needSwap = Math.random(); // Для рандомного свопа фамилии и имени волшебника
    var firstName = FIRST_NAMES[getRandomTo(FIRST_NAMES.length - 1)];
    var lastName = LAST_NAMES[getRandomTo(LAST_NAMES.length - 1)];
    return (needSwap >= 0.5) ? (firstName + ' ' + lastName) : (lastName + ' ' + firstName);
  };

  var getCoatColor = function () {
    return COAT_COLORS[getRandomTo(COAT_COLORS.length - 1)];
  };

  var getEyesColor = function () {
    return EYES_COLORS[getRandomTo(EYES_COLORS.length - 1)];
  };

  var characters = [];

  for (var i = 0; i < 4; i++) {
    characters.push({
      name: getName(),
      coatColor: getCoatColor(),
      eyeColor: getEyesColor()
    });
  }
  return characters;
};

var similarCharacters = generateWizards();

var renderWizard = function (similarCharacter) {
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = similarCharacter.name;
  wizardElement.querySelector('.wizard-coat').style.fill = similarCharacter.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = similarCharacter.eyeColor;
  return wizardElement;
};

var setupSimilarWizards = function () {
  var fragment = document.createDocumentFragment();
  var similarListElement = document.querySelector('.setup-similar-list');
  for (var j = 0; j < similarCharacters.length; j++) {
    fragment.appendChild(renderWizard(similarCharacters[j]));
  }
  similarListElement.appendChild(fragment);
};

var setupOpen = document.querySelector('.setup-open-icon');
var setupClose = document.querySelector('.setup-close');
var setup = document.querySelector('.setup');
var userNameInput = setup.querySelector('.setup-user-name');

var showSimilar = function () {
  var setupSimilarBlock = document.querySelector('.setup-similar');
  setupSimilarBlock.classList.remove('hidden');
};

var showHideSetupWindow = function () {
  var showWindow = function () {
    setup.classList.remove('hidden');
    document.addEventListener('keydown', onWindowEscPress);
  };
  var hideWindow = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onWindowEscPress);
  };

  var onWindowEscPress = function (evt) {
    if ((evt.keyCode === ESCAPE_KEY) && (document.querySelector(':focus') !== userNameInput)) {
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

};

var validateForm = function () {
  userNameInput.addEventListener('invalid', function () {
    if (userNameInput.validity.tooShort) {
      userNameInput.setCustomValidity('Имя волшебника должно состоять минимум из 2-х символов');
    } else if (userNameInput.validity.tooLong) {
      userNameInput.setCustomValidity('Имя волшебника не должно превышать 25-ти символов');
    } else if (userNameInput.validity.valueMissing) {
      userNameInput.setCustomValidity('У волшебника должно быть имя!');
    } else {
      userNameInput.setCustomValidity('');
    }
  });

  userNameInput.addEventListener('input', function (evt) {
    var target = evt.target;
    if (target.value.length < 2) {
      target.setCustomValidity('Имя волшебника должно состоять минимум из 2-х символов');
    } else {
      target.setCustomValidity('');
    }
  });
};

var setupWizard = function () {
  var wizard = document.querySelector('.setup-wizard');
  var setupPlayer = document.querySelector('.setup-wizard-appearance');
  var coatColor = wizard.querySelector('.wizard-coat');
  var eyesColor = wizard.querySelector('.wizard-eyes');
  var fireBall = document.querySelector('.setup-fireball-wrap');

  var setupCoatColor = function () {
    var color = COAT_COLORS[getRandomTo(COAT_COLORS.length - 1)];
    coatColor.style.fill = color;
    setupPlayer.querySelectorAll('input')[0].value = color;
  };

  var setupEyesColor = function () {
    var color = EYES_COLORS[getRandomTo(EYES_COLORS.length - 1)];
    eyesColor.style.fill = color;
    setupPlayer.querySelectorAll('input')[1].value = color;
  };

  var setupFireBallColor = function () {
    var color = FIREBALL_COLORS[getRandomTo(FIREBALL_COLORS.length - 1)];
    fireBall.style.background = color;
    fireBall.querySelector('input').value = color;
  };

  coatColor.addEventListener('click', setupCoatColor);
  eyesColor.addEventListener('click', setupEyesColor);
  fireBall.addEventListener('click', setupFireBallColor);
};


showSimilar();
showHideSetupWindow();
setupSimilarWizards();
validateForm();
setupWizard();

