const { users } = require('./functions.js');

users.addUser('Oscar');

// console.log(users.Oscar);
users.Oscar.addWord('хуй');
users.Oscar.addWord('пизда');
// console.log(users.Oscar);
console.log(users.Oscar.increaseWord('хуй'));
console.log(users.Oscar.showStats());
console.log(users.Oscar.containsWord('хуй'));