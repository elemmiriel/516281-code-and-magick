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

var showSetupWindow = function () {
  var setupBlock = document.querySelector('.setup');
  setupBlock.classList.remove('hidden');
};

var showSimilar = function () {
  var setupSimilarBlock = document.querySelector('.setup-similar');
  setupSimilarBlock.classList.remove('hidden');
};

var generateWizards = function () {

// Получить случайное число ДО параметра max включительно
  var getRandomTo = function (max) {
    return Math.floor(Math.random() * (max + 1));
  };

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

showSimilar();
showSetupWindow();
setupSimilarWizards();
