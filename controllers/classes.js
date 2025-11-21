// imports
const classesUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classes
classesUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "classes listed here";
  res.send(response);
};

// get class by id
classesUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add class
classesUtils.insertClasses = async (req, res) => {
  // insertClasses logic
};

// ==============================================
// PUT logic
// ==============================================
// update class by id
classesUtils.updateClasses = async (req, res) => {
  // updateClasses logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete class by id
classesUtils.deleteClasses = async (req, res) => {
  // deleteClasses logic
};

module.exports = classesUtils;
