import {
  addClass,
  removeClass,
} from './util.js';

const CLASS_FORM_DISABLED = 'ad-form--disabled';

const changeClassOfForms = (form, mapForm, condition, stateClass = CLASS_FORM_DISABLED) => {
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

export { changeClassOfForms, changeConditionOfCollection, changeConditionOfElement };
