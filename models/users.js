const mongoose = require('mongoose');

const UsersSchema = new mongoose.Schema({
	tlg_id: { type: Number, required: true, unique: true },
	name: { type: String, required: true },
	dictionary: [{ word: String, occurence: Number }]
});

UsersSchema.query.byName = function(name) {
	return this.find({ name: new RegExp(name, 'i') });
};

UsersSchema.query.byTlgId = function(tlg_id) {
	return this.find({ tlg_id });
}

module.exports = mongoose.model('users', UsersSchema);
