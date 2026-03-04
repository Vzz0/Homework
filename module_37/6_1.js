const input = prompt('Введите слово или фразу:');

if (input) {
  const normalized = input.toLowerCase().replace(/\s+/g, '');
  const reversed = normalized.split('').reverse().join('');

  if (normalized === reversed) {
    console.log(`Слово ${input} является палиндромом`);
  } else {
    console.log(`Слово ${input} не является палиндромом`);
  }
} else {
  console.log('Вы ничего не ввели');
}

