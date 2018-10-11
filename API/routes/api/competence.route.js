const express = require('express');
const CompetenceController = require('../../controllers/competence.controller');

const router = express.Router();

router.get('/', CompetenceController.getCompetences);
router.get('/id/:id', CompetenceController.getCompetenceById);
router.get('/name/fr/:name', CompetenceController.getCompetenceByFrName);
router.get('/name/en/:name', CompetenceController.getCompetenceByEnName);
router.post('/', CompetenceController.createCompetence);
router.put('/', CompetenceController.updateCompetence);
router.delete('/', CompetenceController.deleteAllCompetences);
router.delete('/id/:id', CompetenceController.deleteCompetenceById);

module.exports = router;