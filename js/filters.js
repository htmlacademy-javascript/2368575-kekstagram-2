import { renderPictures } from './pictures.js';
import { debounce } from './debounce.js';

const RANDOM_PICTURES_COUNT = 10;

const filtersElement = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const FilterType = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

let currentFilter = FilterType.DEFAULT;
let pictures = [];
let activeFilterButton = null;

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const getRandomPictures = (data) => shuffleArray(data).slice(0, RANDOM_PICTURES_COUNT);

const getDiscussedPictures = (data) =>
  [...data].sort((a, b) => b.comments.length - a.comments.length);

const filterPictures = () => {
  switch (currentFilter) {
    case FilterType.RANDOM:
      return getRandomPictures(pictures);
    case FilterType.DISCUSSED:
      return getDiscussedPictures(pictures);
    default:
      return [...pictures];
  }
};

const onFilterChange = debounce(() => {
  renderPictures(filterPictures());
});

const onFiltersFormClick = (evt) => {
  const target = evt.target;

  if (!target.classList.contains('img-filters__button')) {
    return;
  }

  if (target.id === currentFilter) {
    return;
  }

  activeFilterButton.classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');
  activeFilterButton = target;
  currentFilter = target.id;
  onFilterChange();
};

const initFilters = (data) => {
  pictures = data;
  activeFilterButton = filtersForm.querySelector('.img-filters__button--active');
  filtersElement.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFiltersFormClick);
};

export { initFilters };
