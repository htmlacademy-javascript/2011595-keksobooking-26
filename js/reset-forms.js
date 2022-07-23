import { filterForm } from './activate-page.js';
import { noticeForm } from './form-validation.js';

const resetForm = (form) => {
  form.reset();
};

export const resetFilterForm = () => resetForm(filterForm);
export const resetNoticeForm = () => resetForm(noticeForm);
