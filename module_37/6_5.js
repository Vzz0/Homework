const obj = {
  some: 'some',
  dom: 'text',
  arr: [1, 2, 3, 4, 5],
  tom: 'there',
};

const arrValues = [];

for (const key in obj) {
  const value = obj[key];

  if (Array.isArray(value)) {
    for (const item of value) {
      arrValues.push(item);
    }
  } else {
    arrValues.push(value);
  }
}

console.log(arrValues);

