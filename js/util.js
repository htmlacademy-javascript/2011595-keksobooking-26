import { addressField } from './form-validation.js';

const DIGITS_AFTER_POINT = 5;

const fixRoomName = (value) => {
  switch (value) {
    case 1:
      return 'комната';
    case 2:
    case 3:
    case 4:
      return 'комнаты';
    default:
      return 'комнат';
  }
};

const fixGuestName = (value) => {
  switch (value) {
    case 1:
      return 'гостя';
    default:
      return 'гостей';
  }
};

export const fillInElement = (element, value, property = 'textContent') => {
  element[property] = value;
};

const removeElement = (element) => {
  element.remove();
};

const removeParentElement = (element) => {
  element.remove();
};

export const checkValue = (element, value, property = 'textContent') =>
  value ? fillInElement(element, value, property) : removeElement(element);

const fillInRoomsAndGuests = (rooms, guests, element) => {
  if (rooms && !guests) {
    element.textContent = `${rooms} ${fixRoomName(rooms)}`;
  }
  if (!rooms && guests) {
    element.textContent = `для ${guests} ${fixGuestName(guests)}`;
  }
  if (rooms && guests) {
    element.textContent = `${rooms} ${fixRoomName(rooms)} для ${guests} ${fixGuestName(guests)}`;
  }
};

export const checkValueOfRoomsAndGuests = (element, rooms, guests) =>
  !rooms && !guests ? removeElement(element) : fillInRoomsAndGuests(rooms, guests, element);

const fillInCheckoutAndCheckin = (element, checkout, checkin) => {
  if (checkout && !checkin) {
    element.textContent = `Выезд до ${checkout}`;
  }
  if (!checkout && checkin) {
    element.textContent = `Заезд после ${checkin}`;
  }
  if (checkout && checkin) {
    element.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  }
};

export const checkValueOfCheckoutAndCheckin = (element, checkout, checkin) =>
  !checkout && !checkin
    ? removeElement(element)
    : fillInCheckoutAndCheckin(element, checkout, checkin);

const fillInPhoto = (element, photos) => {
  photos.forEach((photo) => {
    element.insertAdjacentHTML(
      'beforeend',
      `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
    );
  });
};

export const checkValueOfPhoto = (element, photos) =>
  photos ? fillInPhoto(element, photos) : removeElement(element);

const checkContainOfChildElement = (
  element,
  modifiersOfChildElement,
  childElement = 'popup__feature'
) => {
  element.forEach((elementListItem) => {
    const isNecessary = modifiersOfChildElement.some((modifierOfChildElement) =>
      elementListItem.classList.contains(`${childElement}--${modifierOfChildElement}`)
    );

    if (!isNecessary) {
      removeElement(elementListItem);
    }
  });
};

export const checkValueOfChild = (list, value, parent) =>
  value ? checkContainOfChildElement(list, value) : removeParentElement(parent);

export const addClass = (element, addedClass) => {
  element.classList.add(addedClass);
};

export const removeClass = (element, removedClass) => {
  element.classList.remove(removedClass);
};

export const setAddress = ({ lat, lng }) => {
  const latitude = Number(lat.toFixed(DIGITS_AFTER_POINT));
  const longitude = Number(lng.toFixed(DIGITS_AFTER_POINT));
  addressField.value = `${latitude}, ${longitude}`;
};

export const debounce = (callback, timeoutDelay = 500) => {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
};
