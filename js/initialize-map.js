import { noticeForm } from './activate-page.js';
import { createPopup } from './popup.js';
import { advertPin, CENTRE_CITY, mainPin, MAP_ZOOM } from './map-data.js';
import {createMap, createPinMarker} from './map-util.js';
import {setAddress} from './util.js';

const noticeFormReset = noticeForm.querySelector('.ad-form__reset');

// Инициализация карты, в случае успешной загрузки переводит форму в активное состояние и запускает валидацию
const initMap = (similarAdds) => {
  const map = createMap();
  const markerGroup = L.layerGroup().addTo(map);

  // Создание и добавление на карту основной метки
  const mainPinMarker = createPinMarker(CENTRE_CITY.lat, CENTRE_CITY.lng, true, mainPin);

  const createMainPinMarker = () => {
    mainPinMarker.addTo(map);
  };
  createMainPinMarker();

  // Создает маркеры объявлений и добавляет попапы
  const createAdvertPinMarker = (data) => {
    const advertPinMarker = createPinMarker(data.location.lat, data.location.lng, false, advertPin);
    advertPinMarker.addTo(markerGroup).bindPopup(createPopup(data));
  };

  similarAdds.forEach((similarAdd) => {
    createAdvertPinMarker(similarAdd);
  });

  // Возвращает "основную" метку и вид в дефолтное положение по сбросу формы
  const onNoticeFormReset = () => {
    map.setView(CENTRE_CITY, MAP_ZOOM).closePopup();
    mainPinMarker.setLatLng(CENTRE_CITY);
  };
  noticeFormReset.addEventListener('click', onNoticeFormReset);

  // Запись координат основной метки в поле адрес
  mainPinMarker.on('moveend', (evt) => {
    setAddress(evt.target.getLatLng());
  });
};

export { initMap };
