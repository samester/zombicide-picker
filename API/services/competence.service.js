const CompetenceModel = require('../models/competence.model');

exports.getCompetences = async () => {
  try {
    return await CompetenceModel.find();
  } catch (e) {
    throw Error(`[GET COMPETENCES] : ${e.message}`);
  }
};

exports.getCompetenceById = async (id) => {
  try {
    return await CompetenceModel.findById(id);
  } catch (e) {
    throw Error(`[GET COMPETENCE BY ID] : ${e.message}`);
  }
};

exports.getCompetenceByFrName = async (fr) => {
  try {
    return await CompetenceModel.findOne({ fr });
  } catch (e) {
    throw Error(`[GET COMPETENCE BY FR NAME] : ${e.message}`);
  }
}

exports.getCompetenceByEnName = async (en) => {
  try {
    return await CompetenceModel.findOne({ en });
  } catch (e) {
    throw Error(`[GET COMPETENCE BY EN NAME] : ${e.message}`);
  }
}

exports.createCompetence = async (comp) => {
  const compToCreate = new CompetenceModel({
    fr: comp.fr,
    en: comp.en,
    description: comp.description,
  });

  try {
    const existingComp = await CompetenceModel.find({ fr: compToCreate.fr, en: compToCreate.en });
    
    if(existingComp.length > 0) {
      throw Error('This competence already exists');
    }
    return await compToCreate.save();
  } catch (e) {
    throw Error(`[POST COMPETENCE] : ${e.message}`);
  }
};

exports.updateCompetence = async (comp) => {
  const id = comp.id;
  try {
    const oldComp = await CompetenceModel.findById(id);
    if(!oldComp) {
      throw Error('No Competence found');
    }
    oldComp.fr = comp.fr || oldComp.fr;
    oldComp.en = comp.en || oldComp.en;
    oldComp.description = comp.description || oldComp.description;
    await oldComp.save();
    return;
  } catch (e) {
    throw Error(`[PUT COMPETENCE] : ${e.message}`);
  }
};

exports.deleteCompetenceById = async (id) => {
  try {
    await CompetenceModel.findByIdAndRemove(id);
    return;
  } catch (e) {
    throw Error(`[DELETE COMPETENCE BY ID] : ${e.message}`);
  }
};

exports.deleteAllCompetences = async () => {
  try {
    await CompetenceModel.find().remove();
    return;
  } catch (e) {
    throw Error(`[DELETE ALL COMPETENCE] : ${e.message}`);
  }
};
