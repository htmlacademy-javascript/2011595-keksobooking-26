import { changeFormsState } from './activate-page.js';
import { createMarkersForAdverts } from './initialize-map.js';
import './slider.js';
import { getData } from './api.js';

const MAX_ADVERTS = 10;

// При открытии страница находится в неактивном состоянии:
// Загрузка и успешная инициализация карты
const condition = true;
if (condition) {
  getData(
    (adverts) => createMarkersForAdverts(adverts.slice(0, MAX_ADVERTS)),
    (message) => {
      changeFormsState(false);
      // eslint-disable-next-line no-alert
      alert(message);
    }
  );
  // Перевод страницы в активное состояние
  // changeFormsState(true);
  // Вносить изменения в форму и отправлять её на сервер;
  // noticeForm.addEventListener('submit', onNoticeFormSubmit);
  // Фильтрация.
}
