import { initScale, resetScale } from './scale.js';
import { initEffect, resetEffect } from './effect.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

const uploadFileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const uploadCancel = document.querySelector('#upload-cancel');
const submitButton = document.querySelector('#upload-submit');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const DEFAULT_PREVIEW_SRC = 'img/upload-default-image.jpg';

const MAX_HASHTAGS = 5;
const MAX_HASHTAG_LENGTH = 20;
const VALID_HASHTAG_REGEX = /^#[a-яёa-z0-9]{1,19}$/i;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field-wrapper__error'
});

const validateHashtags = (value) => {
  if (!value.trim()) {
    return true;
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return false;
  }

  const lowerHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerHashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    return false;
  }

  return hashtags.every((hashtag) => {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return false;
    }
    return VALID_HASHTAG_REGEX.test(hashtag);
  });
};

const getHashtagErrorMessage = (value) => {
  if (!value.trim()) {
    return '';
  }

  const hashtags = value.trim().split(/\s+/);

  if (hashtags.length > MAX_HASHTAGS) {
    return `Максимум ${MAX_HASHTAGS} хэш-тегов`;
  }

  const lowerHashtags = hashtags.map((tag) => tag.toLowerCase());
  const uniqueHashtags = new Set(lowerHashtags);

  if (uniqueHashtags.size !== hashtags.length) {
    return 'Хэш-теги не должны повторяться';
  }

  const invalidTag = hashtags.find((hashtag) => {
    if (hashtag.length > MAX_HASHTAG_LENGTH) {
      return true;
    }
    return !VALID_HASHTAG_REGEX.test(hashtag);
  });

  if (invalidTag) {
    return 'Некорректный хэш-тег';
  }

  return '';
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashtagsInput, validateHashtags, getHashtagErrorMessage);
pristine.addValidator(descriptionInput, validateDescription, 'Комментарий не должен быть длинее 140 символов');

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closeForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  pristine.reset();
  resetScale();
  resetEffect();
  imgUploadPreview.src = DEFAULT_PREVIEW_SRC;
};

const onUploadFileInputChange = () => {
  const file = uploadFileInput.files[0];
  if (file) {
    imgUploadPreview.src = URL.createObjectURL(file);
  }
  openForm();
};

const onUploadCancelClick = () => {
  closeForm();
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();
    sendData(new FormData(uploadForm))
      .then(() => {
        closeForm();
        showSuccessMessage();
      })
      .catch(() => {
        showErrorMessage();
      })
      .finally(unblockSubmitButton);
  }
};

const onDocumentKeydown = (evt) => {
  if (evt.key === 'Escape' && !uploadOverlay.classList.contains('hidden')) {
    const activeElement = document.activeElement;
    if (activeElement !== hashtagsInput && activeElement !== descriptionInput) {
      closeForm();
    }
  }
};

const initFormUpload = () => {
  initScale();
  initEffect();
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { initFormUpload };
