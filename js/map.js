'use strict';

const HOUSE_TYPE = {
  house: "Дом",
  bungalo: "Бунгало",
  flat: "Квартира",
  palace: "Дворец"
};

const HOUSE_PRICE = {
  low: 10000,
  middle: 50000,
  high: Infinity
};

// =========filter===========
const POINTS_DATA = [];

let formFilter = document.querySelector('.map__filters');
let housingFeatures = formFilter.querySelectorAll('[name="features"]');
let mapFilter = document.querySelectorAll('.map__filter');
let mapPoints = document.querySelector('.map_points');
const FILTER_ANY = "any";

let filterItems = {
  type: FILTER_ANY,
  price: FILTER_ANY,
  rooms: FILTER_ANY,
  guests: FILTER_ANY,
  features: []
}

mapFilter.forEach(function (selectItem) {
  selectItem.addEventListener('change', (e) => {
    filterItems[e.target.name] = e.target.value;
    const filteredPoints = filterType(POINTS_DATA, filterItems);
    console.log(filteredPoints);
  })
})

housingFeatures.forEach(function (checkBox) {
  checkBox.addEventListener('change', (e) => {
    if (e.target.checked) {
      filterItems[e.target.name].push(e.target.value);
    } else {
      let indexSplice = filterItems[e.target.name].indexOf(e.target.value)
      if (indexSplice !== -1) {
        filterItems[e.target.name].splice(indexSplice, 1)
      }
    }
  })
})

// const priceFilterResult = points.filter(point => {
//   const key = Object.keys(HOUSE_PRICE);
//   const indexKey = key.indexOf(filter.price);
//   const preIndexKey = key.indexOf(filter.price) - 1;
//   if (!indexKey) return HOUSE_PRICE[filter.price] > point.offer.price;
//   if (key[preIndexKey]) return HOUSE_PRICE[key[preIndexKey]] < point.offer.price && HOUSE_PRICE[key[indexKey]] > point.offer.price;
// });

let filterType = function (points, filter) {
  const result = [];
  const priceFilterResult = points.filter(point => {
    const key = Object.keys(HOUSE_PRICE);
    const indexKey = key.indexOf(filter.price);
    const preIndexKey = key.indexOf(filter.price) - 1;
    if (!indexKey) return HOUSE_PRICE[filter.price] > point.offer.price;
    if (key[preIndexKey]) return HOUSE_PRICE[key[preIndexKey]] < point.offer.price && HOUSE_PRICE[key[indexKey]] > point.offer.price;
  });
  // debugger;
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (filter.type !== FILTER_ANY && point.offer.type !== filter.type) continue;
    if (filter.rooms !== FILTER_ANY && String(point.offer.rooms) !== filter.rooms) continue;
    if (filter.guests !== FILTER_ANY && String(point.offer.guests) !== filter.guests) continue;
    result.push(point);
  }
  return result
};

// ====active map=====

let map = document.querySelector('.map');
let mapPinMain = document.querySelector('.map__pin--main');
let mapPins = document.querySelector('.map__pins');
let form = document.querySelector('.notice__form');
let template = document.querySelector('template').content;
let mapFiltersContainter = document.querySelector('.map__filters-container');
let crossClosePopUp = document.querySelector('.popup__close');
let successHandler = function (points) {
  POINTS_DATA.push(...points)
  let activePage = function () {
    createPin(points);
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    this.removeEventListener('click', activePage)
  };
  mapPinMain.addEventListener('click', activePage);
};

mapPinMain.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
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

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    mapPins.removeEventListener('mousemove', onMouseMove);
    mapPins.removeEventListener('mouseup', onMouseUp);
  };

  mapPins.addEventListener('mousemove', onMouseMove)
  mapPins.addEventListener('mouseup', onMouseUp)
})

let findDeleteCard = function () {
  let mapCard = document.querySelector('.map__card');
  if (mapCard) {
    mapCard.remove(mapCard)
  }
};

let crossCloseCard = function () {
  let crossCard = document.querySelector('.popup__close');
  crossCard.addEventListener('click', function () {
    findDeleteCard()
  })
};

// =====create card and pins========

let createCart = function (point) {
  let element = template.cloneNode(true);
  element.querySelector('.popup__avatar').src = point.author.avatar;
  element.querySelector('.popup__title').textContent = point.offer.title;
  element.querySelector('.popup__price').textContent = point.offer.price;
  element.querySelector('.popup__text--address').textContent = point.offer.address;
  let typeHouse = element.querySelector('.popup__type');
  typeHouse.textContent = HOUSE_TYPE[point.offer.type];
  let roomsPoint = template.querySelector('.popup__text--capacity');
  if (point.offer.rooms > 1 && point.offer.guests > 1) {
    roomsPoint.textContent = point.offer.rooms + ' комнаты для ' + point.offer.guests + ' гостей'
  } else {
    roomsPoint.textContent = point.offer.rooms + ' комната для ' + point.offer.guests + ' гостей'
  };
  element.querySelector('.popup__text--time').textContent = 'Заезд после ' + point.offer.checkin + ', выезд до ' + point.offer.checkout;
  element.querySelector('.popup__pictures--img').src = '../img/house.jpeg';
  let features = element.querySelector('.popup__features');
  for (let i = 0; i < point.offer.features.length; i++) {
    let list = document.createElement('li');
    list.classList.add('feature');
    list.classList.add('feature' + '--' + point.offer.features[i]);
    features.appendChild(list);
  };
  element.querySelector('.popup__description').textContent = point.offer.description;
  mapFiltersContainter.before(element);
};

let createPin = function (points) {
  for (let point of points) {
    let elementPoint = document.createElement('button');
    let elementImg = document.createElement('img');
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
    mapPoints.appendChild(elementPoint);
  }
};

window.load(successHandler);