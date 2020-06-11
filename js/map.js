'use strict';

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var form = document.querySelector('.notice__form');
var template = document.querySelector('template');
var mapFiltersContainter = document.querySelector('.map__filters-container');

var mapCards = document.querySelectorAll('.map__card');
var successHandler = function (points) {
  var activePage = function () {
    for (var i = 0; i < points.length; i++) {
      createPin(points[i]);
    };
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    this.removeEventListener('click', activePage)
  };
  mapPinMain.addEventListener('click', activePage);
};


mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    }

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mapPinMain.style.top = (mapPinMain.offsetTop - shift.y) + 'px';
    mapPinMain.style.left = (mapPinMain.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    mapPins.removeEventListener('mousemove', onMouseMove);
    mapPins.removeEventListener('mouseup', onMouseUp);
  };

  mapPins.addEventListener('mousemove', onMouseMove)
  mapPins.addEventListener('mouseup', onMouseUp)
})

var createCart = function (point) {
  var element = template.cloneNode(true);
  debugger;
  console.log(element.querySelector('.popup__avatar'))
  // element.dataset.id = point;
  element.querySelector('.popup__avatar').src = point.author.avatar;
  element.querySelector('.popup__title').textContent = point.title;
  element.querySelector('.popup__price').textContent = point.price;
  element.querySelector('.popup__text--address').textContent = point.address;
  element.querySelector('.popup__type').textContent = point.type;
  var roomsPoint = template.querySelector('.popup__text--capacity');
  if (point.rooms > 1 && point.guests > 1) {
    roomsPoint.textContent = point.rooms + ' комнаты для ' + point.guests + ' гостей'
  } else {
    roomsPoint.textContent = point.rooms + ' комната для ' + point.guests + ' гостей'
  };
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + infoPoints.timein + ', выезд до ' + infoPoints.timeout;
  return element;
};

var createPin = function (point) {
  var elementPoint = document.createElement('button');
  var elementImg = document.createElement('img');
  elementImg.src = point.author.avatar;
  elementPoint.appendChild(elementImg)
  // elementPoint.dataset.id;
  elementPoint.classList.add('map__pin');
  elementPoint.style.left = (point.location.x) + 'px';
  elementPoint.style.top = (point.location.y) + 'px';
  elementPoint.addEventListener('click', function () {
    createCart(point)
  })
  mapPins.appendChild(elementPoint);
};

window.load(successHandler);