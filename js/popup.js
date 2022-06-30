import { createAdvertisements } from './data.js';
import {
  fillingValueSrcOrNot,
  fillingValueTextContentOrNot,
  fillingValueTextContentOrNotForCheckoutAndCheckin,
  fillingValueTextContentOrNotForRoomsAndGuests,
} from './util.js';

const typesHousingToRussian = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const containerOfAdvertisements = document.querySelector('.map__canvas');
const advertisementCardTemplate = document.querySelector('#card').content;
const advertisementCardPopup =
  advertisementCardTemplate.querySelector('.popup');

const similarAdvertisements = createAdvertisements();

similarAdvertisements.forEach(({ author, offer }) => {
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
  const advertisementElement = advertisementCardPopup.cloneNode(true);
  const featureContainer =
    advertisementElement.querySelector('.popup__features');
  const featureList = featureContainer.querySelectorAll('.popup__feature');
  const photosContainer = advertisementElement.querySelector('.popup__photos');
  const popupAvatar = advertisementElement.querySelector('.popup__avatar');
  const popupTitle = advertisementElement.querySelector('.popup__title');
  const popupAddress = advertisementElement.querySelector(
    '.popup__text--address'
  );
  const popupPriceContainer = advertisementElement.querySelector(
    '.popup__text--price'
  );
  const popupPrice = popupPriceContainer.querySelector('.js-price');
  const popupType = advertisementElement.querySelector('.popup__type');
  const popupCapacity = advertisementElement.querySelector(
    '.popup__text--capacity'
  );
  const popupTime = advertisementElement.querySelector('.popup__text--time');
  const popupDescription = advertisementElement.querySelector(
    '.popup__description'
  );

  fillingValueSrcOrNot(popupAvatar, avatar);

  fillingValueTextContentOrNot(popupTitle, title);

  fillingValueTextContentOrNot(popupAddress, address);

  fillingValueTextContentOrNot(popupPrice, price);

  fillingValueTextContentOrNot(popupType, typesHousingToRussian[type]);

  fillingValueTextContentOrNot(popupDescription, description);

  fillingValueTextContentOrNotForRoomsAndGuests(popupCapacity, rooms, guests);

  fillingValueTextContentOrNotForCheckoutAndCheckin(
    popupTime,
    checkout,
    checkin
  );

  if (features) {
    featureList.forEach((featureListItem) => {
      const isNecessary = features.some((offerFeature) =>
        featureListItem.classList.contains(`popup__feature--${offerFeature}`)
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    featureContainer.remove();
  }

  advertisementElement.querySelector('.popup__photo').remove();

  if (photos) {
    photos.forEach((photo) => {
      photosContainer.insertAdjacentHTML(
        'beforeend',
        `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
      );
    });
  } else {
    photosContainer.remove();
  }
  containerOfAdvertisements.appendChild(advertisementElement);
});
