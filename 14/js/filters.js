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

const getRandomPictures = (data) => {
  const shuffled = [...data].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, RANDOM_PICTURES_COUNT);
};

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

  filtersForm.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  target.classList.add('img-filters__button--active');
  currentFilter = target.id;
  onFilterChange();
};

const initFilters = (data) => {
  pictures = data;
  filtersElement.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', onFiltersFormClick);
};

export { initFilters };
