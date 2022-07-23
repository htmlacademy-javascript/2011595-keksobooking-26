import { changeFormsState } from './activate-page.js';
import { ADVERT_PIN, CENTRE_CITY, MAIN_PIN, MAP_ZOOM, MAX_ADVERTS } from './map-data.js';
import { getData } from './api.js';
import { createPopup } from './popup.js';
import { noticeForm, onNoticeFormSubmit } from './form-validation.js';
import { createErrorMessageLoad } from './massage.js';

export const successfulLoadMap = () => {
  changeFormsState(true);
  noticeForm.addEventListener('submit', onNoticeFormSubmit);
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

const createPinIcon = ({ source, width, height, centerAnchor, bottomAnchor }) =>
  L.icon({ iconUrl: source, iconSize: [width, height], iconAnchor: [centerAnchor, bottomAnchor] });

export const mainPin = createPinIcon(MAIN_PIN);

// Создание и добавление на карту основной метки
export const mainPinMarker = createPinMarker(CENTRE_CITY.lat, CENTRE_CITY.lng, true, mainPin);

export const createMap = () => {
  const map = L.map('map-canvas').on('load', successfulLoadMap).setView(CENTRE_CITY, MAP_ZOOM);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  mainPinMarker.addTo(map);

  const advertPin = createPinIcon(ADVERT_PIN);

  const createAdvertPinMarker = (advert) => {
    const markerGroup = L.layerGroup().addTo(map);
    const advertPinMarker = createPinMarker(
      advert.location.lat,
      advert.location.lng,
      false,
      advertPin
    );
    advertPinMarker.addTo(markerGroup).bindPopup(createPopup(advert));
  };

  const createMarkersForAdverts = (advertsData) => {
    advertsData.forEach((advert) => {
      createAdvertPinMarker(advert);
    });
  };

  const onSuccessLoad = (data) => {
    // нарисовать пины 10 штук
    createMarkersForAdverts(data.slice(0, MAX_ADVERTS));
  };

  const onErrorLoad = () => {
    createErrorMessageLoad();
  };

  // Получить данные
  getData(onSuccessLoad, onErrorLoad);

  return map;
};
