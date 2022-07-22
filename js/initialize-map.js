import {changeFormsState} from './activate-page.js';
import { createPopup } from './popup.js';
import { advertPin, CENTRE_CITY, mainPin, MAP_ZOOM } from './map-data.js';
import { createMap, createPinMarker } from './map-util.js';
import { setAddress } from './util.js';
import { resetSlider} from './slider.js';
import {noticeFormReset} from './form-validation.js';
import {resetFilterForm, resetNoticeForm} from './reset.js';

changeFormsState(false);

// Инициализация карты, в случае успешной загрузки переводит форму в активное состояние и запускает валидацию

const map = createMap();
const markerGroup = L.layerGroup().addTo(map);

// Создание и добавление на карту основной метки
const mainPinMarker = createPinMarker(CENTRE_CITY.lat, CENTRE_CITY.lng, true, mainPin);

mainPinMarker.addTo(map);

const createAdvertPinMarker = (data) => {
  const advertPinMarker = createPinMarker(data.location.lat, data.location.lng, false, advertPin);
  advertPinMarker.addTo(markerGroup).bindPopup(createPopup(data));
};

const createMarkersForAdverts = (advertsData) => {
  advertsData.forEach((advert) => {
    createAdvertPinMarker(advert);
  });
};

// Возвращает "основную" метку и вид в дефолтное положение по сбросу формы

// Запись координат основной метки в поле адрес
mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const resetMap = () => {
  map.setView(CENTRE_CITY, MAP_ZOOM).closePopup();
  mainPinMarker.setLatLng(CENTRE_CITY);
};

const onNoticeFormReset = () => {
  resetFilterForm();
  resetNoticeForm();
  resetSlider();
  resetMap();
};

// 99 проблем
// const resetPage = onNoticeFormReset();

noticeFormReset.addEventListener('click', () => {
  onNoticeFormReset();
});

export { createMarkersForAdverts, map, mainPinMarker };
