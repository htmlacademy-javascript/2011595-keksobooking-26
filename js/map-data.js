// import { splitString } from './util.js';
// import { addressField } from './form-validation.js';
import { createPinIcon } from './map-util.js';

const MAP_ZOOM = 13;

// const coordinates = splitString(addressField.value);

const CENTRE_CITY = {
  lat: 35.675,
  lng: 139.75,
};

const MAIN_PIN = {
  source: './img/main-pin.svg',
  width: 52,
  height: 52,
  centerAnchor: 26,
  bottomAnchor: 52,
};

const ADVERT_PIN = {
  source: './img/pin.svg',
  width: 40,
  height: 40,
  centerAnchor: 20,
  bottomAnchor: 40,
};

const mainPin = createPinIcon(MAIN_PIN);
const advertPin = createPinIcon(ADVERT_PIN);

export { MAP_ZOOM, CENTRE_CITY, mainPin, advertPin };
