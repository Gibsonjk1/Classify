// imports
const mongoDb = require("../db/connection");
const ObejctId = require("mongodb").ObjectId;
const classSectionsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all class sections
classSectionsUtils.getAll = async (req, res, next) => {
  const result = mongoDb
    .getDb()
    .db("Classify")
    .collection("class-sections")
    .find();
  const classSections = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(classSections);
};

// get class section by id
classSectionsUtils.getById = async (req, res, next) => {
  // getById logic
};

// ==============================================
// POST logic
// ==============================================
// add class section
classSectionsUtils.insertClassSection = async (req, res) => {
  // insertClassSection logic
};

// ==============================================
// PUT logic
// ==============================================
// update class section by id
classSectionsUtils.updateClassSection = async (req, res) => {
  // updateClassSection logic
};

// ==============================================
// DELETE logic
// ==============================================
// delete class section by id
classSectionsUtils.deleteClassSection = async (req, res) => {
  // deleteClassSection logic
};

module.exports = classSectionsUtils;
