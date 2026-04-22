const bigPictureElement = document.querySelector('.big-picture');
const bigPictureImg = bigPictureElement.querySelector('.big-picture__img img');
const likesCount = bigPictureElement.querySelector('.likes-count');
const commentCount = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCount = bigPictureElement.querySelector('.social__comment-total-count');
const socialCaption = bigPictureElement.querySelector('.social__caption');
const socialComments = bigPictureElement.querySelector('.social__comments');
const commentCountBlock = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');
const cancelButton = bigPictureElement.querySelector('.big-picture__cancel');

const createCommentElement = ({ avatar, name, message }) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');

  const img = document.createElement('img');
  img.classList.add('social__picture');
  img.src = avatar;
  img.alt = name;
  img.width = 35;
  img.height = 35;

  const p = document.createElement('p');
  p.classList.add('social__text');
  p.textContent = message;

  commentItem.appendChild(img);
  commentItem.appendChild(p);

  return commentItem;
};

const openBigPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  document.body.classList.add('modal-open');

  bigPictureImg.src = pictureData.url;
  bigPictureImg.alt = pictureData.description;
  likesCount.textContent = pictureData.likes;
  socialCaption.textContent = pictureData.description;

  socialComments.innerHTML = '';

  const comments = pictureData.comments;
  totalCommentCount.textContent = comments.length;
  commentCount.textContent = Math.min(5, comments.length);

  comments.forEach((comment) => {
    const commentElement = createCommentElement(comment);
    socialComments.appendChild(commentElement);
  });

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const initBigPictureHandlers = () => {
  cancelButton.addEventListener('click', () => {
    closeBigPicture();
  });

  document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape' && !bigPictureElement.classList.contains('hidden')) {
      closeBigPicture();
    }
  });
};

export { openBigPicture, closeBigPicture, initBigPictureHandlers };
