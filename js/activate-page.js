const changeFormState = (toEnabledOrDisabled) => {
  const form = document.querySelector('.ad-form');
  const mapForm = document.querySelector('.map__filters');
  const formHeader = form.querySelector('.ad-form-header');

  if (toEnabledOrDisabled) {
    form.classList.remove('ad-form--disabled');
    mapForm.classList.remove('ad-form--disabled');
  } else {
    form.classList.add('ad-form--disabled');
    mapForm.classList.add('ad-form--disabled');
  }

  formHeader.disabled = !toEnabledOrDisabled;

  form.querySelectorAll('.ad-form__element').forEach((field) => {
    field.disabled = !toEnabledOrDisabled;
  });

  mapForm.querySelectorAll('.map__filter').forEach((select) => {
    select.disabled = !toEnabledOrDisabled;
  });

  mapForm.querySelectorAll('.map__checkbox').forEach((checkbox) => {
    checkbox.disabled = !toEnabledOrDisabled;
  });
};

export { changeFormState };
