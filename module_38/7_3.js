const adults = users.filter(user => user.age >= 18);
const userNames = adults.map(user => user.name);