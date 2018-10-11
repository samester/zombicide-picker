const express = require('express');
const router = express.Router();

const CompetenceRoutes = require('./api/competence.route');
const CharacterRoutes = require('./api/character.route');

router.use('/competences', CompetenceRoutes);
router.use('/characters', CharacterRoutes);

module.exports = router;
