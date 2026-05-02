const DATA_ERROR_SHOW_TIME = 5000;

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successElement = successTemplate.cloneNode(true);

  const closeSuccessMessage = () => {
    successElement.remove();
    document.removeEventListener('keydown', onSuccessKeydown);
    document.removeEventListener('click', onSuccessClick);
  };

  function onSuccessKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeSuccessMessage();
    }
  }

  function onSuccessClick(evt) {
    if (!evt.target.closest('.success__inner')) {
      closeSuccessMessage();
    }
  }

  successElement.querySelector('.success__button').addEventListener('click', closeSuccessMessage);
  document.addEventListener('keydown', onSuccessKeydown);
  document.addEventListener('click', onSuccessClick);

  document.body.appendChild(successElement);
};

const showErrorMessage = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorElement = errorTemplate.cloneNode(true);

  const closeErrorMessage = () => {
    errorElement.remove();
    document.removeEventListener('keydown', onErrorKeydown);
    document.removeEventListener('click', onErrorClick);
  };

  function onErrorKeydown(evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      evt.stopPropagation();
      closeErrorMessage();
    }
  }

  function onErrorClick(evt) {
    if (!evt.target.closest('.error__inner')) {
      closeErrorMessage();
    }
  }

  errorElement.querySelector('.error__button').addEventListener('click', closeErrorMessage);
  document.addEventListener('keydown', onErrorKeydown);
  document.addEventListener('click', onErrorClick);

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
