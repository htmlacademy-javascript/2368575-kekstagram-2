const DATA_ERROR_SHOW_TIME = 5000;

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  const onSuccessKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage(); // eslint-disable-line no-use-before-define
    }
  };

  const onSuccessClick = (evt) => {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessMessage(); // eslint-disable-line no-use-before-define
    }
  };

  const closeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessClick);
  };

  const onSuccessButtonClick = () => {
    closeSuccessMessage();
  };

  successElement.querySelector('.success__button').addEventListener('click', onSuccessButtonClick);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);

  document.body.appendChild(successElement);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);

  const onErrorKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeErrorMessage(); // eslint-disable-line no-use-before-define
    }
  };

  const onErrorClick = (evt) => {
    if (!evt.target.closest('.error__inner')) {
      closeErrorMessage(); // eslint-disable-line no-use-before-define
    }
  };

  const closeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.removeEventListener('click', onErrorClick);
  };

  const onErrorButtonClick = () => {
    closeErrorMessage();
  };

  errorElement.querySelector('.error__button').addEventListener('click', onErrorButtonClick);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);

  document.body.appendChild(errorElement);
};

const showDataError = () => {
  const dataErrorTemplate = document.querySelector('#data-error').content;
  const dataErrorElement = dataErrorTemplate.cloneNode(true);
  document.body.appendChild(dataErrorElement);
  setTimeout(() => {
    document.querySelector('.data-error').remove();
  }, DATA_ERROR_SHOW_TIME);
};

export { showSuccessMessage, showErrorMessage, showDataError };

