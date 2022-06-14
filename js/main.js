const SIMILAR_ADVERTISEMENTS_COUNT = 10;
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const getRandomPositiveFloat = (a, b, digits = 1) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
};
const getRandomArray = (array) => {
  const maxLength = array.length;
  const lengthOfArray = getRandomPositiveInteger(1, maxLength);
  const newArray = [];
  while (newArray.length < lengthOfArray) {
    const indexOfEl = getRandomPositiveInteger(0, maxLength - 1);
    const el = array[indexOfEl];
    if (!newArray.includes(el)) {
      newArray.push(el);
    }
  }
  return newArray;
};
const arrayIdAvatarCreate = () => {
  const array = [];
  for (let i = 0; i < SIMILAR_ADVERTISEMENTS_COUNT; i++) {
    array[i] = i + 1;
  }
  return array;
};
const arrayId = arrayIdAvatarCreate();
const minPrice = 5000;
const maxPrice = 100000;
const maxRoomCount = 100;
const maxGuestsCount = 10;
const latitudeFrom = 35.65000;
const latitudeTo = 35.70000;
const longitudeFrom = 139.70000;
const longitudeTo = 139.80000;
const headline = [
  'Квартирка для котов лентяев',
  'Дворец для состоятельных мурчал',
  'Сдаю гараж с мышами',
  'Дом для многодетных котов',
  'Валерианин дом',
];
const DESCRIPTION_OF_HOUSING = [
  'Ночлежка для ночных котобродяг',
  'Бесплатный вискас, молоко, когтеточка, массаж и мурмяу',
  'Отель без хозяев, без котодетей, без котообязательств',
  'Место для котов без хвостов и совести',
  'Место чтоб залечь на дно, если натворил кое-каких дел',
  'Аппартаменты для котобоссов и котобоссок',
];
const PHOTO_OF_HOUSING = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const TYPE_HOUSING = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const FEATURES_OF_HOUSING = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
const CHECK_IN_TIME = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECK_OUT_TIME = CHECK_IN_TIME;
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const createAvatarAddress = () => {
  const randomIndex = getRandomPositiveInteger(0, arrayId.length - 1);
  const myIndex = arrayId.indexOf(arrayId[randomIndex]);
  const address = arrayId[randomIndex];
  if (arrayId.includes(address)) {
    arrayId.splice(myIndex, 1);
  }
  return (address < 10) ? `0${Math.abs(address)}` : address;
};
const createAdvertisement = () => {
  const author = {
    avatar: `img/avatars/user${createAvatarAddress()}.png`
  };
  const location = {
    lat: getRandomPositiveFloat(latitudeFrom, latitudeTo, 5),
    lng: getRandomPositiveFloat(longitudeFrom, longitudeTo, 5)
  };
  const offer = {
    title: getRandomArrayElement(headline),
    address: `Географические координаты жилья - широта:${location.lat}, долгота:${location.lng}`,
    price: getRandomPositiveInteger(minPrice, maxPrice),
    type: getRandomArrayElement(TYPE_HOUSING),
    rooms: getRandomPositiveInteger(1, maxRoomCount),
    guests: getRandomPositiveInteger(1, maxGuestsCount),
    checkin: getRandomArrayElement(CHECK_IN_TIME),
    checkout: getRandomArrayElement(CHECK_OUT_TIME),
    features: getRandomArray(FEATURES_OF_HOUSING),
    description: getRandomArrayElement(DESCRIPTION_OF_HOUSING),
    photos: getRandomArray(PHOTO_OF_HOUSING),
  };
  return {
    author,
    offer,
    location
  };
};
const similarAdvertisements = Array.from({length: SIMILAR_ADVERTISEMENTS_COUNT}, createAdvertisement);
// eslint-disable-next-line no-console
console.log(similarAdvertisements);
// //Функция, возвращающая случайное целое число из переданного диапазона включительно.
// const getRandom = (min, max) => {
//   if (max === undefined || min === undefined) {
//     return 'Введите все аргументы функции';
//   }
//   if (max === min) {
//     return 'Диапазоном не может быть одно число';
//   }
//   if (min > max) {
//     return 'Введите корректный диапазон "от...до"';
//   }
//   const rand = min + Math.random() * (max + 1 - min);
//   return Math.floor(rand);
// };
// // eslint-disable-next-line no-console
// console.log('Проверка первой функции'); console.log('getRandom(1,1):'); console.log(getRandom(1, 1)); console.log('getRandom(2,1):'); console.log(getRandom(2, 1)); console.log('getRandom():'); console.log(getRandom()); console.log('getRandom(2,7):'); console.log(getRandom(2, 7));
//
// //Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
// const getRandomWithPoint = (min, max, point) => {
//   if (max === undefined || point === undefined || min === undefined) {
//     return 'Введите все аргументы функции';
//   }
//   if (max === min) {
//     return 'Диапазоном не может быть одно число';
//   }
//   if (min > max) {
//     return 'Введите корректный диапазон "от...до"';
//   }
//   const randPoint = min + Math.random() * (max - min);
//   return randPoint.toFixed(point);
// };
// // eslint-disable-next-line no-console
// console.log('Проверка второй функции'); console.log('getRandomWithPoint(1,1,1):'); console.log(getRandomWithPoint(1, 1, 1)); console.log('getRandomWithPoint(2,1,1):'); console.log(getRandomWithPoint(2, 1, 1)); console.log('getRandomWithPoint():'); console.log(getRandomWithPoint()); console.log('getRandomWithPoint(2,7,2):'); console.log(getRandomWithPoint(2, 7, 2));
