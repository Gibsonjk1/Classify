// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const semestersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all semesters
semestersUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("semesters").find();
  const semesters = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(semesters);
};

// get semester by id
semestersUtils.getById = async (req, res, next) => {
  // logic here
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
