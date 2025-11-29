// imports
const mongoDb = require("../db/connection");
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
  try {
    const _id = req.params._id;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("enrollments")
      .find({ _id: _id });
    const enrollment = await result.toArray();
    if (!enrollment.length > 0) {
      const error = new Error("No data found with that enrollment id.");
      error.name = "blank id";
      throw error;
    }
    res.setHeader("content-type", "application/json");
    res.status(200).json(enrollment[0]);
  } catch (error) {
    if (error.isJoi) {
      res.status(422).json(error.message);
    } else if (error.name == "blank id") {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "An error occured while retrieving the enrollment id."
        );
    }
  }
};

// ==============================================
// POST logic
// ==============================================
// add enrollment
enrollmentsUtils.insertEnrollment = async (req, res) => {
  try {
      const enrollment = {
        _id: req.body._id,
        studentId: req.body.studentId,
        sectionId: req.body.sectionId,
        status: req.body.status,
        enrolledAt: req.body.enrolledAt,
        grade: req.body.grade
      };
      const response = await mongoDb
        .getDb()
        .db("Classify")
        .collection("enrollments")
        .insertOne(enrollment);
      // validation function goes here
      if (response.acknowledged) {
        res.status(201).json(response);
      }
    } catch (error) {
      res
        .status(500)
        .json(
          error.message || "Some error occured while inserting the enrollment."
        );
    }
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
enrollmentsUtils.deleteById = async (req, res) => {
  try {
    const enrollmentId = req.params._id;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("enrollments")
      .deleteOne({ _id: enrollmentId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("enrollment id does not exist");
      error.name = "no such id";
      throw error;
    }
  } catch (error) {
    if ((error.name = "no such id")) {
      res.status(404).json(error.message);
    } else {
      res
        .status(500)
        .json(
          error.message || "Some error occured while deleting the enrollment."
        );
    }
  }
};

module.exports = enrollmentsUtils;
