const uploadFileInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadForm = document.querySelector('#upload-select-image');
const uploadCancel = document.querySelector('#upload-cancel');
const hashtagsInput = document.querySelector('.text__hashtags');
const descriptionInput = document.querySelector('.text__description');

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

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashtagsInput, validateHashtags, 'Ошибка в хэш-тегах');
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
};

const onUploadFileInputChange = () => {
  openForm();
};

const onUploadCancelClick = () => {
  closeForm();
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    uploadForm.submit();
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
  uploadFileInput.addEventListener('change', onUploadFileInputChange);
  uploadCancel.addEventListener('click', onUploadCancelClick);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
  document.addEventListener('keydown', onDocumentKeydown);
};

export { initFormUpload };
