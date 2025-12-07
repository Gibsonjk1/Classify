// imports
const mongoDb = require("../db/connection");
const enrollmentsUtils = {};

// ==============================================
// GET logic
// ==============================================
// get all enrollments
enrollmentsUtils.getAllEnrollments = async (req, res, next) => {
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

// get enrollment by enrollmentId
enrollmentsUtils.getEnrollmentById = async (req, res, next) => {
  try {
    const enrollmentId = req.params.enrollmentId;
    const result = mongoDb
      .getDb()
      .db("Classify")
      .collection("enrollments")
      .find({ enrollmentId: enrollmentId });
    const enrollment = await result.toArray();
    if (!enrollment.length > 0) {
      const error = new Error("No data found with that enrollment ID.");
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
          error.message || "An error occured while retrieving the enrollment ID."
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
      enrollmentId: req.body.enrollmentId,
      studentId: req.body.studentId,
      departmentId: req.body.departmentId,
      status: req.body.status,
      enrolledAt: req.body.enrolledAt,
      gpa: req.body.gpa
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
        error.message || "Some error occured while inserting the enrollment ID."
      );
  }
};

// ==============================================
// PUT logic
// ==============================================
// update enrollment by enrollmentId
enrollmentsUtils.updateEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.enrollmentId;
    const updateData = {
      enrollmentId: req.body.enrollmentId,
      studentId: req.body.studentId,
      departmentId: req.body.departmentId,
      status: req.body.status,
      enrolledAt: req.body.enrolledAt,
      gpa: req.body.gpa
    };

    // Remove undefined fields
    Object.keys(updateData).forEach(key =>
      updateData[key] === undefined && delete updateData[key]
    );

    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("enrollments")
      .updateOne({ enrollmentId: enrollmentId }, { $set: updateData });

    if (response.matchedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Enrollment ID does not exist");
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
          error.message || "Some error occurred while updating the enrollment ID."
        );
    }
  }
};

// ==============================================
// DELETE logic
// ==============================================
// delete enrollment by enrollmentId
enrollmentsUtils.deleteEnrollmentById = async (req, res) => {
  try {
    const enrollmentId = req.params.enrollmentId;
    const response = await mongoDb
      .getDb()
      .db("Classify")
      .collection("enrollments")
      .deleteOne({ enrollmentId: enrollmentId }, true);
    if (response.deletedCount > 0) {
      res.status(204).send();
    } else {
      const error = new Error("Enrollment ID does not exist");
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
          error.message || "Some error occured while deleting the enrollment ID."
        );
    }
  }
};

module.exports = enrollmentsUtils;
