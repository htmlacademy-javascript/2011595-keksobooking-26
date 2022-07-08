import {
  changeClassOfElement,
  changeConditionOfCollection,
  changeConditionOfElement,
} from './activate-page-util.js';

const changeFormsState = (condition) => {
  const noticeForm = document.querySelector('.ad-form');
  const filtersForm = document.querySelector('.map__filters');
  const formHeader = noticeForm.querySelector('.ad-form-header');
  const formElements = noticeForm.querySelectorAll('.ad-form__element');
  const selectsOfFiltersForm = filtersForm.querySelectorAll('.map__filter');
  const checkboxesOfFiltersForm = filtersForm.querySelectorAll('.map__checkbox');
  const elementsOfForms = [formElements, selectsOfFiltersForm, checkboxesOfFiltersForm];
  const forms = [noticeForm, filtersForm];

  forms.forEach((form) => {
    changeClassOfElement(form, condition);
  });

  elementsOfForms.forEach((elements) => {
    changeConditionOfCollection(elements, condition);
  });

  changeConditionOfElement(formHeader, condition);
};

export { changeFormsState };
