// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const teachersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all teachers
teachersUtils.getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("Classify")
    .collection("teachers")
    .find();
  const teachers = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(teachers);
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
