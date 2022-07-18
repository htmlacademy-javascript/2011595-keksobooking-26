import { createAdvertisements } from './data.js';
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

const similarAdds = createAdvertisements();
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

  checkValueOfChild(featureList, features);

  // удаляю заглушку
  addElement.querySelector('.popup__photo').remove();

  checkValueOfPhoto(photosContainer, photos);

  return addElement;
};

export { similarAdds, createPopup };
