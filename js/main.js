const SIMILAR_ADVERTISEMENTS_COUNT = 10;
const MIN_PRICE = 5000;
const MAX_PRICE = 100000;
const MAX_ROOM_COUNT = 100;
const MAX_GUESTS_COUNT = 10;
const LATITUDE_FROM = 35.65;
const LATITUDE_TO = 35.7;
const LONGITUDE_FROM = 139.7;
const LONGITUDE_TO = 139.8;
const TWO_DIGIT_NUMBER = 10;
const DIGITS_AFTER_POINT = 5;

const HEADLINES = [
  'Квартирка для котов лентяев',
  'Дворец для состоятельных мурчал',
  'Сдаю гараж с мышами',
  'Дом для многодетных котов',
  'Валерианин дом',
];

const DESCRIPTIONS_OF_HOUSING = [
  'Ночлежка для ночных котобродяг',
  'Бесплатный вискас, молоко, когтеточка, массаж и мурмяу',
  'Отель без хозяев, без котодетей, без котообязательств',
  'Место для котов без хвостов и совести',
  'Место чтоб залечь на дно, если натворил кое-каких дел',
  'Аппартаменты для котобоссов и котобоссок',
];

const PHOTOS_OF_HOUSING = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const TYPES_OF_HOUSING = ['palace', 'flat', 'house', 'bungalow', 'hotel'];

const FEATURES_OF_HOUSING = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const CHECK_IN_TIME = ['12:00', '13:00', '14:00'];

const CHECK_OUT_TIME = CHECK_IN_TIME.slice();

const numbers = [];
const createNumbers = () => {
  for (let i = 0; i < 10; i++) {
    numbers[i] = i + 1;
  }
};

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

const getRandomElements = (array) => {
  const randomInt = getRandomPositiveInteger(1, array.length);
  const elements = [];

  while (elements.length < randomInt) {
    const index = getRandomPositiveInteger(0, array.length - 1);
    const element = array[index];

    if (!elements.includes(element)) {
      elements.push(element);
    }
  }

  return elements;
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const createAvatarSrc = () => {
  const randomIndex = getRandomPositiveInteger(0, numbers.length - 1);
  const fileName = Number(numbers.splice(randomIndex, 1));

  return fileName < TWO_DIGIT_NUMBER ? `0${fileName}` : fileName;
};

const createAdvertisement = () => {
  const author = {
    avatar: `img/avatars/user${createAvatarSrc()}.png`,
  };

  const location = {
    lat: getRandomPositiveFloat(LATITUDE_FROM, LATITUDE_TO, DIGITS_AFTER_POINT),
    lng: getRandomPositiveFloat(
      LONGITUDE_FROM,
      LONGITUDE_TO,
      DIGITS_AFTER_POINT
    ),
  };

  const offer = {
    title: getRandomArrayElement(HEADLINES),
    address: `Географические координаты жилья - широта:${location.lat}, долгота:${location.lng}`,
    price: getRandomPositiveInteger(MIN_PRICE, MAX_PRICE),
    type: getRandomArrayElement(TYPES_OF_HOUSING),
    rooms: getRandomPositiveInteger(1, MAX_ROOM_COUNT),
    guests: getRandomPositiveInteger(1, MAX_GUESTS_COUNT),
    checkin: getRandomArrayElement(CHECK_IN_TIME),
    checkout: getRandomArrayElement(CHECK_OUT_TIME),
    features: getRandomElements(FEATURES_OF_HOUSING),
    description: getRandomArrayElement(DESCRIPTIONS_OF_HOUSING),
    photos: getRandomElements(PHOTOS_OF_HOUSING),
  };

  return {
    author,
    offer,
    location,
  };
};

createNumbers();

const similarAdvertisements = Array.from(
  { length: SIMILAR_ADVERTISEMENTS_COUNT },
  createAdvertisement
);
// eslint-disable-next-line no-console
console.log(similarAdvertisements);
