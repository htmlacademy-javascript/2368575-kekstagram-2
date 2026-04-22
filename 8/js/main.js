/* eslint-disable no-console */

import { getArrayMiniatures } from './createArrayMiniatures.js';
import { renderPictures } from './pictures.js';
import { initBigPictureHandlers } from './big-picture.js';

const pictures = getArrayMiniatures();
renderPictures(pictures);
initBigPictureHandlers();

