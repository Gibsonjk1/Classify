// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const enrollmentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all enrollments
enrollmentsUtils.getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("Classify")
    .collection("enrollments")
    .find();
  const enrollments = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(enrollments);
};

// get enrollment by id
enrollmentsUtils.getById = async (req, res, next) => {
  // logic here
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
