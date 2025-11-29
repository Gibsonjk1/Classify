// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const classesUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all classes
classesUtils.getAll = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("classes").find();
  const classes = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classes);
};

// get class by id
classesUtils.getById = async (req, res, next) => {
  // logic here
};

// ==============================================
// POST logic
// ==============================================
// add class
classesUtils.insertClasses = async (req, res) => {
  // insertClasses logic
};

// ==============================================
// PUT logic
// ==============================================
// update class by id
classesUtils.updateClasses = async (req, res) => {
  // updateClasses logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete class by id
classesUtils.deleteClasses = async (req, res) => {
  // deleteClasses logic
};

module.exports = classesUtils;
