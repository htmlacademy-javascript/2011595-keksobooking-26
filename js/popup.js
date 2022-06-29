import {createAdvertisements} from './data.js';
import {fixGuestName, fixRoomName} from './util.js';

const containerOfAdvertisements = document.querySelector('.map__canvas');

const similarAdvertisements = createAdvertisements();

const AdvertisementCardTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const typesHousingToRussian = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

similarAdvertisements.forEach(({author, offer}) => {
  const advertisementElement = AdvertisementCardTemplate.cloneNode(true);

  const featureContainer = advertisementElement.querySelector('.popup__features');

  const featureList = featureContainer.querySelectorAll('.popup__feature');

  const photosContainer = advertisementElement.querySelector('.popup__photos');

  const popupAvatar = advertisementElement.querySelector('.popup__avatar');

  const popupTitle = advertisementElement.querySelector('.popup__title');

  const popupAddress = advertisementElement.querySelector('.popup__text--address');

  const popupPriceContainer = advertisementElement.querySelector('.popup__text--price');

  const popupPrice = popupPriceContainer.querySelector('.js-price');

  const popupType = advertisementElement.querySelector('.popup__type');

  const popupCapacity = advertisementElement.querySelector('.popup__text--capacity');

  const popupTime = advertisementElement.querySelector('.popup__text--time');

  const popupDescription = advertisementElement.querySelector('.popup__description');

  if (author.avatar) {
    popupAvatar.src = author.avatar;
  } else {
    popupAvatar.remove();
  }

  if (offer.title) {
    popupTitle.textContent = offer.title;
  } else {
    popupTitle.remove();
  }

  if (offer.address) {
    popupAddress.textContent = offer.address;
  } else {
    popupAddress.remove();
  }

  if (offer.price) {
    popupPrice.textContent = offer.price;
  } else {
    popupPriceContainer.remove();
  }

  if (offer.type) {
    popupType.textContent = typesHousingToRussian[offer.type];
  } else {
    popupType.remove();
  }

  if (offer.rooms && (offer.guests === undefined)) {
    popupCapacity.textContent = `${offer.rooms} ${fixRoomName(offer.rooms)}`;
  }
  if (offer.guests && (offer.rooms === undefined)) {
    popupCapacity.textContent = `для ${offer.guests} ${fixGuestName(offer.guests)}`;
  }
  if (offer.rooms && offer.guests) {
    popupCapacity.textContent = `${offer.rooms} ${fixRoomName(offer.rooms)} для ${offer.guests} ${fixGuestName(offer.guests)}`;
  } else {
    popupCapacity.remove();
  }

  if (offer.checkout && (offer.checkin === undefined)) {
    popupTime.textContent = `Выезд до ${offer.checkout}`;
  }
  if (offer.checkin && (offer.checkout === undefined)) {
    popupTime.textContent = `Заезд после ${offer.checkin}`;
  }
  if (offer.checkout && offer.checkin) {
    popupTime.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  } else {
    popupTime.remove();
  }

  if (offer.description) {
    popupDescription.textContent = offer.description;
  } else {
    popupDescription.remove();
  }

  if (offer.features) {
    featureList.forEach((featureListItem) => {
      const isNecessary = offer.features.some(
        (offerFeature) => featureListItem.classList.contains(`popup__feature--${offerFeature}`),
      );

      if (!isNecessary) {
        featureListItem.remove();
      }
    });
  } else {
    featureContainer.remove();
  }

  advertisementElement.querySelector('.popup__photo').remove();
  if (offer.photos) {
    offer.photos.forEach((photo) => {
      photosContainer.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  } else {
    photosContainer.remove();
  }
  containerOfAdvertisements.appendChild(advertisementElement);
});
