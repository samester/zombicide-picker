const express = require('express');
const CharacterController = require('../../controllers/character.controller');

const router = express.Router();

router.get('/', CharacterController.getCharacters);
router.get('/id/:id', CharacterController.getCharacterById);
router.get('/name/:name', CharacterController.getCharacterByName);
router.get('/from/:from', CharacterController.getCharacterFrom);
router.get('/from/:from/name/:name', CharacterController.getCharacterFromByName);

router.post('/', CharacterController.createCharacter);
router.put('/', CharacterController.updateCharacter);
router.delete('/', CharacterController.deleteAllCharacters);
router.delete('/id/:id', CharacterController.deleteCharacterById);

module.exports = router;
