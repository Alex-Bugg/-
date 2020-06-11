// 'use strict';
// var infoPoints = [{
//     avatar: 'img/avatars/user01',
//     title: "Большая уютная квартира",
//     address: 200,
//     price: 400 + "₽/ночь",
//     address: '00000 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Квартира',
//     rooms: 2,
//     guests: 5,
//     timein: '17:00',
//     timeout: '12:00',
//     features: '"wifi", "dishwasher", "washer", "elevator", "conditioner"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 500,
//       y: 500
//     }
//   },
//   {
//     avatar: 'img/avatars/user02',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 300,
//       y: 600
//     }
//   },
//   {
//     avatar: 'img/avatars/user03',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 350,
//       y: 150
//     }
//   },
//   {
//     avatar: 'img/avatars/user04',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 500,
//       y: 600
//     }
//   },
//   {
//     avatar: 'img/avatars/user05',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 300,
//       y: 550
//     }
//   },
//   {
//     avatar: 'img/avatars/user06',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 800,
//       y: 400
//     }
//   },
//   {
//     avatar: 'img/avatars/user07',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 400,
//       y: 400
//     }
//   },
//   {
//     avatar: 'img/avatars/user08',
//     title: "Красивый гостевой домик",
//     address: 300,
//     price: 200 + "₽/ночь",
//     address: '22222222 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
//     type: 'Бунгало',
//     rooms: 1,
//     guests: 2,
//     timein: '12:00',
//     timeout: '10:00',
//     features: '"wifi", "dishwasher", "parking", "washer"',
//     description: "",
//     photos: "http://o0.github.io/assets/images/tokyo/hotel1.jpg",
//     loctation: {
//       x: 700,
//       y: 500
//     }
//   }
// ];
(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.load = function (onSuccess) {

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    })
    xhr.open('GET', URL);

    xhr.send();
  };
})();