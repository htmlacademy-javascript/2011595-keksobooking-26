import {noticeForm, priceField} from './form-validation.js';
import { EXTREME, STEP } from './slider-data.js';
import {getValue, setValue} from './slider-util.js';

export const noticeFormSlider = noticeForm.querySelector('.ad-form__slider');

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

priceField.addEventListener('change', setValue);
noticeFormSlider.noUiSlider.on('update', getValue);
export const resetSlider = () => noticeFormSlider.noUiSlider.set(EXTREME.min);
