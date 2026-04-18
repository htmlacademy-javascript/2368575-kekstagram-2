const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

/**
 * Создает DOM-элемент миниатюры на основе шаблона #picture
 * @param {Object} data - Объект с данными фотографии
 * @param {string} data.url - Адрес изображения
 * @param {string} data.description - Описание изображения
 * @param {number} data.likes - Количество лайков
 * @param {Array} data.comments - Массив комментариев
 * @returns {HTMLElement} - DOM-элемент миниатюры
 */

const createPictureElement = ({ url, description, likes, comments }) => {
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  return pictureElement;
};

/**
 * Отрисовывает миниатюры фотографий в блок .pictures
 * @param {Array} pictures - Массив объектов с данными фотографий
 */
const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(fragment);
};

export { renderPictures };
