import { addClass, removeClass } from './util.js';

const CLASS_FORM_DISABLED = 'ad-form--disabled';

export const changeClassOfElement = (element, condition, stateClass = CLASS_FORM_DISABLED) => {
  if (condition) {
    removeClass(element, stateClass);
  } else {
    addClass(element, stateClass);
  }
};

export const changeConditionOfElement = (element, condition) => {
  element.disabled = !condition;
};
//
// const changeConditionOfSlider = (element, condition) => {
//   if (condition) {
//     element.removeAttribute('disabled');
//   } else {
//     element.setAttribute('disabled', condition);
//   }
// };
//
export const changeConditionOfCollection = (collection, condition) => {
  collection.forEach((element) => {
    changeConditionOfElement(element, condition);
  });
};
//
// export {
//   changeClassOfElement,
//   changeConditionOfCollection,
//   changeConditionOfElement,
//   changeConditionOfSlider,
// };
