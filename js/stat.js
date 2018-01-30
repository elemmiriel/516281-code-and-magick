'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_X = 30;
var TEXT_Y = 30;
var TEXT_HEIGHT = 20;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var BAR_MAX_HEIGHT = 150;

var barHeight = 150;

// DOM-элемент канваса
var canvas = document.getElementById('canvas');

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, textString, gapX, gapY, color) {
  ctx.fillStyle = color;
  ctx.font = '16px PT Mono';
  ctx.fillText(textString, CLOUD_X + gapX, CLOUD_Y + gapY);
};

// Функция поиска максимального времени прохождения
var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
  renderText(ctx, 'Ура вы победили!', TEXT_X, TEXT_Y, '#000');
  renderText(ctx, 'Список результатов:', TEXT_X, TEXT_Y + TEXT_HEIGHT, '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    renderText(ctx, names[i], TEXT_X + (BAR_WIDTH + BAR_GAP) * i, BAR_MAX_HEIGHT + TEXT_HEIGHT * 5, '#000');

    barHeight = times[i] / maxTime * BAR_MAX_HEIGHT;

    renderText(ctx, Math.round(times[i]), TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TEXT_HEIGHT * 3 + BAR_MAX_HEIGHT - barHeight, '#000');

    // Цвет колонки игрока красный, других - синий со случайной прозрачностью.
    if (names[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      // Для того, чтобы избежать 100% прозрачности был добавлен коэф. 0.1
      var rand = '0, 0, 255,' + (Math.random() * (1 - 0.1) + 0.1);
      ctx.fillStyle = 'rgba(' + rand + ')';
    }
    ctx.fillRect(CLOUD_X + TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TEXT_HEIGHT * 4 + BAR_MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  }
};
