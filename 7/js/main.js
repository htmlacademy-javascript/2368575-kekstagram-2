/* eslint-disable no-console */

import { getArrayMiniatures } from './createArrayMiniatures.js';
import { renderPictures } from './pictures.js';

const pictures = getArrayMiniatures();
renderPictures(pictures);

