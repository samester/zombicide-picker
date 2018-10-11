const CharacterService = require('../services/character.service');
const CompetenceService = require('../services/competence.service');

exports.getCharacters = async (req, res) => {
  try {
    const charToReturn = await CharacterService.getCharacters();
    return res.status(200).json({
      characters: charToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCharacterById = async (req, res) => {
  const id = req.params.id;
  if(!id) {
    return res.status(400).json({
      message: 'Missing Params id',
    });
  }
  try {
    const charToReturn = await CharacterService.getCharacterById(id);
    return res.status(200).json({
      character: charToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCharacterByName = async (req, res) => {
  const name = req.params.name;
  if(!name) {
    return res.status(400).json({
      message: 'Missing Params name',
    });
  }
  try {
    const charToReturn = await CharacterService.getCharacterByName(name);
    return res.status(200).json({
      character: charToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCharacterFrom = async (req, res) => {
  const from = req.params.from;
  if(!from) {
    return res.status(400).json({
      message: 'Missing Params from',
    });
  }
  try {
    const charToReturn = await CharacterService.getCharactersFrom(from);
    return res.status(200).json({
      character: charToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCharacterFromByName = async (req, res) => {
  const from = req.params.from;
  const name = req.params.name;
  if(!from) {
    return res.status(400).json({
      message: 'Missing Params from',
    });
  }
  if(!name) {
    return res.status(400).json({
      message: 'Missing Params name',
    });
  }

  try {
    const charToReturn = await CharacterService.getCharacterFromByName(from, name);
    return res.status(200).json({
      character: charToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

const verifCharacterCompetences = (comp) => {
  if(!comp.blue) {
    return 'Missing field in competences : blue';
  }  
  if(!comp.yellow) {
    return 'Missing field in competences : yellow';
  }
  if(!comp.orange) {
    return 'Missing field in competences : orange';
  }
  if(comp.orange.length !== 2) {
    return `Invalid size for the orange competence, 2 is required, found ${comp.orange.length}`;
  }
  if(!comp.red) {
    return 'Missing field in competences : red';
  }
  if(comp.red.length !== 3) {
    return `Invalid size for the red competence, 3 is required, found ${comp.red.length}`
  }
  return '';
}

const convertFrCompetences = async (comp) => {
  const compToReturn = {
    blue: undefined,
    yellow: undefined,
    orange: [],
    red: [],
  };

  compToReturn.blue = await CompetenceService.getCompetenceByFrName(comp.blue);
  compToReturn.yellow = await CompetenceService.getCompetenceByFrName(comp.yellow);
  compToReturn.orange.push(await CompetenceService.getCompetenceByFrName(comp.orange[0]));
  compToReturn.orange.push(await CompetenceService.getCompetenceByFrName(comp.orange[1]));
  compToReturn.red.push(await CompetenceService.getCompetenceByFrName(comp.red[0]));
  compToReturn.red.push(await CompetenceService.getCompetenceByFrName(comp.red[1]));
  compToReturn.red.push(await CompetenceService.getCompetenceByFrName(comp.red[2]));
  return compToReturn;
}

const convertEnCompetences = async (comp) => {
  const compToReturn = {
    blue: undefined,
    yellow: undefined,
    orange: [],
    red: [],
  };

  compToReturn.blue = await CompetenceService.getCompetenceByEnName(comp.blue);
  compToReturn.yellow = await CompetenceService.getCompetenceByEnName(comp.yellow);
  compToReturn.orange.push(await CompetenceService.getCompetenceByEnName(comp.orange[0]));
  compToReturn.orange.push(await CompetenceService.getCompetenceByEnName(comp.orange[1]));
  compToReturn.red.push(await CompetenceService.getCompetenceByEnName(comp.red[0]));
  compToReturn.red.push(await CompetenceService.getCompetenceByEnName(comp.red[1]));
  compToReturn.red.push(await CompetenceService.getCompetenceByEnName(comp.red[2]));

  return compToReturn;
}

exports.createCharacter = async (req, res) => {
  const char = req.body;

  
  if(!char.name) {
    return res.status(400).json({
      message: 'Missing field name',
    });
  }
  if(!char.competences) {
    return res.status(400).json({
      message: 'Missing field competences',
    });
  }
  const verif = verifCharacterCompetences(char.competences);
  if(verif !== '') {
    return res.status(400).json({
      message: `Invalid Competences : ${verif}`,
    });
  }
  if(!char.from) {
    return res.status(400).json({
      message: 'Missing field from',
    });
  }

  const charToCreate = {
    name: char.name,
    competences: (char.competences.en) ? await convertEnCompetences(char.competences) : await convertFrCompetences(char.competences),
    from: char.from,
  }
  if(char.zombie) {
    charToCreate.zombie = char.zombie;
  }

  try {
    const character = await CharacterService.createCharacter(charToCreate);
    return res.status(201).json({
      character,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.updateCharacter = async (req, res) => {
  const char = req.body;
  if(!char.id) {
    return res.status(400).json({
      message: 'Missing field id',
    });
  }
  if(char.competences) {
    const verif = verifCharacterCompetences(char.competences);
    if(verif !== '') {
      return res.status(400).json({
        message: `Invalid Competences : ${verif}`,
      });
    }
    char.competences = (char.competences.en)? await convertEnCompetences(char.competences) : await convertFrCompetences(char.competences);
  }
  try {
    const updated = await CharacterService.updateCharacter(char);
    return res.status(200).json({
      updated: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}

exports.deleteCharacterById = async (req, res) => {
  const id = req.params.id;
  if(!id) {
    return res.status(400).json({
      message: 'Missing params id',
    });
  }
  try {
    const deleted = await CharacterService.deleteCharacterById(id);
    return res.status(200).json({
      deleted: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.deleteAllCharacters = async (req, res) => {
  try {
    const deleted = await CharacterService.deleteAllCharacters();
    return res.status(200).json({
      deleted: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
