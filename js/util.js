import {getRandomPositiveInteger} from './random-functions.js';

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
    case 2 :
    case 3 :
    case 4 :
      return 'комнаты';
  }
  return 'комнат';
};

const fixGuestName = (value) => {
  switch (value) {
    case 1:
      return 'гостя';
  }
  return 'гостей';
};

export {getRandomElements, getRandomArrayElement, createNumbers, fixRoomName, fixGuestName};
