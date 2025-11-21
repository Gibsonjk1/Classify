// imports
const enrollmentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all enrollments
enrollmentsUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "enrollments listed here";
  res.send(response);
};

// get enrollment by id
enrollmentsUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add enrollment
enrollmentsUtils.insertEnrollments = async (req, res) => {
  // insertEnrollments logic
};

// ==============================================
// PUT logic
// ==============================================
// update enrollment by id
enrollmentsUtils.updateEnrollments = async (req, res) => {
  // updateEnrollments logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete enrollment by id
enrollmentsUtils.deleteEnrollments = async (req, res) => {
  // deleteEnrollments logic
};

module.exports = enrollmentsUtils;
