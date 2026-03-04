for (let i = 0; i < 3; i++) {
  let row = '';

  for (let j = 0; j < 3; j++) {
    const symbol = (i + j) % 2 === 0 ? 'x' : 'o';
    row += symbol;

    if (j < 2) {
      row += ' ';
    }
  }

  console.log(row);
}

