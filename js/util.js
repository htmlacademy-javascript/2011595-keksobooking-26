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

const fillInElement = (element, value, property = 'textContent') => {
  element[property] = value;
};

const removeElement = (element) => {
  element.remove();
};

const removeParentElement = (element) => {
  element.parentElement.remove();
};

const checkValue = (element, value, property = 'textContent') => {
  if (value) {
    fillInElement(element, value, property);
  } else {
    removeElement(element);
  }
};

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

const checkValueOfRoomsAndGuests = (element, rooms, guests) => {
  if (!rooms && !guests) {
    removeElement(element);
  } else {
    fillInRoomsAndGuests(rooms, guests, element);
  }
};

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

const checkValueOfCheckoutAndCheckin = (element, checkout, checkin) => {
  if (!checkout && !checkin) {
    removeElement(element);
  } else {
    fillInCheckoutAndCheckin(element, checkout, checkin);
  }
};

const fillInPhoto = (element, photos) => {
  photos.forEach((photo) => {
    element.insertAdjacentHTML(
      'beforeend',
      `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`
    );
  });
};

const checkValueOfPhoto = (element, photos) => {
  if (photos) {
    fillInPhoto(element, photos);
  } else {
    removeElement(element);
  }
};

const checkContainOfChildElement = (element, modifiersOfChildElement, childElement = 'popup__feature') => {
  element.forEach((elementListItem) => {
    const isNecessary = modifiersOfChildElement.some((modifierOfChildElement) =>
      elementListItem.classList.contains(`${childElement}--${modifierOfChildElement}`)
    );

    if (!isNecessary) {
      removeElement(elementListItem);
    }
  });
};

const checkValueOfChild = (element, value) => {
  if (value) {
    checkContainOfChildElement(element, value);
  } else {
    removeParentElement(element);
  }
};

const addClass = (element, addedClass) => {
  element.classList.add(addedClass);
};

const removeClass = (element, removedClass) => {
  element.classList.remove(removedClass);
};

export {
  createNumbers,
  fixRoomName,
  fixGuestName,
  checkValue,
  checkValueOfRoomsAndGuests,
  checkValueOfCheckoutAndCheckin,
  checkValueOfPhoto,
  checkValueOfChild,
  addClass,
  removeClass,
};
