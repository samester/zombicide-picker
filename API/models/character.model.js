const mongoose = require('mongoose');

const characterCompetences = {
  blue: '',
  yellow: '',
  orange: [],
  red: []
};

const CharacterSchema = new mongoose.Schema({
  name: { type: String, required: true },
  competences: characterCompetences,
  from: { type: String, required: true },
  zombie: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Character' },
});

module.exports = mongoose.model('Character', CharacterSchema);
