import { filterForm } from './activate-page.js';
import { FILTER_PRICE } from './map-data.js';

const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRoom = filterForm.querySelector('#housing-rooms');
const filterGuest = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelectorAll('.map__checkbox');

const checkType = (dataType) => {
  const filterTypeSelect = filterType.value;

  return filterTypeSelect === 'any' || filterTypeSelect === dataType;
};

const checkPrice = (dataPrice) => {
  const filterPriceSelect = filterPrice.value;
  const advertPrice = Number(dataPrice);

  if (filterPriceSelect === 'any') {
    return true;
  }
  if (filterPriceSelect === 'low') {
    return advertPrice < FILTER_PRICE.low;
  }
  if (filterPriceSelect === 'middle') {
    return advertPrice >= FILTER_PRICE.low && advertPrice <= FILTER_PRICE.high;
  }
  if (filterPriceSelect === 'high') {
    return advertPrice > FILTER_PRICE.high;
  }
};

const checkRooms = (dataRooms) => {
  const filterRoomSelect = filterRoom.value;

  return filterRoomSelect === 'any' || Number(filterRoomSelect) === Number(dataRooms);
};

const checkGuests = (dataGuests) => {
  const filterGuestSelect = filterGuest.value;

  return filterGuestSelect === 'any' || Number(filterGuestSelect) === Number(dataGuests);
};

const checkFeature = (dataFeature) => {
  const checkedFilterFeatures = [];
  const advertFeatures = dataFeature;

  filterFeatures.forEach((feature) => {
    if (feature.checked) {
      checkedFilterFeatures.push(feature.value);
    }
  });

  if (checkedFilterFeatures.length === 0) {
    return true;
  }
  if (checkedFilterFeatures.length && advertFeatures) {
    return checkedFilterFeatures.every((feature) => advertFeatures.includes(feature));
  }
};

export const checkAdvert = ({ offer }) => {
  const { type, price, rooms, guests, features } = offer;

  return (
    checkType(type) &&
    checkPrice(price) &&
    checkRooms(rooms) &&
    checkGuests(guests) &&
    checkFeature(features)
  );
};

export const setFilter = (cb) => {
  filterForm.addEventListener('change', () => {
    cb();
  });
};
