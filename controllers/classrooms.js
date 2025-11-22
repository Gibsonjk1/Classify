// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const classroomsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classrooms
classroomsUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("classrooms").find();
  const classrooms = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classrooms);
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
