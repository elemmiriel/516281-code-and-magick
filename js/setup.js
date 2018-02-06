'use strict';

var setupBlock = document.querySelector('.setup');
setupBlock.classList.remove('hidden');

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161))', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Получить случайное число ДО параметра max включительно
var getRandomTo = function (max) {
  return Math.floor(Math.random() * (max + 1));
};

var getName = function () {
  var fullName = '';
  var randomBoolean = Math.random(); // Для рандомного свопа фамилии и имени волшебника
  if (randomBoolean >= 0.5) {
    fullName = FIRST_NAMES[getRandomTo(FIRST_NAMES.length - 1)] + ' ' + LAST_NAMES[getRandomTo(LAST_NAMES.length - 1)];
  } else {
    fullName = LAST_NAMES[getRandomTo(LAST_NAMES.length - 1)] + ' ' + FIRST_NAMES[getRandomTo(FIRST_NAMES.length - 1)];
  }
  return fullName;
};

var getCoatColor = function () {
  var color = COAT_COLORS[getRandomTo(COAT_COLORS.length - 1)];
  return color;
};

var getEyesColor = function () {
  var color = EYES_COLORS[getRandomTo(EYES_COLORS.length - 1)];
  return color;
};


var characters = [];

for (var i = 0; i < 4; i++) {
  var wizard = {
    name: getName(),
    coatColor: getCoatColor(),
    eyeColor: getEyesColor()
  };
  characters.push(wizard);
}

var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;

for (var j = 0; j < 4; j++) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = characters[j].name;
  wizardElement.querySelector('.wizard-coat').style.fill = characters[j].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = characters[j].eyeColor;
  similarListElement.appendChild(wizardElement);
}

var setupSimilarBlock = document.querySelector('.setup-similar');
setupSimilarBlock.classList.remove('hidden');
