const promoInput = prompt('Введите промокод:');

if (promoInput && promoInput.toLowerCase() === 'скидка') {
  alert('Промокод применён');
} else {
  alert('Промокод не работает');
}
