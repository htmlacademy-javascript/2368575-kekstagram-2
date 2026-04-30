const effectLevelSlider = document.querySelector('.effect-level__slider');
const effectLevelValue = document.querySelector('.effect-level__value');
const effectsRadioList = document.querySelectorAll('.effects__radio');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectLevelContainer = document.querySelector('.img-upload__effect-level');

const EFFECTS = {
  none: {
    filter: null,
    min: 0,
    max: 100,
    step: 1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia: {
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

let currentEffect = 'none';

const updateSliderOptions = (effect) => {
  effectLevelSlider.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max
    },
    start: effect.max,
    step: effect.step
  });
};

const applyEffect = (value) => {
  const effect = EFFECTS[currentEffect];

  if (currentEffect === 'none') {
    imgUploadPreview.style.filter = '';
    effectLevelContainer.classList.add('hidden');
    return;
  }

  effectLevelContainer.classList.remove('hidden');
  imgUploadPreview.style.filter = `${effect.filter}(${value}${effect.unit})`;
};

const onSliderUpdate = () => {
  const value = effectLevelSlider.noUiSlider.get();
  effectLevelValue.value = value;
  applyEffect(value);
};

const onEffectChange = (evt) => {
  currentEffect = evt.target.value;
  updateSliderOptions(EFFECTS[currentEffect]);
  applyEffect(EFFECTS[currentEffect].max);
};

const resetEffect = () => {
  currentEffect = 'none';
  document.querySelector('#effect-none').checked = true;
  imgUploadPreview.style.filter = '';
  effectLevelContainer.classList.add('hidden');
};

const initEffect = () => {
  noUiSlider.create(effectLevelSlider, {
    range: {
      min: 0,
      max: 100
    },
    start: 100,
    step: 1,
    connect: 'lower'
  });

  effectLevelSlider.noUiSlider.on('update', onSliderUpdate);

  effectsRadioList.forEach((radio) => {
    radio.addEventListener('change', onEffectChange);
  });

  effectLevelContainer.classList.add('hidden');
};

export { initEffect, resetEffect };
