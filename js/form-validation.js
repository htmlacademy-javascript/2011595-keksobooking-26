const noticeForm = document.querySelector('.ad-form');
const titleField = noticeForm.querySelector('#title');
const typeField = noticeForm.querySelector('#type');
const priceField = noticeForm.querySelector('#price');
const roomField = noticeForm.querySelector('#room_number');
const guestField = noticeForm.querySelector('#capacity');
const checkinField = noticeForm.querySelector('#timein');
const checkoutField = noticeForm.querySelector('#timeout');
const addressField = noticeForm.querySelector('#address');

const TEXT_ERRORS = {
  notForGuests: '100 комнат - не для гостей',
  roomsLessGuests: 'Количество гостей не должно превышать количество комнат',
};

const TITLE_LENGTH = {
  min: 30,
  max: 100,
};

const TYPE_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const CAPACITY_OPTION = {
  notGuests: 0,
  maxRoom: 100,
};

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
const price = Number(priceField.value);

const validatePrice = () => price >= TYPE_PRICE[typeField.value] && price <= priceField.max;

const getErrorPriceMessage = () => {
  if (price < TYPE_PRICE[typeField.value]) {
    return `Минимальная цена должна быть больше ${TYPE_PRICE[typeField.value]}`;
  }
  if (price > priceField.max) {
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

// Синхронизация «Количество комнат» с полем «Количество мест»
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

const onNoticeFormSubmit = (evt) => {
  evt.preventDefault();
  pristine.validate();
};

export { onNoticeFormSubmit, addressField, priceField, noticeForm };
