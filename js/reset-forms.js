import { filterForm } from './activate-page.js';
import { noticeForm } from './form-validation.js';
import {avatarPreview, avatarPreviewContainer, housePreview} from './form-image.js';

const resetForm = (form) => {
  form.reset();
};

const  resetImage = (img) => {
  img.src = 'img/muffin-grey.svg';
  img.style.width = '40px';
  img.style.height = '44px';
};

const  resetContainer = (container) => {
  container.style.padding = '0px 15px';
};

const resetImages = () => {
  resetImage(avatarPreview);
  resetImage(housePreview);
  resetContainer(avatarPreviewContainer);
};

export const resetFilterForm = () => resetForm(filterForm);
export const resetNoticeForm = () => {
  resetForm(noticeForm);
  resetImages();
};
