import {
  checkValue,
  checkValueOfRoomsAndGuests,
  checkValueOfCheckoutAndCheckin,
  checkValueOfChild,
  checkValueOfPhoto,
} from './util.js';

const typesHousingToRussian = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const addCardTemplate = document.querySelector('#card').content;
const addCardPopup = addCardTemplate.querySelector('.popup');

const createPopup = ({ author, offer }) => {
  const { avatar } = author;
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;

  const addElement = addCardPopup.cloneNode(true);

  const featureContainer = addElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const photosContainer = addElement.querySelector('.popup__photos');
  const popupAvatar = addElement.querySelector('.popup__avatar');
  const popupTitle = addElement.querySelector('.popup__title');
  const popupAddress = addElement.querySelector('.popup__text--address');
  const popupPriceContainer = addElement.querySelector('.popup__text--price');
  const popupPrice = popupPriceContainer.querySelector('.js-price');
  const popupType = addElement.querySelector('.popup__type');
  const popupCapacity = addElement.querySelector('.popup__text--capacity');
  const popupTime = addElement.querySelector('.popup__text--time');
  const popupDescription = addElement.querySelector('.popup__description');

  checkValue(popupAvatar, avatar, 'src');

  checkValue(popupTitle, title);

  checkValue(popupAddress, address);

  checkValue(popupPrice, price);

  checkValue(popupType, typesHousingToRussian[type]);

  checkValue(popupDescription, description);

  checkValueOfRoomsAndGuests(popupCapacity, rooms, guests);

  checkValueOfCheckoutAndCheckin(popupTime, checkout, checkin);

  checkValueOfChild(featureList, features, featureContainer);

  // удаляю заглушку
  addElement.querySelector('.popup__photo').remove();

  checkValueOfPhoto(photosContainer, photos);

  return addElement;
};

export { createPopup };

// import {
//   checkValue,
//   checkValueOfRoomsAndGuests,
//   checkValueOfCheckoutAndCheckin,
//   checkValueOfChild,
//   checkValueOfPhoto,
// } from './util.js';
//
// const typesHousingToRussian = {
//   flat: 'Квартира',
//   bungalow: 'Бунгало',
//   house: 'Дом',
//   palace: 'Дворец',
//   hotel: 'Отель',
// };
//
// const addCardTemplate = document.querySelector('#card').content;
// const addCardPopup = addCardTemplate.querySelector('.popup');
//
// const createPopup = (data) => {
//   const addElement = addCardPopup.cloneNode(true);
//
//   const featureContainer = addElement.querySelector('.popup__features');
//   const featureList = featureContainer.querySelectorAll('.popup__feature');
//   const photosContainer = addElement.querySelector('.popup__photos');
//   const popupAvatar = addElement.querySelector('.popup__avatar');
//   const popupTitle = addElement.querySelector('.popup__title');
//   const popupAddress = addElement.querySelector('.popup__text--address');
//   const popupPriceContainer = addElement.querySelector('.popup__text--price');
//   const popupPrice = popupPriceContainer.querySelector('.js-price');
//   const popupType = addElement.querySelector('.popup__type');
//   const popupCapacity = addElement.querySelector('.popup__text--capacity');
//   const popupTime = addElement.querySelector('.popup__text--time');
//   const popupDescription = addElement.querySelector('.popup__description');
//
//   checkValue(popupAvatar, data.author.avatar, 'src');
//
//   checkValue(popupTitle, data.offer.title);
//
//   checkValue(popupAddress, data.offer.address);
//
//   checkValue(popupPrice, data.offer.price);
//
//   checkValue(popupType, typesHousingToRussian[data.offer.type]);
//
//   checkValue(popupDescription, data.offer.description);
//
//   checkValueOfRoomsAndGuests(popupCapacity, data.offer.rooms, data.offer.guests);
//
//   checkValueOfCheckoutAndCheckin(popupTime, data.offer.checkout, data.offer.checkin);
//
//   checkValueOfChild(featureList, data.offer.features, featureContainer);
//
//   // удаляю заглушку
//   addElement.querySelector('.popup__photo').remove();
//
//   checkValueOfPhoto(photosContainer, data.offer.photos);
//
//   return addElement;
// };
//
// export { createPopup };
