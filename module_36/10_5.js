const ageInput = prompt('Введите ваш возраст:');
const age = Number(ageInput);

if (!ageInput || Number.isNaN(age)) {
  alert('Ошибка: введите возраст числом.');
} else if (age < 18) {
  alert('Вам кредит не доступен.');
} else if (age > 65) {
  alert('Для указанного возраста кредит не доступен.');
} else {
  const amountInput = prompt('Введите желаемую сумму кредита (кратную 1000):');
  const amount = Number(amountInput);

  if (!amountInput || Number.isNaN(amount)) {
    alert('Ошибка: введите сумму числом.');
  } else if (amount % 1000 !== 0) {
    alert('Сумма кредита должна быть кратна 1000.');
  } else {
    let maxLimit = 0;

    if (age >= 18 && age <= 21) {
      maxLimit = 50000;
    } else if (age >= 22 && age <= 35) {
      maxLimit = 400000;
    } else if (age >= 36 && age <= 65) {
      maxLimit = 1000000;
    }

    if (amount > maxLimit) {
      alert(`Максимальная доступная сумма кредита для вас: ${maxLimit} руб.`);
    } else {
      alert(`Вам одобрен кредит на сумму ${amount} руб.`);
    }
  }
}
