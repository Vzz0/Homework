const userName = prompt('Введите ваше имя:');
const birthYearInput = prompt('Введите год вашего рождения:');

const birthYear = +birthYearInput;
const currentYear = new Date().getFullYear();
const age = currentYear - birthYear;

alert(`${userName}: ${age}`);
