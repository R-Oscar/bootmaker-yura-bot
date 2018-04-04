const mongoose = require('mongoose');

const { UsersController } = require('./controllers/usersController.js');

const dbURL = 'mongodb://localhost:27017/bmy';
mongoose.connect(dbURL);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.on('open', () => {
	console.log('Connected!');
	(async () => {
		// console.log(await usersController.addUser(123, 'test'));

		// console.log(await usersController.containsUser('test'));
		// dictionaryController = new DictionaryController();
		// await dictionaryController.init('test', 123);
		// console.log(dictionaryController.name);
		// console.log(await dictionaryController.containsWord('хуй'));

		let usersController = new UsersController();

		await usersController.init(123, 'test');


		console.log(await usersController.showStats());
		console.log(await usersController.increaseWord('бля(дь)'));
		console.log(await usersController.showStats());

		console.log(await UsersController.containsUser(123));
	})();

	// db.db.listCollections().toArray((err, names) => {
	// 	names.forEach(el => console.log(el.name));
	// });
});

// const { dbAPI } = require('./functions.js');
// const MongoClient = require('mongodb').MongoClient;

// const Users = require('./models/users.js');

// // users.addUser('Oscar');

// // // console.log(users.Oscar);
// // users.Oscar.addWord('хуй');
// // users.Oscar.addWord('пизда');
// // // console.log(users.Oscar);
// // console.log(users.Oscar.increaseWord('хуй'));
// // console.log(users.Oscar.showStats());
// // console.log(users.Oscar.containsWord('хуй'));

// (async () => {
// 	const client = await MongoClient.connect(dbAPI.dbURL);

// 	console.log('Connected!');

// 	dbAPI.connected = true;

// 	const db = client.db(dbAPI.dbName);
// 	const collection = db.collection(dbAPI.collectionName);

// 	dbAPI.collection = collection;
// 	// console.log(dbAPI);

// 	// console.log(await dbAPI.containsUser('Oscar'));

// 	// console.log(await dbAPI.addUser('Oscar'));
// 	// console.log(await dbAPI.userContainsWord('Oscar', 'хуй'));
// 	// dbAPI.userAddWord('Oscar', 'пизда');
// })();

