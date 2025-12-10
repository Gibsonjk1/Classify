// imports
const mongoDb = require("../db/connection");
const semestersUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all semesters
semestersUtils.getAllSemesters = async (req, res, next) => {
  const result = mongoDb.getDb().db("Classify").collection("semesters").find();
  const semesters = await result.toArray();
  res.setHeader("content-type", "application/json");
  res.status(200);
  res.json(semesters);
};

// get semester by semesterId
semestersUtils.getSemesterById = async (req, res, next) => {
  try {
    const semesterId = req.params.semesterId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("semesters")
      .find({ semesterId: semesterId });
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
semestersUtils.insertSemester = async (req, res) => {
  try {
    const semester = {
      semesterId: req.body.semesterId,
      year: req.body.year,
      term: req.body.term,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
    };
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("semesters")
      .insertOne(semester);
    // validation function goes here
    if (response.acknowledged) {
      res.status(201).json(response);
    }
  } catch (error) {
    res
      .status(500)
      .json(
        error.message || "Some error occured while inserting the semester."
      );
  }
};

// ==============================================
// PUT logic
// ==============================================
// update semester by semesterId
semestersUtils.updateSemesterById = async (req, res) => {
  try {
    const semesterId = req.params.semesterId;
    const updateData = {
      semesterId: req.body.semesterId,
      year: req.body.year,
      term: req.body.term,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      active: req.body.active,
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("semesters")
      .updateOne({ semesterId: semesterId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Semester id does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if (error.name === "no such id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occurred while updating the semester."
        );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
// delete semester by semesterId
semestersUtils.deleteSemesterById = async (req, res) => {
  try {
    const semesterId = req.params.semesterId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("semesters")
      .deleteOne({ semesterId: semesterId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("semester id does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if (error.name === "no such id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occured while deleting the semester."
        );
    }
  }
};

module.exports = semestersUtils;
