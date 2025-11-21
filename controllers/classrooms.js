// imports
const classroomsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classrooms
classroomsUtils.getAll = async (req, res, next) => {
  // getAll logic
  const response = "classrooms listed here";
  res.send(response);
};

// get classroom by id
classroomsUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add classroom
classroomsUtils.insertClassrooms = async (req, res) => {
  // insertClassrooms logic
};

// ==============================================
// PUT logic
// ==============================================
// update classroom by id
classroomsUtils.updateClassrooms = async (req, res) => {
  // updateClassrooms logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete classroom by id
classroomsUtils.deleteClassrooms = async (req, res) => {
  // deleteClassrooms logic
};

module.exports = classroomsUtils;
