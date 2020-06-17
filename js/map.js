'use strict';

const HOUSE_TYPE = {
  "house": "Дом",
  "bungalo": "Бунгало",
  "flat": "Квартира",
  "palace": "Дворец"
};

var map = document.querySelector('.map');
var mapPinMain = document.querySelector('.map__pin--main');
var mapPins = document.querySelector('.map__pins');
var form = document.querySelector('.notice__form');
var template = document.querySelector('template').content;
var mapFiltersContainter = document.querySelector('.map__filters-container');
var crossClosePopUp = document.querySelector('.popup__close');
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

var findDeleteCard = function () {
  var mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove(mapCard)
  }
};

var crossCloseCard = function () {
  var crossCard = document.querySelector('.popup__close');
  crossCard.addEventListener('click', function () {
    findDeleteCard()
  })
};
var createCart = function (point) {
  var element = template.cloneNode(true);
  element.querySelector('.popup__avatar').src = point.author.avatar;
  element.querySelector('.popup__title').textContent = point.offer.title;
  element.querySelector('.popup__price').textContent = point.offer.price;
  element.querySelector('.popup__text--address').textContent = point.offer.address;
  var typeHouse = element.querySelector('.popup__type');
  typeHouse.textContent = HOUSE_TYPE[point.offer.type];
  var roomsPoint = template.querySelector('.popup__text--capacity');
  if (point.offer.rooms > 1 && point.offer.guests > 1) {
    roomsPoint.textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей'
  } else {
    roomsPoint.textContent = point.offer.rooms + ' комната для ' + point.offer.guests + ' гостей'
  };
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  element.querySelector('.popup__pictures--img').src = 'http://an-gorod.com.ua/storage/uploads/articles/HU5aMjcbbgTDKvbImP8jdqDUsL7LOfhR6pa172xi.jpeg';
  var features = element.querySelector('.popup__features');
  for (var i = 0; i < point.offer.features.length; i++) {
    var list = document.createElement('li');
    list.classList.add('feature');
    list.classList.add('feature' + '--' + point.offer.features[i]);
    features.appendChild(list);
  };
  element.querySelector('.popup__description').textContent = point.offer.description;
  mapFiltersContainter.before(element);
};


var createPin = function (point) {
  var elementPoint = document.createElement('button');
  var elementImg = document.createElement('img');
  elementImg.src = point.author.avatar;
  elementPoint.appendChild(elementImg)
  elementPoint.classList.add('map__pin');
  elementPoint.style.left = (point.location.x) + 'px';
  elementPoint.style.top = (point.location.y) + 'px';
  elementPoint.addEventListener('click', function () {
    findDeleteCard();
    createCart(point);
    crossCloseCard()
  })
  mapPins.appendChild(elementPoint);
};

// =========filter===========

var mapPin = document.querySelectorAll('.map__pin');
var form = document.querySelector('.map__filters');

(function () {
  // for (var i = 0; i <) {

  // };
})();

window.load(successHandler);