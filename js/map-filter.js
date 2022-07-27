import { filterForm } from './activate-page.js';
import {FILTER_DEFAULT_VALUE, FilterPrice} from './map-data.js';

const filterType = filterForm.querySelector('#housing-type');
const filterPrice = filterForm.querySelector('#housing-price');
const filterRoom = filterForm.querySelector('#housing-rooms');
const filterGuest = filterForm.querySelector('#housing-guests');
const filterFeatures = filterForm.querySelectorAll('.map__checkbox');

const checkType = (dataType) => {
  const filterTypeSelect = filterType.value;

  return filterTypeSelect === FILTER_DEFAULT_VALUE || filterTypeSelect === dataType;
};

const checkPrice = (dataPrice) => {
  const filterPriceSelect = filterPrice.value;
  const advertPrice = Number(dataPrice);

  if (filterPriceSelect === FILTER_DEFAULT_VALUE) {
    return true;
  }
  if (filterPriceSelect === FilterPrice.LOW_VALUE) {
    return advertPrice < FilterPrice.LOW;
  }
  if (filterPriceSelect === FilterPrice.MIDDLE_VALUE) {
    return advertPrice >= FilterPrice.LOW && advertPrice <= FilterPrice.HIGH;
  }
  if (filterPriceSelect === FilterPrice.HIGH_VALUE) {
    return advertPrice > FilterPrice.HIGH;
  }
};

const checkRooms = (dataRooms) => {
  const filterRoomSelect = filterRoom.value;

  return filterRoomSelect === FILTER_DEFAULT_VALUE || Number(filterRoomSelect) === Number(dataRooms);
};

const checkGuests = (dataGuests) => {
  const filterGuestSelect = filterGuest.value;

  return filterGuestSelect === FILTER_DEFAULT_VALUE || Number(filterGuestSelect) === Number(dataGuests);
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
