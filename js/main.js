import { changeFormsState } from './activate-page.js';
import { initializeMap } from './initialize-map.js';
import { similarAdds } from './popup.js';
import './slider.js';

// При открытии страница находится в неактивном состоянии:
changeFormsState(false);
// Загрузка и успешная инициализация карты
const condition = true;
if (condition) {
  initializeMap(similarAdds);
  // Перевод страницы в активное состояние
  // changeFormsState(true);
  // Вносить изменения в форму и отправлять её на сервер;
  // noticeForm.addEventListener('submit', onNoticeFormSubmit);
  // Фильтрация.
}
