const scaleControlSmaller = document.querySelector('.scale__control--smaller');
const scaleControlBigger = document.querySelector('.scale__control--bigger');
const scaleControlValue = document.querySelector('.scale__control--value');
const imgUploadPreview = document.querySelector('.img-upload__preview img');

const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

let currentScale = SCALE_DEFAULT;

const updateScale = () => {
  scaleControlValue.value = `${currentScale}%`;
  imgUploadPreview.style.transform = `scale(${currentScale / 100})`;
};

const onScaleSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    updateScale();
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    updateScale();
  }
};

const resetScale = () => {
  currentScale = SCALE_DEFAULT;
  updateScale();
};

const initScale = () => {
  scaleControlSmaller.addEventListener('click', onScaleSmallerClick);
  scaleControlBigger.addEventListener('click', onScaleBiggerClick);
};

export { initScale, resetScale };
