// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const studentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all students
studentsUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("students").find();
  const students = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(students);
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
