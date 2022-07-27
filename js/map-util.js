import { changeFormsState } from './activate-page.js';
import {
  AdvertPin,
  CentreCity,
  MainPin,
  MAP_ZOOM,
  MAX_ADVERTS,
} from './map-data.js';
import { getData } from './api.js';
import { createPopup } from './popup.js';
import { noticeForm, onNoticeFormSubmit } from './form-validation.js';
import { createErrorMessageLoad } from './massage.js';
import { checkAdvert, setFilter } from './map-filter.js';
import { debounce } from './util.js';

const RERENDER_DELAY = 500;

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
  L.icon({
    iconUrl: source,
    iconSize: [width, height],
    iconAnchor: [centerAnchor, bottomAnchor],
  });

export const mainPin = createPinIcon(MainPin);

// Создание и добавление на карту основной метки
export const mainPinMarker = createPinMarker(
  CentreCity.lat,
  CentreCity.lng,
  true,
  mainPin
);

export const createMap = () => {
  const map = L.map('map-canvas')
    .on('load', successfulLoadMap)
    .setView(CentreCity, MAP_ZOOM);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  mainPinMarker.addTo(map);

  const advertPin = createPinIcon(AdvertPin);

  const markerGroup = L.layerGroup().addTo(map);

  const createAdvertPinMarker = (advert) => {
    const advertPinMarker = createPinMarker(
      advert.location.lat,
      advert.location.lng,
      false,
      advertPin
    );
    advertPinMarker.addTo(markerGroup).bindPopup(createPopup(advert));
  };

  const createMarkersForAdverts = (advertsData) => {
    markerGroup.clearLayers();

    advertsData
      .filter((advert) => checkAdvert(advert))
      .slice(0, MAX_ADVERTS)
      .forEach((advert) => createAdvertPinMarker(advert));
  };

  const onSuccessLoad = (data) => {
    // нарисовать пины 10 штук
    createMarkersForAdverts(data);
    // Слушать change в форме фильтров и отрисовывать пины(с очисткой предыдущего слоя) с фильтрацией
    setFilter(debounce(() => createMarkersForAdverts(data), RERENDER_DELAY));
    noticeForm.addEventListener('reset', () => {
      createMarkersForAdverts(data);
    });
  };

  const onErrorLoad = () => {
    createErrorMessageLoad();
  };

  // Получить данные
  getData(onSuccessLoad, onErrorLoad);

  return map;
};
