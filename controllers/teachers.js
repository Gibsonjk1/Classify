// imports
const teachersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all teachers
teachersUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "Teachers listed here.";
  res.send(response);
};

// get teacher by id
teachersUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add teacher
teachersUtils.insertTeachers = async (req, res) => {
  // insertTeachers logic
};

// ==============================================
// PUT logic
// ==============================================
// update teacher by id
teachersUtils.updateTeachers = async (req, res) => {
  // updateTeachers logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete teacher by id
teachersUtils.deleteTeachers = async (req, res) => {
  // deleteTeachers logic
};

module.exports = teachersUtils;
