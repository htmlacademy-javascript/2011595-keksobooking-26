const form = document.querySelector('.ad-form');
const titleField = form.querySelector('#title');
const typeField = form.querySelector('#type');
const priceField = form.querySelector('#price');
const roomsField = form.querySelector('#room_number');
const guestsField = form.querySelector('#capacity');
const checkinField = form.querySelector('#timein');
const checkoutField = form.querySelector('#timeout');

const MAX_PRICE = 100000;

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

const pristine = new Pristine(form, {
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

pristine.addValidator(titleField, validateTitle, getErrorTitleMessage);

// Валидация поля «Цена за ночь» с зависимостью минимальной цены и плейсхолдера от поля «Тип жилья»

const validatePrice = () =>
  Number(priceField.value) >= TYPE_PRICE[typeField.value] && Number(priceField.value) <= MAX_PRICE;

const getErrorPriceMessage = () => {
  if (Number(priceField.value) < TYPE_PRICE[typeField.value]) {
    return `Минимальная цена должна быть больше ${TYPE_PRICE[typeField.value]}`;
  }
  if (Number(priceField.value) > MAX_PRICE) {
    return `Цена не должна превышать ${MAX_PRICE}`;
  }
};

pristine.addValidator(priceField, validatePrice, getErrorPriceMessage);

const setPlaceholderForType = () => {
  Object.keys(TYPE_PRICE).forEach((type) => {
    if (typeField.value === type) {
      priceField.placeholder = TYPE_PRICE[type];
    }
  });
};

const onTypeFieldChange = () => {
  setPlaceholderForType();
  pristine.validate(priceField);
};

typeField.addEventListener('change', onTypeFieldChange);

// Синхронизация «Количество комнат» с полем «Количество мест»

const validateRoomsAndGuests = () =>
  (Number(guestsField.value) <= Number(roomsField.value) &&
    Number(roomsField.value) !== CAPACITY_OPTION.maxRoom &&
    Number(guestsField.value) !== CAPACITY_OPTION.notGuests) ||
  (Number(roomsField.value) === CAPACITY_OPTION.maxRoom &&
    Number(guestsField.value) === CAPACITY_OPTION.notGuests);

const getErrorGuestsMessage = () => {
  if (Number(roomsField.value) < Number(guestsField.value)) {
    return 'Количество гостей не должно превышать количество комнат';
  }
  if (
    (Number(roomsField.value) === CAPACITY_OPTION.maxRoom &&
      Number(guestsField.value) !== CAPACITY_OPTION.notGuests) ||
    (Number(roomsField.value) !== CAPACITY_OPTION.maxRoom &&
      Number(guestsField.value) === CAPACITY_OPTION.notGuests)
  ) {
    return '100 комнат - не для гостей';
  }
};

pristine.addValidator(guestsField, validateRoomsAndGuests, getErrorGuestsMessage);

const onRoomsFieldChange = () => {
  pristine.validate(guestsField);
};

const onGuestsFieldChange = () => {
  pristine.validate(guestsField);
};

roomsField.addEventListener('change', onRoomsFieldChange);
guestsField.addEventListener('change', onGuestsFieldChange);

// Синхронизация полей «Время заезда» и «Время выезда»

const onCheckinFieldChange = () => {
  if (checkinField.value !== checkoutField.value) {
    checkoutField.value = checkinField.value;
  }
};

const onCheckoutFieldChange = () => {
  if (checkoutField.value !== checkinField.value) {
    checkinField.value = checkoutField.value;
  }
};

checkinField.addEventListener('change', onCheckinFieldChange);
checkoutField.addEventListener('change', onCheckoutFieldChange);

form.addEventListener(
  'submit',
  (evt) => {
    evt.preventDefault();
    pristine.validate();
  },
  true
);
