import { checkValue } from './util.js';

const TEXT_NOTICE = 'Ошибка получения данных с сервера';
const TEXT_BUTTON = 'Перезагрузить страницу';

const pageBody = document.querySelector('body');

const isEscapeKey = (evt) => evt.key === 'Escape';

export const createSuccessMessage = () => {
  const successMessageTemplate = document
    .querySelector('#success')
    .content.querySelector('.success');
  const successMessage = successMessageTemplate.cloneNode(true);

  const onSuccessMessageClick = (evt) => {
    if (evt.target === successMessage) {
      successMessage.remove();
    }

    removeSuccessMessageListeners();
  };

  const onSuccessMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successMessage.remove();
    }

    removeSuccessMessageListeners();
  };

  function removeSuccessMessageListeners() {
    document.removeEventListener('click', onSuccessMessageClick);
    document.removeEventListener('keydown', onSuccessMessageEscKeydown);
  }

  document.addEventListener('click', onSuccessMessageClick);
  document.addEventListener('keydown', onSuccessMessageEscKeydown);

  pageBody.append(successMessage);
};

export const createErrorMessage = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorMessageTemplate.cloneNode(true);
  const errorMessageButton = errorMessage.querySelector('.error__button');

  const onErrorMessageButtonClick = () => {
    errorMessage.remove();

    removeErrorMessageListeners();
  };

  const onErrorMessageClick = (evt) => {
    if (evt.target === errorMessage) {
      errorMessage.remove();
    }

    removeErrorMessageListeners();
  };

  const onErrorMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessage.remove();
    }

    removeErrorMessageListeners();
  };

  function removeErrorMessageListeners() {
    errorMessageButton.removeEventListener('click', onErrorMessageButtonClick);
    document.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorMessageEscKeydown);
  }

  errorMessageButton.addEventListener('click', onErrorMessageButtonClick);
  document.addEventListener('click', onErrorMessageClick);
  document.addEventListener('keydown', onErrorMessageEscKeydown);

  pageBody.append(errorMessage);
};

export const createErrorMessageLoad = () => {
  const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessageLoad = errorMessageTemplate.cloneNode(true);
  const errorMessageButtonLoad = errorMessageLoad.querySelector('.error__button');
  const errorMessageTextLoad = errorMessageLoad.querySelector('.error__message');

  checkValue(errorMessageButtonLoad, TEXT_BUTTON);
  checkValue(errorMessageTextLoad, TEXT_NOTICE);

  const onErrorMessageLoadEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorMessageLoad.remove();
    }

    removeErrorMessageListeners();
  };

  const onErrorMessageLoadClick = (evt) => {
    if (evt.target === errorMessageLoad) {
      errorMessageLoad.remove();
    }

    removeErrorMessageListeners();
  };

  const onErrorMessageLoadButtonClick = () => {
    window.location.reload();
  };

  function removeErrorMessageListeners() {
    document.removeEventListener('click', onErrorMessageLoadClick);
    document.removeEventListener('keydown', onErrorMessageLoadEscKeydown);
  }

  document.addEventListener('click', onErrorMessageLoadClick);

  document.addEventListener('keydown', onErrorMessageLoadEscKeydown);

  errorMessageButtonLoad.addEventListener('click', onErrorMessageLoadButtonClick);

  pageBody.append(errorMessageLoad);
};
