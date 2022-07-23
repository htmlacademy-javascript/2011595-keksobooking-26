import { sendData } from './api.js';
import { createErrorMessage, createSuccessMessage } from './massage.js';
import { onNoticeFormReset } from './initialize-map.js';
import { checkStateOfSubmit } from './state-submit-button.js';
import { CAPACITY_OPTION, TEXT_ERRORS, TITLE_LENGTH, TYPE_PRICE } from './form-validation-data.js';

export const noticeForm = document.querySelector('.ad-form');
const titleField = noticeForm.querySelector('#title');
const typeField = noticeForm.querySelector('#type');
export const priceField = noticeForm.querySelector('#price');
const roomField = noticeForm.querySelector('#room_number');
const guestField = noticeForm.querySelector('#capacity');
const checkinField = noticeForm.querySelector('#timein');
const checkoutField = noticeForm.querySelector('#timeout');
export const addressField = noticeForm.querySelector('#address');

const pristine = new Pristine(noticeForm, {
  classTo: 'ad-form__element',
  successClass: 'ad-form__element--valid',
  errorClass: 'ad-form__element--invalid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'ad-form__error-text',
});

// Валидация заголовка объявления
const validateTitle = (value) =>
  value.length >= TITLE_LENGTH.min && value.length <= TITLE_LENGTH.max;

const getErrorTitleMessage = (value) => {
  if (value.length <= TITLE_LENGTH.min) {
    return `Минимальная длина ${TITLE_LENGTH.min} символов`;
  }
  if (value.length >= TITLE_LENGTH.max) {
    return `Максимальная длина ${TITLE_LENGTH.max} символов`;
  }
};

// Валидация поля «Цена за ночь» с зависимостью минимальной цены и плейсхолдера от поля «Тип жилья»

const validatePrice = () =>
  Number(priceField.value) >= TYPE_PRICE[typeField.value] &&
  Number(priceField.value) <= priceField.max;

const getErrorPriceMessage = () => {
  if (Number(priceField.value) < TYPE_PRICE[typeField.value]) {
    return `Минимальная цена должна быть больше ${TYPE_PRICE[typeField.value]}`;
  }
  if (Number(priceField.value) > priceField.max) {
    return `Цена не должна превышать ${priceField.max}`;
  }
};

const setPlaceholderForPrice = () => {
  Object.keys(TYPE_PRICE).forEach((type) => {
    if (typeField.value === type) {
      priceField.placeholder = TYPE_PRICE[type];
    }
  });
};

const onTypeFieldChange = () => {
  setPlaceholderForPrice();
  pristine.validate(priceField);
};

// // Синхронизация «Количество комнат» с полем «Количество мест»
const validateRoomsAndGuests = () =>
  (Number(guestField.value) <= Number(roomField.value) &&
    Number(roomField.value) !== CAPACITY_OPTION.maxRoom &&
    Number(guestField.value) !== CAPACITY_OPTION.notGuests) ||
  (Number(roomField.value) === CAPACITY_OPTION.maxRoom &&
    Number(guestField.value) === CAPACITY_OPTION.notGuests);

const getErrorGuestsMessage = () => {
  if (Number(roomField.value) < Number(guestField.value)) {
    return TEXT_ERRORS.roomsLessGuests;
  }
  if (
    (Number(roomField.value) === CAPACITY_OPTION.maxRoom &&
      Number(guestField.value) !== CAPACITY_OPTION.notGuests) ||
    (Number(roomField.value) !== CAPACITY_OPTION.maxRoom &&
      Number(guestField.value) === CAPACITY_OPTION.notGuests)
  ) {
    return TEXT_ERRORS.notForGuests;
  }
};

const onRoomsFieldChange = () => {
  pristine.validate(guestField);
};

const onGuestsFieldChange = () => {
  pristine.validate(guestField);
};

// Синхронизация полей «Время заезда» и «Время выезда»
const validateCheckinField = () => {
  if (checkinField.value !== checkoutField.value) {
    checkoutField.value = checkinField.value;
  }
};

const validateCheckoutField = () => {
  if (checkoutField.value !== checkinField.value) {
    checkinField.value = checkoutField.value;
  }
};

const onCheckinFieldChange = () => {
  validateCheckinField();
};

const onCheckoutFieldChange = () => {
  validateCheckoutField();
};

roomField.addEventListener('change', onRoomsFieldChange);
guestField.addEventListener('change', onGuestsFieldChange);

checkinField.addEventListener('change', onCheckinFieldChange);
checkoutField.addEventListener('change', onCheckoutFieldChange);

typeField.addEventListener('change', onTypeFieldChange);

pristine.addValidator(titleField, validateTitle, getErrorTitleMessage);
pristine.addValidator(priceField, validatePrice, getErrorPriceMessage);
pristine.addValidator(guestField, validateRoomsAndGuests, getErrorGuestsMessage);

const onSuccess = () => {
  createSuccessMessage();
  onNoticeFormReset();
};

const onError = () => {
  createErrorMessage();
};

export const onNoticeFormSubmit = (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    checkStateOfSubmit(true);
    sendData(
      () => {
        onSuccess();
        checkStateOfSubmit(false);
      },
      () => {
        onError();
        checkStateOfSubmit(false);
      },
      new FormData(evt.target)
    );
  }
};
