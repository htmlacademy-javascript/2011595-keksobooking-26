import {
  checkStateOfForm,
  changeConditionOfCollection,
  changeConditionOfElement,
} from './activate-page-util.js';

const changeFormState = (condition) => {
  const form = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');
  const formHeader = form.querySelector('.ad-form-header');
  const formElements = form.querySelectorAll('.ad-form__element');
  const mapFilters = mapForm.querySelectorAll('.map__filter');
  const mapCheckboxes = mapForm.querySelectorAll('.map__checkbox');

  checkStateOfForm(form, mapForm, condition);

  changeConditionOfElement(formHeader, condition);

  changeConditionOfCollection(formElements, condition);

  changeConditionOfCollection(mapFilters, condition);

  changeConditionOfCollection(mapCheckboxes, condition);
};

export { changeFormState };
