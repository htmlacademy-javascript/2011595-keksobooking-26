import {
  addClass,
  removeClass,
} from './util.js';

const CLASS_FORM_DISABLED = 'ad-formValidation--disabled';

const changeClassOfElement = (element, condition, stateClass = CLASS_FORM_DISABLED) => {
  if (condition) {
    removeClass(element, stateClass);
  } else {
    addClass(element, stateClass);
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

export { changeClassOfElement, changeConditionOfCollection, changeConditionOfElement };
