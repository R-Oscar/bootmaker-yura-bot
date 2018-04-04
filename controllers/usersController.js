const Users = require('../models/users.js');

class UsersController {
	async init(tlg_id, name) {
		try {
			const query = await Users.find().byTlgId(tlg_id).exec();

			if (query.length === 0) {
				let userInstance = new Users({ tlg_id, name, dictionary: [] });
				await userInstance.save();
			}

			this.name = name;
			this.tlg_id = tlg_id;

			return true;
		} catch (err) {
			console.error(err);

			return false;
		}
	}

	async showStats() {
		try {
			let result = '';
			const query = await Users.findOne({ tlg_id: this.tlg_id }, 'dictionary').exec();

			query.dictionary.forEach(el => {
				result += `Слово: ${el.word}, частота употребления: ${el.occurence}\n`;
			});
			
			return result;
		} catch (err) {
			console.error(err);
		}
	}

	async containsWord(word) {
		try {
			if (!this.name || !this.tlg_id) {
				console.error('Initialize UsersController first! (use init() method)');
				return false;
			}

			const query = await Users.find({ tlg_id: this.tlg_id, "dictionary.word": word }, 'dictionary').exec();

			return query.length > 0;
		} catch (err) {
			console.error(err);
		}
	}

	async increaseWord(word) {
		try {
			if (!this.name || !this.tlg_id) {
				console.error('Initialize UsersController first! (use init() method)');
				return false;
			}

			const query = await Users.updateOne({ tlg_id: this.tlg_id, "dictionary.word": word }, { $inc: { "dictionary.$.occurence": 1 } });

			if (query.n === 0) {
				await Users.updateOne({ tlg_id: this.tlg_id }, { $push: { dictionary: { word, occurence: 1 } } });
				return true;
			}

			return true;
		} catch (err) {
			console.error(err);
		}
	}

	static async containsUser(tlg_id) {
		return await Users.findOne({ tlg_id }) !== null;
	}
}

exports.UsersController = UsersController;
