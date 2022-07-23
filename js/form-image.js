import { noticeForm } from './form-validation.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarImageChooser = noticeForm.querySelector('.ad-form-header__input');
const avatarPreview = noticeForm.querySelector('.ad-form-header__preview-image');
const houseImageChooser = noticeForm.querySelector('.ad-form__input');
const housePreview = noticeForm.querySelector('.ad-form__photo-image');
const avatarPreviewContainer = noticeForm.querySelector('.ad-form-header__preview');
const housePreviewContainer = noticeForm.querySelector('.ad-form__photo');

const setPreview = (chooser, img, container) => {
  chooser.addEventListener('change', () => {
    const file = chooser.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((fileType) => fileName.endsWith(fileType));

    if (matches) {
      img.src = URL.createObjectURL(file);
      img.style.width = '70px';
      img.style.height = '70px';
      container.style.padding = '0px';
    }
  });
};

setPreview(avatarImageChooser, avatarPreview, avatarPreviewContainer);
setPreview(houseImageChooser, housePreview, housePreviewContainer);
