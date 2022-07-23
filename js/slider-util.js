import { priceField } from './form-validation.js';
import {noticeFormSlider} from './slider.js';

export const getValue = () => {
  priceField.value = noticeFormSlider.noUiSlider.get();
};
