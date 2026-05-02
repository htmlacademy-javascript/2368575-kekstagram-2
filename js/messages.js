const DATA_ERROR_SHOW_TIME = 5000;

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  const onSuccessButtonClick = () => {
    successElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      onSuccessButtonClick();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      onSuccessButtonClick();
    }
  };

  successElement.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(successElement);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);

  const onErrorButtonClick = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  };

  const onDocumentKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      onErrorButtonClick();
    }
  };

  const onDocumentClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      onErrorButtonClick();
    }
  };

  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);

  document.body.appendChild(errorElement);
};

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content.querySelector('.data-error');
  const dataErrorElement = dataErrorTemplate.cloneNode(true);

  document.body.appendChild(dataErrorElement);

  setTimeout(() => {
    dataErrorElement.remove();
  }, DATA_ERROR_SHOW_TIME);
};

export { showSuccessMessage, showErrorMessage, showDataError };
