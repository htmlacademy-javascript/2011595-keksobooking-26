const addClass = (element, addedClass) => {
  element.classList.add(addedClass);
};

const removeClass = (element, removedClass) => {
  element.classList.remove(removedClass);
};

const checkStateOfForm = (form, mapForm, condition, stateClass = 'ad-form--disabled') => {
  if (condition) {
    removeClass(form, stateClass);
    removeClass(mapForm, stateClass);
  } else {
    addClass(form, stateClass);
    addClass(mapForm, stateClass);
  }
};

const changeConditionOfElement = (element, condition) => {
  element.disabled = !condition;
};

const changeConditionOfCollection = (collection, condition) => {
  collection.forEach((element) => {
    changeConditionOfElement(element, condition);
  });
};

export { checkStateOfForm, changeConditionOfCollection, changeConditionOfElement };
