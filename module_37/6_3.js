const input = prompt('Введите любое число:');
const num = Number(input);

if (Number.isNaN(num)) {
  console.log('Ошибка: введите корректное число');
} else {
  const arr = [];

  for (let i = 0; i <= num; i++) {
    arr.push(i);
  }

  console.log(arr);
}

