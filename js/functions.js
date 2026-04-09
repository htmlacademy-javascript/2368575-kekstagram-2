/* eslint-disable no-console */

const checkLength = (string = '', maxSymbols = 1) => string.length <= maxSymbols;

console.log(checkLength('проверяемая строка', 20));
console.log(checkLength('проверяемая строка', 18));
console.log(checkLength('проверяемая строка', 10));

function comparesStringLength(string, length) {
  return string.length <= length;
}

console.log(comparesStringLength('тест', 10));

const isPalindrome = (string = '') => {

  string = string.replaceAll(' ', '').toLowerCase();

  let reversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }

  return string === reversed;

};

console.log(isPalindrome('топот'));

const verifyPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  const reverseString = normalizedString.split('').reverse().join('');
  return reverseString === normalizedString;
};

console.log(verifyPalindrome('довод'));

const extractNumbers = (string) => {
  let result = '';

  string = string.toString();

  for (let i = 0; i <= string.length - 1; i++) {
    if (Number.isNaN(parseInt(string[i], 10)) === false) {
      result += string[i];
    }
  }

  return result === '' ? NaN : Number(result);
};

console.log(extractNumbers('2023 год'));

function stringToNumber(str) {
  return Number(
    [...String(str)].filter((item) => !isNaN(parseInt(item, 10))).join('') || NaN
  );
}

console.log(stringToNumber('ECMAScript 2022'));
