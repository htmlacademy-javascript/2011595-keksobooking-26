import { sendData } from './api.js';
import { createErrorMessage, createSuccessMessage } from './massage.js';
import { onNoticeFormReset } from './init-map.js';
import { checkStateOfSubmit } from './state-submit-button.js';
import {
  CapacityOption,
  PRICE_MAX,
  TextErrors,
  TitleLength,
  TypePrice,
} from './form-validation-data.js';

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
const validateTitle = (value) => value.length >= TitleLength.MIN && value.length <= TitleLength.MAX;

const getErrorTitleMessage = (value) => {
  if (value.length <= TitleLength.MIN) {
    return `Минимальная длина ${TitleLength.MIN} символов`;
  }
  if (value.length >= TitleLength.MAX) {
    return `Максимальная длина ${TitleLength.MAX} символов`;
  }
};

// Валидация поля «Цена за ночь» с зависимостью минимальной цены и плейсхолдера от поля «Тип жилья»

const validatePrice = () =>
  Number(priceField.value) >= TypePrice[typeField.value] && Number(priceField.value) <= PRICE_MAX;

const getErrorPriceMessage = () => {
  if (Number(priceField.value) < TypePrice[typeField.value]) {
    return `Минимальная цена должна быть больше ${TypePrice[typeField.value]}`;
  }
  if (Number(priceField.value) > PRICE_MAX) {
    return `Цена не должна превышать ${PRICE_MAX}`;
  }
};

const setPlaceholderForPrice = () => {
  priceField.placeholder = TypePrice[typeField.value];
};

const onTypeFieldChange = () => {
  setPlaceholderForPrice();
  pristine.validate(priceField);
};

// // Синхронизация «Количество комнат» с полем «Количество мест»
const validateRoomsAndGuests = () =>
  (Number(guestField.value) <= Number(roomField.value) &&
    Number(roomField.value) !== CapacityOption.MAX_ROOMS &&
    Number(guestField.value) !== CapacityOption.NOT_GUESTS) ||
  (Number(roomField.value) === CapacityOption.MAX_ROOMS &&
    Number(guestField.value) === CapacityOption.NOT_GUESTS);

const getErrorGuestsMessage = () => {
  if (Number(roomField.value) < Number(guestField.value)) {
    return TextErrors.ROOMS_LESS_GUESTS;
  }
  if (
    (Number(roomField.value) === CapacityOption.MAX_ROOMS &&
      Number(guestField.value) !== CapacityOption.NOT_GUESTS) ||
    (Number(roomField.value) !== CapacityOption.MAX_ROOMS &&
      Number(guestField.value) === CapacityOption.NOT_GUESTS)
  ) {
    return TextErrors.NOT_FOR_GUESTS;
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
