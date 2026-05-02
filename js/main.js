/* eslint-disable no-console */

import { renderPictures } from './pictures.js';
import { initBigPictureHandlers } from './big-picture.js';
import { initFormUpload } from './form-upload.js';
import { getData } from './api.js';
import { showDataError } from './messages.js';

getData()
  .then((pictures) => {
    renderPictures(pictures);
  })
  .catch(() => {
    showDataError();
  });

initBigPictureHandlers();
initFormUpload();

