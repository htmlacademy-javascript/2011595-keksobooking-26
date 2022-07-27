import { addClass, removeClass } from './util.js';

const CLASS_FORM_DISABLED = 'ad-form--disabled';

export const changeClassOfElement = (element, condition, stateClass = CLASS_FORM_DISABLED) =>
  condition ? removeClass(element, stateClass) : addClass(element, stateClass);

export const changeConditionOfElement = (element, condition) => {
  element.disabled = !condition;
};

export const changeConditionOfSlider = (element, condition) =>
  condition ? element.removeAttribute('disabled') : element.setAttribute('disabled', condition);

export const changeConditionOfCollection = (collection, condition) => {
  collection.forEach((element) => {
    changeConditionOfElement(element, condition);
  });
};
