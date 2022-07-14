import { changeFormsState, noticeForm } from './activate-page.js';
import { addressField, onNoticeFormSubmit } from './form-validation.js';
import { CENTRE_CITY, MAP_ZOOM } from './map-data.js';
import { DIGITS_AFTER_POINT } from './data.js';

const createPinIcon = ({ source, width, height, centerAnchor, bottomAnchor }) =>
  L.icon({ iconUrl: source, iconSize: [width, height], iconAnchor: [centerAnchor, bottomAnchor] });

const successfulLoadMap = () => {
  changeFormsState(true);
  noticeForm.addEventListener('submit', onNoticeFormSubmit);
};

const createMap = () => {
  const map = L.map('map-canvas').on('load', successfulLoadMap).setView(CENTRE_CITY, MAP_ZOOM);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
};

const setAddress = ({ lat, lng }) => {
  const latitude = Number(lat.toFixed(DIGITS_AFTER_POINT));
  const longitude = Number(lng.toFixed(DIGITS_AFTER_POINT));
  addressField.value = `${latitude}, ${longitude}`;
};

const createPinMarker = (latitude, longitude, draggable, icon) =>
  L.marker(
    {
      lat: latitude,
      lng: longitude,
    },
    {
      draggable: draggable,
      icon: icon,
    }
  );

export { createPinIcon, createMap, setAddress, createPinMarker };
