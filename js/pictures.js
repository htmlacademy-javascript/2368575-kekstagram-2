import { openBigPicture } from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createPictureElement = (picture) => {
  const { url, description, likes, comments } = picture;
  const pictureElement = pictureTemplate.cloneNode(true);

  const pictureImg = pictureElement.querySelector('.picture__img');
  pictureImg.src = url;
  pictureImg.alt = description;

  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  pictureElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    openBigPicture(picture);
  });

  return pictureElement;
};

const renderPictures = (pictures) => {
  const fragment = document.createDocumentFragment();

  pictures.forEach((picture) => {
    const pictureElement = createPictureElement(picture);
    fragment.appendChild(pictureElement);
  });

  picturesContainer.innerHTML = '';
  picturesContainer.appendChild(fragment);
};

export { renderPictures };
