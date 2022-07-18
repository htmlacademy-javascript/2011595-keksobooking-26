import {
  changeClassOfElement,
  changeConditionOfCollection,
  changeConditionOfElement,
  changeConditionOfSlider,
} from './activate-page-util.js';
import { noticeForm } from './form-validation.js';
import { noticeFormSlider } from './slider.js';

const filtersForm = document.querySelector('.map__filters');
const formHeader = noticeForm.querySelector('.ad-form-header');
const formElements = noticeForm.querySelectorAll('.ad-form__element');
const selectsOfFiltersForm = filtersForm.querySelectorAll('.map__filter');
const checkboxesOfFiltersForm = filtersForm.querySelectorAll('.map__checkbox');
const elementsOfForms = [formElements, selectsOfFiltersForm, checkboxesOfFiltersForm];
const forms = [noticeForm, filtersForm];

const changeFormsState = (condition) => {
  forms.forEach((form) => {
    changeClassOfElement(form, condition);
  });

  elementsOfForms.forEach((elements) => {
    changeConditionOfCollection(elements, condition);
  });

  changeConditionOfElement(formHeader, condition);

  changeConditionOfSlider(noticeFormSlider, condition);
};

export { changeFormsState, noticeForm };
