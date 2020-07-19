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

const POINTS_DATA = [];

// =========filter===========

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

const filterAccept = () => {
  const filteredPoints = filterType(POINTS_DATA, filterItems);
  mapPoints.innerHTML = '';
  createPin(filteredPoints)
}

mapFilter.forEach(function (selectItem) {
  selectItem.addEventListener('change', (e) => {
    filterItems[e.target.name] = e.target.value;
    filterAccept()
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
    filterAccept()
  })
})


let filterType = function (points, filter) {
  const key = Object.keys(HOUSE_PRICE);
  const indexKey = key.indexOf(filter.price);
  const preIndexKey = key.indexOf(filter.price) - 1;
  return points.filter(point => {
    if (filter.type !== FILTER_ANY && point.offer.type !== filter.type) return false;
    if (filter.rooms !== FILTER_ANY && String(point.offer.rooms) !== filter.rooms) return false;
    if (filter.guests !== FILTER_ANY && String(point.offer.guests) !== filter.guests) return false;
    if (!indexKey) return HOUSE_PRICE[filter.price] > point.offer.price;
    if (key[preIndexKey]) return HOUSE_PRICE[key[preIndexKey]] <= point.offer.price && HOUSE_PRICE[key[indexKey]] >= point.offer.price;
    for (let i = 0; i < filter.features.length; i++) {
      const element = filter.features[i];
      if (!point.offer.features.includes(element)) return false;
    }
    return true;
  })
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
    createPin(POINTS_DATA);
    map.classList.remove('map--faded');
    form.classList.remove('notice__form--disabled');
    this.removeEventListener('click', activePage)
  };
  mapPinMain.addEventListener('click', activePage);
};

let coordX;
let coordY;

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
    coordY = (mapPinMain.offsetTop - shift.y);
    coordX = (mapPinMain.offsetLeft - shift.x);
  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    mapPins.removeEventListener('mousemove', onMouseMove);
    mapPins.removeEventListener('mouseup', onMouseUp);
    // coordX = upEvt.clientX;
    // coordY = upEvt.clientY;
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

// =========form=========
const btnSubmitForm = document.querySelector('.form__submit');
const avatarForm = form.querySelector('#avatar');
const titleForm = form.querySelector('#title');
const addressForm = form.querySelector('#address');
const typeForm = form.querySelector('#type');
const priceForm = form.querySelector('#price');
const timeinForm = form.querySelector('#timein');
const timeoutForm = form.querySelector('#timeout');
const roomNumberForm = form.querySelector('#room_number');
const capacityForm = form.querySelector('#capacity');
const descriptionForm = form.querySelector('#description');
const imagesForm = form.querySelector('#images');
const checkboxForm = form.querySelectorAll('input[name="features"]')
const previewImgPin = document.querySelector('.notice__preview img');
const previewPhotoCard = document.querySelector('.photo_block');

avatarForm.addEventListener('change', () => {
  const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];
  const file = avatarForm.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewImgPin.src = reader.result
    })
    reader.readAsDataURL(file);
  }
})

// const prevPictuer = (img) => previewPhotoCard.appendChild(img);

imagesForm.addEventListener('change', () => {
  const FILE_TYPES = ['gif', 'jpeg', 'jpg', 'png'];
  const file = imagesForm.files[0];
  console.log(file)
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  })
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      const img = document.createElement('img');
      img.classList.add('img_photo');
      img.src = reader.result;
      previewPhotoCard.appendChild(img);
    })
    reader.readAsDataURL(file);
  }
})

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newPin = {
    author: {},
    location: {},
    offer: {
      features: [],
      photos: [],
    }
  };

  if (avatarForm.value === '') newPin.author.avatar = "img/avatars/default.png"
  else newPin.author.avatar = previewImgPin.src;
  newPin.offer.title = titleForm.value;
  newPin.offer.address = addressForm.value;
  newPin.offer.type = typeForm.value;
  newPin.offer.price = priceForm.value;
  newPin.offer.checkin = timeinForm.value;
  newPin.offer.checkout = timeoutForm.value;
  newPin.offer.rooms = roomNumberForm.value;
  newPin.offer.guests = capacityForm.value;
  newPin.offer.description = descriptionForm.value;
  checkboxForm.forEach(cb => {
    if (cb.checked) newPin.offer.features.push(cb.value)
  })
  newPin.offer.photos = imagesForm.value;
  newPin.location.x = coordX;
  newPin.location.y = coordY;
  POINTS_DATA.push(newPin)
  createPin(POINTS_DATA)
  mapPinMain.style.top = 375 + 'px';
  mapPinMain.style.left = 600 + 'px';
  form.reset();
  previewImgPin.src = 'img/avatars/default.png';
  previewPhotoCard.innerHTML = "";
});

window.load(successHandler);