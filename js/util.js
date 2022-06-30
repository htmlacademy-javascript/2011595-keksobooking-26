import { getRandomPositiveInteger } from './random-functions.js';

const getRandomElements = (array) => {
  const randomInt = getRandomPositiveInteger(1, array.length);
  const elements = [];

  while (elements.length < randomInt) {
    const index = getRandomPositiveInteger(0, array.length - 1);
    const element = array[index];

    if (!elements.includes(element)) {
      elements.push(element);
    }
  }

  return elements;
};

const getRandomArrayElement = (elements) =>
  elements[getRandomPositiveInteger(0, elements.length - 1)];

const createNumbers = () => {
  const numbers = [];
  for (let i = 0; i < 10; i++) {
    numbers[i] = i + 1;
  }
  return numbers;
};

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

const fillingValueTextContentOrNot = (htmlAddress, valueProperty) => {
  if (valueProperty) {
    htmlAddress.textContent = valueProperty;
  } else {
    htmlAddress.remove();
  }
};

const fillingValueSrcOrNot = (htmlAddress, valueProperty) => {
  if (valueProperty) {
    htmlAddress.src = valueProperty;
  } else {
    htmlAddress.remove();
  }
};

const fillingValueTextContentOrNotForRoomsAndGuests = (
  htmlAddress,
  rooms,
  guests
) => {
  if (rooms && guests === undefined) {
    htmlAddress.textContent = `${rooms} ${fixRoomName(rooms)}`;
  }
  if (guests && rooms === undefined) {
    htmlAddress.textContent = `для ${guests} ${fixGuestName(guests)}`;
  }
  if (rooms && guests) {
    htmlAddress.textContent = `${rooms} ${fixRoomName(
      rooms
    )} для ${guests} ${fixGuestName(guests)}`;
  } else {
    htmlAddress.remove();
  }
};

const fillingValueTextContentOrNotForCheckoutAndCheckin = (
  htmlAddress,
  checkout,
  checkin
) => {
  if (checkout && checkin === undefined) {
    htmlAddress.textContent = `Выезд до ${checkout}`;
  }
  if (checkin && checkout === undefined) {
    htmlAddress.textContent = `Заезд после ${checkin}`;
  }
  if (checkout && checkin) {
    htmlAddress.textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  } else {
    htmlAddress.remove();
  }
};

export {
  getRandomElements,
  getRandomArrayElement,
  createNumbers,
  fixRoomName,
  fixGuestName,
  fillingValueSrcOrNot,
  fillingValueTextContentOrNot,
  fillingValueTextContentOrNotForRoomsAndGuests,
  fillingValueTextContentOrNotForCheckoutAndCheckin,
};
