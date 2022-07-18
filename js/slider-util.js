import {priceField} from './form-validation.js';
import {noticeFormSlider} from './slider.js';

const getValue = () => {
  priceField.value = noticeFormSlider.noUiSlider.get();
};

const setValue = () => {
  noticeFormSlider.noUiSlider.set([priceField.value, null]);
};

export {getValue, setValue};
