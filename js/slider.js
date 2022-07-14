import { noticeForm, priceField } from './form-validation.js';
import { EXTREME, STEP } from './slider-data.js';

const noticeFormSlider = noticeForm.querySelector('.ad-form__slider');

noUiSlider.create(noticeFormSlider, {
  range: EXTREME,
  start: EXTREME.min,
  step: STEP,
  connect: 'lower',
  format: {
    to: function (value) {
      return value;
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

noticeFormSlider.noUiSlider.on('update', () => {
  priceField.value = noticeFormSlider.noUiSlider.get();
});

export { noticeFormSlider };
