const mongoose = require('mongoose');

const CompetenceSchema = new mongoose.Schema({
  fr: { type: String, required: true },
  en: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model('Competence', CompetenceSchema);
