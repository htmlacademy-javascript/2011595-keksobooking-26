const SIMILAR_ADVERTISEMENTS_COUNT = 10;
const MIN_PRICE = 5000;
const MAX_PRICE = 100000;
const MAX_ROOM_COUNT = 100;
const MAX_GUESTS_COUNT = 10;
const LATITUDE_FROM = 35.65000;
const LATITUDE_TO = 35.70000;
const LONGITUDE_FROM = 139.70000;
const LONGITUDE_TO = 139.80000;
const TWO_DIGIT_NUMBER = 10;
const DIGITS_AFTER_POINT = 5;

const HEADLINE = [
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

const CHECK_OUT_TIME = CHECK_IN_TIME.slice();

const createArrayIdAvatar = () => {
  const array = [];
  for (let i = 0; i < SIMILAR_ADVERTISEMENTS_COUNT; i++) {
    array[i] = i + 1;
  }
  return array;
};

const arrayId = createArrayIdAvatar();

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
  return Number(result.toFixed(digits));
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

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const createAvatarSrc = () => {
  const randomIndex = getRandomPositiveInteger(0, arrayId.length - 1);
  const myIndex = arrayId.indexOf(arrayId[randomIndex]);
  const address = arrayId[randomIndex];
  if (arrayId.includes(address)) {
    arrayId.splice(myIndex, 1);
  }
  return (address < TWO_DIGIT_NUMBER) ? `0${Math.abs(address)}` : address;
};

const createAdvertisement = () => {
  const author = {
    avatar: `img/avatars/user${createAvatarSrc()}.png`
  };
  const location = {
    lat: getRandomPositiveFloat(LATITUDE_FROM, LATITUDE_TO, DIGITS_AFTER_POINT),
    lng: getRandomPositiveFloat(LONGITUDE_FROM, LONGITUDE_TO, DIGITS_AFTER_POINT)
  };
  const offer = {
    title: getRandomArrayElement(HEADLINE),
    address: `Географические координаты жилья - широта:${location.lat}, долгота:${location.lng}`,
    price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPE_HOUSING),
    rooms: getRandomPositiveInteger(1, MAX_ROOM_COUNT),
    guests: getRandomPositiveInteger(1, MAX_GUESTS_COUNT),
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
