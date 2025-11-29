// imports
const mongoDb = require("../db/connection");
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
  try {
    const semesterId = req.params.semesterId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("semesters")
      .find({ _id: semesterId });
    const semester = await result.toArray();
    if (!semester.length > 0) {
      const error = new Error("No data found with that semester id.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(semester[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "An error occured while retrieving the semester id."
        );
    }
  }
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
