// imports
const classSectionsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all class sections
classSectionsUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "class sections listed here";
  res.send(response);
};

// get class section by id
classSectionsUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add class section
classSectionsUtils.insertClassSection = async (req, res) => {
  // insertClassSection logic
};

// ==============================================
// PUT logic
// ==============================================
// update class section by id
classSectionsUtils.updateClassSection = async (req, res) => {
  // updateClassSection logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete class section by id
classSectionsUtils.deleteClassSection = async (req, res) => {
  // deleteClassSection logic
};

module.exports = classSectionsUtils;
