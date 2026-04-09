/* eslint-disable no-console */

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NAMES = ['Артём', 'Мария', 'Иван', 'Анна', 'Дмитрий', 'Елена', 'Сергей', 'Ольга'];

const DESCRIPTIONS = [
  'Отличный день!',
  'Прекрасный вид',
  'Незабываемый момент',
  'Лучший отпуск',
  'Море и солнце',
  'С друзьями весело',
  'Природа прекрасна',
  'Городские джунгли',
];

const PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;

let commentId = 0;

const createMessage = () => {
  const sentenceCount = getRandomInteger(1, 2);
  const messages = [];

  for (let i = 0; i < sentenceCount; i++) {
    messages.push(MESSAGES[getRandomInteger(0, MESSAGES.length - 1)]);
  }

  return messages.join(' ');
};

const createComment = () => {
  commentId++;
  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: createMessage(),
    name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  };
};

const createComments = () => {
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const comments = [];

  for (let i = 0; i < commentsCount; i++) {
    comments.push(createComment());
  }

  return comments;
};

const createPhoto = (index) => ({
  id: index,
  url: `photos/${index}.jpg`,
  description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
  likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
  comments: createComments(),
});

const createPhotos = () => {
  const result = [];

  for (let i = 1; i <= PHOTOS_COUNT; i++) {
    result.push(createPhoto(i));
  }

  return result;
};

const photos = createPhotos();


console.log(photos);
