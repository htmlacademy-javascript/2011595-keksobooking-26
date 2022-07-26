import { checkValue } from './util.js';

const TEXT_BUTTON = 'Перезагрузить страницу';
const TEXT_NOTICE = 'Ошибка получения данных с сервера';

const pageBody = document.querySelector('body');

const isEscapeKey = (evt) => evt.key === 'Escape';

export const createSuccessMessage = () => {
  const successMessageTemplate = document
    .querySelector('#success')
    .content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  document.addEventListener('click', (evt) => {
    if (evt.target === successMessage) {
      successMessage.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
    }
  });

  pageBody.append(successMessage);
};

export const createErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = errorMessage.querySelector('.error__button');

  errorMessageButton.addEventListener('click', () => {
    errorMessage.remove();
  });

  document.addEventListener('click', (evt) => {
    if (evt.target === errorMessage) {
      errorMessage.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessage.remove();
    }
  });

  pageBody.append(errorMessage);
};

export const createErrorMessageLoad = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageLoad = errorMessageTemplate.cloneNode(true);
  const errorMessageButtonLoad = errorMessageLoad.querySelector('.error__button');
  const errorMessageTextLoad = errorMessageLoad.querySelector('.error__message');

  checkValue(errorMessageButtonLoad, TEXT_BUTTON);
  checkValue(errorMessageTextLoad, TEXT_NOTICE);

  document.addEventListener('click', (evt) => {
    if (evt.target === errorMessageLoad) {
      errorMessageLoad.remove();
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageLoad.remove();
    }
  });

  errorMessageButtonLoad.addEventListener('click', () => {
    window.location.reload();
  });

  pageBody.append(errorMessageLoad);
};
