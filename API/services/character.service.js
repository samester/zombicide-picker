const CharacterModel = require('../models/character.model');

exports.getCharacters = async () => {
  try {
    return await CharacterModel.find();
  } catch (e) {
    throw Error(`[GET CHARACTER] : ${e.message}`);
  }
};

exports.getCharacterById = async (id) => {
  try {
    return await CharacterModel.findById(id);
  } catch (e) {
    throw Error(`[GET CHARACTER BY ID] : ${e.message}`);
  }
}


exports.getCharacterByName = async (name) => {
  try {
    return await CharacterModel.findOne({ name });
  } catch (e) {
    throw Error(`[GET CHARACTER BY NAME] : ${e.message}`);    
  }
}

exports.getCharactersFrom = async (from) => {
  try {
    return await CharacterModel.find({ from });
  } catch (e) {
    throw Error(`[GET CHARACTER FROM] : ${e.message}`);    
  }
}; 

exports.getCharacterFromByName = async (from, name) => {
  try {
    return await CharacterModel.findOne({ from, name });
  } catch (e) {
    throw Error(`[GET CHARACTER FROM BY NAME] : ${e.message}`);    
  }
}

exports.createCharacter = async (charac) => {
  const charToCreate = new CharacterModel({
    name: charac.name,
    competences: charac.competences,
    from: charac.from,
  });

  if(charac.zombie) {
    charToCreate.zombie = charac.zombie;
  }

  try {
    return await charToCreate.save();
  } catch (e) {
    throw Error(`[POST CHARACTER] : ${e.message}`);
  }
};

exports.updateCharacter = async (charac) => {
  const id = charac.id;
  try {
    const oldChar = await CharacterModel.findById(id);
    if(!oldChar) {
      throw Error('No character Found');
    }
    oldChar.name = charac.name || oldChar.name;
    oldChar.competences = charac.competences || oldChar.competences;
    oldChar.from = char.from || oldChar.from;
    if(charac.zombie) {
      oldChar.zombie = charac.zombie;
    }
    await oldChar.save();
    return;
  } catch (e) {
    throw Error(`[PUT CHARACTER] : ${e.message}`);
  }
};

exports.deleteCharacterById = async (id) => {
  try {
    await CharacterModel.findByIdAndRemove(id);
    return;
  } catch (e) {
    throw Error(`[DELETE CHARACTER BY ID] : ${e.message}`);
  }
};

exports.deleteAllCharacters = async () => {
  try {
    await CharacterModel.find().remove();
    return;
  } catch (e) {
    throw Error(`[DELETE ALL CHARACTERS] : ${e.message}`);
  }
};
