const checkLength = (string = '', maxSymbols = 1) => string.length <= maxSymbols;

function comparesStringLength(string, length) {
  return string.length <= length;
}


const isPalindrome = (string = '') => {

  string = string.replaceAll(' ', '').toLowerCase();

  let reversed = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversed += string[i];
  }

  return string === reversed;

};

const verifyPalindrome = (string) => {
  const normalizedString = string.replaceAll(' ', '').toUpperCase();
  const reverseString = normalizedString.split('').reverse().join('');
  return reverseString === normalizedString;
};


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


function stringToNumber(str) {
  return Number(
    [...String(str)].filter((item) => !isNaN(parseInt(item, 10))).join('') || NaN
  );
}

