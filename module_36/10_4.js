const userName = prompt('Введите ваше имя:');
const birthYearInput = prompt('Введите год вашего рождения:');

const birthYear = +birthYearInput;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

// Определяем правильное слово для "год"
let yearWord;
const lastTwoDigits = age % 100;
const lastDigit = age % 10;

if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
  yearWord = 'лет';
} else if (lastDigit === 1) {
  yearWord = 'год';
} else if (lastDigit >= 2 && lastDigit <= 4) {
  yearWord = 'года';
} else {
  yearWord = 'лет';
}

alert(`${userName}: ${age} ${yearWord}`);
