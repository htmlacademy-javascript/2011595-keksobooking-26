import { changeFormsState, noticeForm } from './activate-page.js';
import { onNoticeFormSubmit } from './form-validation.js';

// При открытии страница находится в неактивном состоянии:
changeFormsState(false);
// Загрузка и успешная инициализация карты
const condition = true;
if (condition) {
  // Перевод страницы в активное состояние
  changeFormsState(true);
  // Вносить изменения в форму и отправлять её на сервер;
  noticeForm.addEventListener('submit', onNoticeFormSubmit);
  // Фильтрация.
}
