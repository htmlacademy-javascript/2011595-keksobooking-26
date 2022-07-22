import {changeFormsState} from './activate-page.js';
import { CENTRE_CITY, MAP_ZOOM } from './map-data.js';
import { setNoticeFormSubmit} from './form-validation.js';
import {createErrorMessage, createSuccessMessage} from './massage.js';

const createPinIcon = ({ source, width, height, centerAnchor, bottomAnchor }) =>
  L.icon({ iconUrl: source, iconSize: [width, height], iconAnchor: [centerAnchor, bottomAnchor] });


const successfulLoadMap = () => {
  changeFormsState(true);
  setNoticeFormSubmit(createSuccessMessage, createErrorMessage);
};

const createMap = () => {
  const map = L.map('map-canvas').on('load', successfulLoadMap).setView(CENTRE_CITY, MAP_ZOOM);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  return map;
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

export { createPinIcon, createMap, createPinMarker };
