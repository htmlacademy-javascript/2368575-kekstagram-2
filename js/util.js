const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

/**
 * Генератор уникальных случайных чисел из диапазона.
 * @param {number} min - Минимальное значение диапазона.
 * @param {number} max - Максимальное значение диапазона.
 * @returns {Function} Функция, возвращающая уникальное случайное число или null при исчерпании диапазона.
 */
const createRandomIdFromRangeGenerator = (min, max) => {
  const previousValues = [];

  return function () {
    if (previousValues.length >= max - min + 1) {
      return null;
    }

    const maxAttempts = (max - min + 1) * 2;
    let attempts = 0;
    let currentValue = getRandomInteger(min, max);

    while (previousValues.includes(currentValue)) {
      if (attempts >= maxAttempts) {
        return null;
      }
      currentValue = getRandomInteger(min, max);
      attempts++;
    }

    previousValues.push(currentValue);
    return currentValue;
  };
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

export {
  getRandomInteger,
  getRandomArrayElement,
  createRandomIdFromRangeGenerator,
};

