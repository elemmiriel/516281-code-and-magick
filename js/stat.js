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

var getColor = function (name) {
  if (name === 'Вы') {
    return 'rgba(255, 0, 0, 1)';
  } else {
    // Для того, чтобы избежать 100% прозрачности был добавлен коэф. 0.1
    var rand = '0, 0, 255,' + (Math.random() * (1 - 0.1) + 0.1);
    return 'rgba(' + rand + ')';
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, 'white');
  renderText(ctx, 'Ура вы победили!', TEXT_X, TEXT_Y, '#000');
  renderText(ctx, 'Список результатов:', TEXT_X, TEXT_Y + TEXT_HEIGHT, '#000');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < names.length; i++) {
    var param1 = TEXT_X + (BAR_WIDTH + BAR_GAP) * i;
    var param2 = BAR_MAX_HEIGHT + TEXT_HEIGHT * 5;
    renderText(ctx, names[i], param1, param2, '#000');

    barHeight = times[i] / maxTime * BAR_MAX_HEIGHT;
    var param3 = CLOUD_Y + TEXT_HEIGHT * 3 + BAR_MAX_HEIGHT - barHeight;

    renderText(ctx, Math.round(times[i]), param1, param3, '#000');
    ctx.fillStyle = getColor(names[i]);
    ctx.fillRect(CLOUD_X + TEXT_X + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + TEXT_HEIGHT * 4 + BAR_MAX_HEIGHT - barHeight, BAR_WIDTH, barHeight);
  }
};
