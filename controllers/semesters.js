// imports
const semestersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all semesters
semestersUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "Semesters listed here.";
  res.send(response);
};

// get semester by id
semestersUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add semester
semestersUtils.insertSemesters = async (req, res) => {
  // insertSemesters logic
};

// ==============================================
// PUT logic
// ==============================================
// update semester by id
semestersUtils.updateSemesters = async (req, res) => {
  // updateSemesters logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete semester by id
semestersUtils.deleteSemesters = async (req, res) => {
  // deleteSemesters logic
};

module.exports = semestersUtils;
