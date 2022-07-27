import { noticeForm } from './form-validation.js';
import { Extreme, STEP } from './slider-data.js';
import { getValue } from './slider-util.js';

export const noticeFormSlider = noticeForm.querySelector('.ad-form__slider');

noUiSlider.create(noticeFormSlider, {
  range: Extreme,
  start: Extreme.min,
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

export const resetSlider = () => noticeFormSlider.noUiSlider.set(Extreme.min);

noticeFormSlider.noUiSlider.on('update', getValue);
