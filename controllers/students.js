// imports
const studentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all students
studentsUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "Students listed here.";
  res.send(response);
};

// get student by id
studentsUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add student
studentsUtils.insertStudents = async (req, res) => {
  // insertStudents logic
};

// ==============================================
// PUT logic
// ==============================================
// update student by id
studentsUtils.updateStudents = async (req, res) => {
  // updateStudents logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete student by id
studentsUtils.deleteStudents = async (req, res) => {
  // deleteStudents logic
};

module.exports = studentsUtils;
