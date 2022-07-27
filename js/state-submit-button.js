import { changeConditionOfElement } from './activate-page-util.js';
import { fillInElement } from './util.js';

const TEXT_STATE_DEFAULT = 'Опубликовать';
const TEXT_STATE_PUBLICATION = 'Публикую...';

const noticeFormSubmit = document.querySelector('.ad-form__submit');

const changeStateOfElement = (element, text, condition) => {
  changeConditionOfElement(element, !condition);
  fillInElement(element, text);
};

export const checkStateOfSubmit = (condition) =>
  condition
    ? changeStateOfElement(noticeFormSubmit, TEXT_STATE_PUBLICATION, condition)
    : changeStateOfElement(noticeFormSubmit, TEXT_STATE_DEFAULT, condition);
