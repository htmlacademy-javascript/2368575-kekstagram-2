import { renderPictures } from './pictures.js';
import { initBigPictureHandlers } from './big-picture.js';
import { initFormUpload } from './form-upload.js';
import { getData } from './api.js';
import { showDataError } from './messages.js';
import { initFilters } from './filters.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
    initFilters(pictures);
  })
  .catch(() => {
    showDataError();
  });

initBigPictureHandlers();
initFormUpload();

