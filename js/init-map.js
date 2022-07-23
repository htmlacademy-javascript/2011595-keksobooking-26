import './form-image.js';
import { changeFormsState } from './activate-page.js';
import { createMap, mainPinMarker } from './map-util.js';
import { resetFilterForm, resetNoticeForm } from './reset-forms.js';
import { resetSlider } from './slider.js';
import { noticeForm } from './form-validation.js';
import { CENTRE_CITY, MAP_ZOOM } from './map-data.js';
import { setAddress } from './util.js';

changeFormsState(false);

// Инициализация карты, в случае успешной загрузки переводит форму в активное состояние и запускает валидацию
const map = createMap();

// Запись координат основной метки в поле адрес
mainPinMarker.on('moveend', (evt) => {
  setAddress(evt.target.getLatLng());
});

const resetMap = () => {
  map.setView(CENTRE_CITY, MAP_ZOOM).closePopup();
  mainPinMarker.setLatLng(CENTRE_CITY);
};

export const onNoticeFormReset = () => {
  resetFilterForm();
  resetNoticeForm();
  resetSlider();
  resetMap();
};

noticeForm.addEventListener('reset', onNoticeFormReset);
