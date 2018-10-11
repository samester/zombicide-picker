const CompetenceService = require('../services/competence.service');

exports.getCompetences = async (req, res) => {
  try {
    const compToReturn = await CompetenceService.getCompetences();
    return res.status(200).json({
      competences: compToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCompetenceById = async (req, res) => {
  const id = req.params.id;
  if(!id) {
    return res.status(400).json({
      message: 'Missing Params id',
    });
  }
  try {
    const compToReturn = await CompetenceService.getCompetenceById(id);
    return res.status(200).json({
      competence: compToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCompetenceByFrName = async (req, res) => {
  const name = req.params.name;
  if(!name) {
    return res.status(400).json({
      message: 'Missing Params name',
    });
  }
  try {
    const compToReturn = await CompetenceService.getCompetenceByFrName(name);
    return res.status(200).json({
      competence: compToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.getCompetenceByEnName = async (req, res) => {
  const name = req.params.name;
  if(!name) {
    return res.status(400).json({
      message: 'Missing Params name',
    });
  }
  try {
    const compToReturn = await CompetenceService.getCompetenceByEnName(name);
    return res.status(200).json({
      competence: compToReturn,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.createCompetence = async (req, res) => {

  const comp = req.body;
  console.log(comp);

  if(!comp.fr) {
    return res.status(400).json({
      message: 'Missing field fr',
    });
  }
  if(!comp.en) {
    return res.status(400).json({
      message: 'Missing field en',
    });
  }
  if(!comp.description) {
    return res.status(400).json({
      message: 'Missing field description',
    });
  }
  try {
   const compCreated = await CompetenceService.createCompetence(comp);
   return res.status(201).json({
     competence: compCreated,
   }); 
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
}

exports.updateCompetence = async (req, res) => {
  const comp = { 
    id: req.body.id,
    fr: req.body.fr,
    en: req.body.en,
    description: req.body.description,
  };
  if(!comp.id) {
    return res.status(400).json({
      message: 'Missing field id',
    });
  }
  try {
    const updated = await CompetenceService.updateCompetence(comp);
    return res.status(200).json({
      updated: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.deleteCompetenceById = async (req, res) => {
  const id = req.params.id;
  if(!id) {
    return res.status(400).json({
      message: 'Missing params id',
    });
  }
  try {
    const deleted = await CompetenceService.deleteCompetenceById(id);
    return res.status(200).json({
      deleted: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};

exports.deleteAllCompetences = async (req, res) => {
  try {
    const deleted = await CompetenceService.deleteAllCompetences();
    return res.status(200).json({
      deleted: true,
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
    });
  }
};
